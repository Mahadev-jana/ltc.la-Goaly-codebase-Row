import React, { Fragment } from 'react';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import { PlayersSimmer, MatchesSimmer, MatchesHeadingSimmer } from '../../simmer-loader/index';

const Standings = (props) => {



    const { standings, loading, compId } = props;


    // console.log(standings)
    // console.log(roundList)
    return (
        <Fragment>
            {/* <div>
                {loading &&
                    <StandingSimmer />
                }
            </div> */}
            <div className="tab-content">



                <div className="standings table-responsive">
                    {standings && standings.length >= 1 && standings.map((standing, key) => {
                        // {console.log(standing)}
                        return <div key={key}>
                            {standing.group_name !== 'Regular Season' && <div key={key}>{standing.group_name}</div>}
                            <table className="table">

                                <thead>
                                    <tr className="bg-dark text-white">
                                        <td colSpan="2">Team</td>
                                        <td>Pts</td>
                                        <td>P</td>
                                        <td>W</td>
                                        <td>D</td>
                                        <td>L</td>
                                        <td>F</td>
                                        <td>A</td>
                                        <td>GD</td>
                                    </tr>
                                </thead>
                                {loading ?

                                    <>
                                        <MatchesSimmer />
                                        <MatchesSimmer />
                                    </>
                                    :
                                    <>
                                        {standing.data.length >= 1 ?
                                            <tbody>


                                                {/* {console.log(standing.data)} */}
                                                {standing.data.map((d, key) => {
                                                    return <tr key={key}>
                                                        <td className="bg-blue text-white">{key + 1}.</td>
                                                        <td style={{ whiteSpace: "nowrap" }}>
                                                            <div className="desc">
                                                                <img src={d.team_logo} alt="" style={{ maxWidth: '30px' }} />
                                                                <div className="team">
                                                                    <span>{d.team_name}</span>
                                                                    <ul>
                                                                        {d.winner.map((win, key) => {

                                                                              if(win.slice(0, 1).toUpperCase() == 'W'){
                                                                                return <li key={key} className={win.slice(0, 1).toUpperCase() == 'W' ? "bg-green" : win.slice(0, 1).toUpperCase() == 'L' ? 'bg-red' : "bg-orange"}>{win.slice(0, 1).toUpperCase()}</li>
                                                                            }
                                                                            else if(win.slice(0, 1).toUpperCase() == 'L'){
                                                                                return <li key={key} className={win.slice(0, 1).toUpperCase() == 'W' ? "bg-green" : win.slice(0, 1).toUpperCase() == 'L' ? 'bg-red' : "bg-orange"}>{win.slice(0, 1).toUpperCase()}</li>
                                                                            }
                                                                            else{
                                                                                return <li key={key} className={win.slice(0, 1).toUpperCase() == 'W' ? "bg-green" : win.slice(0, 1).toUpperCase() == 'L' ? 'bg-red' : "bg-orange"}>D</li>;
                                                                            }
                                                                        })}


                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="smw"><strong>{d.points}</strong></td>
                                                        <td className="smw">{d.games_played} <br /> <span className="radius-1 bg-grey" style={{ padding: '4px' }}>-1</span></td>
                                                        <td className="smw">{d.won}</td>
                                                        <td className="smw">{d.draw}</td>
                                                        <td className="smw">{d.lost}</td>
                                                        <td className="smw">{d.goals_scored}</td>
                                                        <td className="smw">{d.goals_against}</td>
                                                        <td className="smw">{d.goal_difference}</td>
                                                    </tr>



                                                })}

                                            </tbody>

                                            :
                                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                                            </div>
                                        }
                                    </>
                                }
                            </table>
                        </div>
                    })}

                </div>

            </div>
        </Fragment>

    )
}
export default Standings;