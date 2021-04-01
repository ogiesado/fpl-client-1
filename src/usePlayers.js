import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constants";
import { range, transformPlayerData, transformWeekData } from "./utils";

export default function usePlayers(playerIds = []) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (playerIds.length === 0) return;

    let cancelled = false;

    async function fetchPlayers() {
      const playerRequests = playerIds.map(id =>
        axios.get(`${API_URL}/entry/${id}/`)
      );
      const players = await axios.all(playerRequests).then(
        axios.spread(function(...responses) {
          return responses.map(({ data }) => transformPlayerData(data));
        })
      );

      if (cancelled) return;

      const playersData = {};
      players.forEach(player => {
        playersData[player.id] = { ...player, weeks: {} };
      });

      const playerWeeksRequests = players.reduce(
        (playerWeeksRequests, player) => {
          playerWeeksRequests[player.id] = range(
            player.startedWeekNumber,
            player.latestWeekNumber
          ).map(weekNumber =>
            axios.get(
              `${API_URL}/entry/${player.id}/event/${weekNumber}/picks/`
            )
          );
          return playerWeeksRequests;
        },
        {}
      );

      Object.keys(playerWeeksRequests).forEach(async playerId => {
        await axios.all(playerWeeksRequests[playerId]).then(
          axios.spread(function(...responses) {
            responses.forEach(({ data }) => {
              const week = transformWeekData(data);
              playersData[playerId]["weeks"][week.number] = week;
            });
          })
        );

        if (!cancelled) setPlayers(Object.values(playersData));
      });
    }

    fetchPlayers();

    return () => (cancelled = true);
  }, [playerIds]);

  return [...players];
}
