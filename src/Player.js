import React from "react";
import usePlayer from "./usePlayer";
import useGameWeeks from "./useGameWeeks";

export default function Player({ id }) {
  const player = usePlayer(id);
  const gameWeek = useGameWeeks(id, player && player.latestWeekNumber);

  if (!player) {
    return <div>Loading player...</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(player, null, 2)}</pre>
      <pre>{JSON.stringify(gameWeek, null, 2)}</pre>
    </div>
  );
}
