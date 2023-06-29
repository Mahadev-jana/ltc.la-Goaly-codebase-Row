import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import * as moment from "moment";
import axios from "../../../_config/axios";
import { isArray, isEmpty } from "lodash";
import { RewardDetailsSimmer } from "../../../simmer-loader/index";
import noDataImg from "../../../assetsStaging/img/no_data_found.png";

const YesterdayAllTeamMatches = (props) => {
  const [matches, setMatches] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(true);
  const [noData, setNoData] = React.useState(false);

  useEffect(() => {
    myTeamFiteredMatches();
  }, []);
  const myTeamFiteredMatches = () => {
    const { timeTab } = props;
    // console.log(props)
    // console.log(teamTab)
    // console.log(timeTab)
    const payload = new FormData();
    payload.append("type", timeTab);
    // payload.append('user_id',userId);
    axios
      .post("StageGoalyApi/allTeamMatches", payload)
      .then((res) => {
        if (res.data) {
          if (
            res.data.code == 200 &&
            res.data.success == 1 &&
            res.data.error == 0
          ) {
            if (isArray(res.data.matches) && res.data.matches.length > 0) {
              setMatches(res.data.matches);
              setisLoading(false);
              // console.log(res.data)
            }
            if (isEmpty(res.data.matches)) {
              setNoData(true);
              setisLoading(false);
              // console.log(res.data)
            }
          }
          if (
            res.data.code == 400 &&
            res.data.success == 0 &&
            res.data.error == 1
          ) {
            if (isEmpty(res.data.matches)) {
              setNoData(true);
              setisLoading(false);
              // console.log(res.data)
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(props)
  return (
    <React.Fragment>
      {props.selectedLeagueId != 0 ? (
        <div>
          {matches
              .filter((a) => a.league_id === props.selectedLeagueId).length !== 0 ?matches &&
            matches
              .filter((a) => a.league_id === props.selectedLeagueId)
              .map((match, key) => (
                <div key={key}>
                  <div className="matches row">
                    <div className="d-flex j-center">
                      <div
                        className="club-left mx-1 text-center"
                        style={{ width: "80px" }}
                      >
                        <div
                          className="logo"
                          style={{ height: "80px", width: "80px" }}
                          onClick={() =>
                            props.history.push(
                              `/club-info/${match.homeTeam_id}`
                            )
                          }
                        >
                          <img
                            style={{ height: "65px", width: "65px" }}
                            src={match.homeTeam_image}
                            alt=""
                          />
                        </div>
                        <h5 className="mb-0">{match.homeTeam_name}</h5>
                      </div>
                      <div className="mid mx-2 d-flex flex-column my-auto">
                        {match.status === "FT" && (
                          <div
                            className="d-flex j-center h-max-c border radius-1 px-2 py-1"
                            style={{ fontSize: "16pt" }}
                          >
                            <span>
                              {match.localteam_score == ""
                                ? 0
                                : match.localteam_score}
                            </span>
                            <span className="mx-2 border-right"></span>
                            <span>
                              {match.visitorteam_score == ""
                                ? 0
                                : match.visitorteam_score}
                            </span>
                          </div>
                        )}
                        {match.status === "AET" && (
                          <div
                            className="d-flex j-center h-max-c border radius-1 px-2 py-1"
                            style={{ fontSize: "16pt" }}
                          >
                            <span>
                              {match.localteam_score == ""
                                ? 0
                                : match.localteam_score}
                            </span>
                            <span className="mx-2 border-right"></span>
                            <span>
                              {match.visitorteam_score == ""
                                ? 0
                                : match.visitorteam_score}
                            </span>
                          </div>
                        )}
                        <span className="my-1">
                          {utcToLocal(match.date_time)}
                        </span>
                        {match.status === "FT" && (
                          <Link to={`match/details/${match.fixture_id}`}>
                            {" "}
                            <span
                              style={{
                                background: "red",
                                color: "white",
                                padding: "1px 27px",
                                borderRadius: "15px",
                              }}
                            >
                              Finished
                            </span>
                          </Link>
                        )}
                        {match.status === "AET" && (
                          <Link to={`match/details/${match.fixture_id}`}>
                            {" "}
                            <span
                              style={{
                                background: "red",
                                color: "white",
                                padding: "1px 27px",
                                borderRadius: "15px",
                              }}
                            >
                              Finished
                            </span>
                          </Link>
                        )}
                        {match.status === "NS" && (
                          <span className="btn-pill bg-green">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <div
                        className="club-right mx-1 text-center"
                        style={{ width: "80px" }}
                      >
                        <div
                          className="logo"
                          style={{ height: "80px", width: "80px" }}
                          onClick={() =>
                            props.history.push(
                              `/club-info/${match.awayTeam_id}`
                            )
                          }
                        >
                          <img
                            style={{ height: "65px", width: "65px" }}
                            src={match.awayTeam_image}
                            alt=""
                          />
                        </div>
                        <h5 className="mb-0">{match.awayTeam_name}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              :
              <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
              </div>
            }
        </div>
      ) : (
        <div>
          {matches &&
            matches.map((match, key) => (
              <div key={key}>
                <div className="matches row">
                  <div className="d-flex j-center">
                    <div
                      className="club-left mx-1 text-center"
                      style={{ width: "80px" }}
                    >
                      <div
                        className="logo"
                        style={{ height: "80px", width: "80px" }}
                        onClick={() =>
                          props.history.push(`/club-info/${match.homeTeam_id}`)
                        }
                      >
                        <img
                          style={{ height: "65px", width: "65px" }}
                          src={match.homeTeam_image}
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0">{match.homeTeam_name}</h5>
                    </div>
                    <div className="mid mx-2 d-flex flex-column my-auto">
                      {match.status === "FT" && (
                        <div
                          className="d-flex j-center h-max-c border radius-1 px-2 py-1"
                          style={{ fontSize: "16pt" }}
                        >
                          <span>
                            {match.localteam_score == ""
                              ? 0
                              : match.localteam_score}
                          </span>
                          <span className="mx-2 border-right"></span>
                          <span>
                            {match.visitorteam_score == ""
                              ? 0
                              : match.visitorteam_score}
                          </span>
                        </div>
                      )}
                      {match.status === "AET" && (
                        <div
                          className="d-flex j-center h-max-c border radius-1 px-2 py-1"
                          style={{ fontSize: "16pt" }}
                        >
                          <span>
                            {match.localteam_score == ""
                              ? 0
                              : match.localteam_score}
                          </span>
                          <span className="mx-2 border-right"></span>
                          <span>
                            {match.visitorteam_score == ""
                              ? 0
                              : match.visitorteam_score}
                          </span>
                        </div>
                      )}
                      <span className="my-1">
                        {utcToLocal(match.date_time)}
                      </span>
                      {match.status === "FT" && (
                        <Link to={`match/details/${match.fixture_id}`}>
                          {" "}
                          <span
                            style={{
                              background: "red",
                              color: "white",
                              padding: "1px 27px",
                              borderRadius: "15px",
                            }}
                          >
                            Finished
                          </span>
                        </Link>
                      )}
                       {match.status === "AET" && (
                        <Link to={`match/details/${match.fixture_id}`}>
                          {" "}
                          <span
                            style={{
                              background: "red",
                              color: "white",
                              padding: "1px 27px",
                              borderRadius: "15px",
                            }}
                          >
                            Finished
                          </span>
                        </Link>
                      )}
                      {match.status === "NS" && (
                        <span className="btn-pill bg-green">Coming Soon</span>
                      )}
                    </div>
                    <div
                      className="club-right mx-1 text-center"
                      style={{ width: "80px" }}
                    >
                      <div
                        className="logo"
                        style={{ height: "80px", width: "80px" }}
                        onClick={() =>
                          props.history.push(`/club-info/${match.awayTeam_id}`)
                        }
                      >
                        <img
                          style={{ height: "65px", width: "65px" }}
                          src={match.awayTeam_image}
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0">{match.awayTeam_name}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* } */}
      {isLoading && <RewardDetailsSimmer />}
      {!isLoading && noData && (
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "280px",
          }}
        >
          <img
            style={{ height: "200px" }}
            src={noDataImg}
            className="animated bounce infinite"
            alt="Transparent MDB Logo"
            id="animated-img1"
          />
        </div>
      )}
    </React.Fragment>
  );
};
export default withRouter(YesterdayAllTeamMatches);

const utcToLocal = (dateTime) => {
  const stillUtc = moment.utc(dateTime).toDate();
  return moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");
};
