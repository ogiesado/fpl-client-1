import React from "react";
import { Box, Container } from "@material-ui/core";
import Header from "./Header";
import LatestWeek from "./LatestWeek";
import Summary from "./Summary";
import History from "./History";
import { CURRENT_WEEK_VIEW, SUMMARY_VIEW, HISTORY_VIEW } from "./constants";
import data from "./data";
import usePlayers from "./usePlayers";
import usePlayer from "./usePlayer";
import { getPlayerLatestWeekNumber } from "./utils";

export default function Fpl() {
  const [view, setView] = React.useState(CURRENT_WEEK_VIEW);
  const players = usePlayers(data.playerIds);
  const player = usePlayer(data.playerIds[0]);
  const numberOfPlayers = data.playerIds.length;
  const latestWeekNumber = getPlayerLatestWeekNumber(players[0]);

  return (
    <Box m={-1}>
      <Header view={view} onViewChange={setView} />
      <Container fixed>
        {view === CURRENT_WEEK_VIEW && (
          <LatestWeek
            weekNumber={latestWeekNumber}
            players={players}
            numberOfPlayers={numberOfPlayers}
          />
        )}
        {view === SUMMARY_VIEW && <Summary />}
        {view === HISTORY_VIEW && <History />}
        <pre>{JSON.stringify(player, null, 2)}</pre>
        <pre>{JSON.stringify(players, null, 2)}</pre>
      </Container>
    </Box>
  );
}
