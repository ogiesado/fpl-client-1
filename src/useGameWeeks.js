import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constants";
import { transformWeekData } from "./utils";

export default function useGameWeeks(playerId, latestWeekNumber) {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    if (latestWeekNumber < 1) return;
    let cancelled = false;
    const weekRequests = [];

    for (let weekNumber = 1; weekNumber <= latestWeekNumber; weekNumber++) {
      weekRequests.push(
        axios.get(`${API_URL}/entry/${playerId}/event/${weekNumber}/picks/`)
      );
    }

    async function fetchWeek() {
      try {
        const weeks = await axios.all(weekRequests).then(
          axios.spread(function(...responses) {
            return responses
              .map(({ data }) => {
                return transformWeekData(data);
              })
              .sort((a, b) => a - b);
          })
        );

        if (!cancelled) {
          setWeeks(weeks);
        }
      } catch (e) {
        throw e;
      }
    }

    fetchWeek();

    return () => (cancelled = true);
  }, [playerId, latestWeekNumber]);

  function getWeek(weekNumber) {
    return weeks.find(({ number }) => number === weekNumber);
  }

  return {
    weeks,
    getWeek,
    currentWeek: getWeek(latestWeekNumber)
  };
}
