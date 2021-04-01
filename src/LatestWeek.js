import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";
import { range, getPlayerWeek, sortPlayersByWeek } from "./utils";

export default function LatestWeek({
  weekNumber,
  players = [],
  numberOfPlayers = 0
}) {
  if (players.length === 0) {
    return range(1, numberOfPlayers).map(key => (
      <Card key={key} style={{ margin: "10px 0" }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Skeleton
              style={{ margin: 10 }}
              variant="circle"
              width={40}
              height={40}
            />
            <div style={{ width: "30%" }}>
              <Skeleton height={6} width="80%" />
              <Skeleton height={6} width="40%" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80px"
                }}
              >
                <Skeleton variant="circle" height={10} width={10} />
                <Skeleton variant="circle" height={10} width={10} />
                <Skeleton variant="circle" height={10} width={10} />
                <Skeleton variant="circle" height={10} width={10} />
                <Skeleton variant="circle" height={10} width={10} />
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Skeleton variant="rect" height={30} width={30} />
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  }

  return (
    <Fragment>
      <Typography component="h5" variant="h5">
        Week {weekNumber}
      </Typography>
      {sortPlayersByWeek(players, weekNumber).map(player => {
        const week = getPlayerWeek(player, weekNumber);
        return (
          <Card key={player.id} style={{ margin: "10px 0" }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Avatar style={{ margin: 10 }}>{player.initials}</Avatar>
                <div>
                  <Typography variant="subtitle1" color="textSecondary">
                    {player.name}
                  </Typography>
                  <Typography variant="subtitle2">{player.teamName}</Typography>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <Typography
                    align="right"
                    style={{ display: "block" }}
                    variant="caption"
                  >
                    {`${week ? week.chip : "-"}`}
                  </Typography>
                  <Typography align="right" variant="h3">
                    {week ? week.points : 0}
                  </Typography>
                </div>
              </div>

              <div style={{ marginLeft: 60 }}>
                <Divider light />
                <div style={{ display: "flex" }}>
                  <div>
                    <Typography style={{ marginRight: 10 }} variant="subtitle1">
                      {"WWWWW"}
                    </Typography>
                  </div>
                  <Typography style={{ marginLeft: "auto" }} variant="caption">
                    {`TOTAL: ${player.points}`}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </Fragment>
  );
}
