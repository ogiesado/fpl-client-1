import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constants";
import { range, transformPlayerData, transformWeekData } from "./utils";

export default function usePlayers(playerId) {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    let cancelled = false;

    async function fetchPlayer() {
      const player = await axios
        .get(`${API_URL}/entry/${playerId}/`)
        .then(({ data }) => transformPlayerData(data));

      if (cancelled) return;

      const playerData = { ...player, weeks: {} };

      const playerWeeksRequests = range(
        player.startedWeekNumber,
        player.latestWeekNumber
      ).map(weekNumber =>
        axios.get(`${API_URL}/entry/${player.id}/event/${weekNumber}/picks/`)
      );

      await axios.all(playerWeeksRequests).then(
        axios.spread(function(...responses) {
          responses.forEach(({ data }) => {
            const week = transformWeekData(data);
            playerData["weeks"][week.number] = week;
          });
        })
      );

      if (!cancelled) setPlayer(playerData);
    }

    fetchPlayer();

    return () => (cancelled = true);
  }, [playerId]);

  return player;
}
