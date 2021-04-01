export function transformPlayerData(data) {
  if (data === null) return null;

  return {
    id: data.id,
    name: `${data.player_first_name} ${data.player_last_name}`,
    initials: `${data.player_first_name[0].toUpperCase()}${data.player_last_name[0].toUpperCase()}`,
    teamName: data.name,
    points: data.summary_overall_points,
    startedWeekNumber: data.started_event,
    latestWeekNumber: data.current_event
  };
}

export function transformWeekData(data) {
  if (data === null) return null;

  return {
    number: data.entry_history.event,
    chip: data.active_chip ? data.active_chip : "-",
    points: data.entry_history.points,
    cummulativePoints: data.entry_history.total_points,
    benchPoints: data.entry_history.points_on_bench,
    numberOfTransfers: data.entry_history.event_transfers,
    costOfTransfers: data.entry_history.event_transfers_cost
  };
}

export function transformCurrentWeekData(player, week) {
  if (player === null || week === null) return null;

  return {
    playerId: player.id,
    playerName: player.name,
    playerInitials: player.initials,
    teamName: player.teamName,
    totalPoints: player.points,
    weekPoints: week.points,
    weekNumber: week.number,
    usedChip: week.chip,
    benchPoints: week.benchPoints,
    numberOfTransfers: week.numberOfTransfers,
    costOfTransfers: week.costOfTransfers
  };
}

export function range(start = 0, end = 0) {
  const numbers = [];

  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  return numbers;
}

export function getPlayerLatestWeekNumber(player) {
  if (player && Object.keys(player.weeks).length > 0) {
    return Object.keys(player.weeks)
      .sort()
      .pop();
  }
  return 0;
}

export function getPlayerWeek(player, weekNumber) {
  if (player && Object.keys(player.weeks).length > 0) {
    if (weekNumber in player.weeks) {
      return player.weeks[weekNumber];
    }

    return null;
  }

  return null;
}

export function sortPlayersByWeek(players = [], weekNumber) {
  if (players.length === 0 || weekNumber === 0) return [...players];

  return [...players].sort((playerOne, playerTwo) => {
    const playerOneWeek = getPlayerWeek(playerOne, weekNumber);
    const playerTwoWeek = getPlayerWeek(playerTwo, weekNumber);

    if (playerOneWeek.points > playerTwoWeek.points) {
      return -1;
    }
    if (playerOneWeek.points < playerTwoWeek.points) {
      return 1;
    }
    return 0;
  });
}
