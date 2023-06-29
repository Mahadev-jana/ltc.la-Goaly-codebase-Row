import React from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Moment from 'react-moment';
import { post } from '../../api';

class LastMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeTeam_match: {},
            awayTeam_match: {},
            homeTeam_name: '',
            awayTeam_name: '',
            homeTeam_logo: '',
            awayTeam_logo: '',
            homeTeamId: this.props.homeTeamId,
            awayTeamId: this.props.awayTeamId

        }
    }
    componentDidMount() {
        console.log(this.props.homeTeamId,this.props.awayTeamId,'vfhgvhg')
        const payload = new FormData();
        payload.append('homeTeam', this.props.homeTeamId);
        payload.append('awayTeam', this.props.awayTeamId);
        post('StageGoalyApi/getLastMatchByTeam', payload)
            .then(res => {
                this.setState({ homeTeam_match: res.data.homeTeam_match });
                this.setState({ awayTeam_match: res.data.awayTeam_match });
                this.setState({ homeTeam_name: res.data.home_name });
                this.setState({ awayTeam_name: res.data.away_name });
                this.setState({ homeTeam_logo: res.data.home_logo });
                this.setState({ awayTeam_logo: res.data.away_logo });
            })
            .catch(err => console.log(err));
    }
    render() {
        let resultStatus = [];
        resultStatus[2] = `<div className="bdstat draw">D</div>`;
        resultStatus[0] = `<div className="bdstat lose">L</div>`;
        resultStatus[1] = `<div className="bdstat win">W</div>`;
        const { matches, homeTeam_match, homeTeamId, awayTeamId,
            awayTeam_match, homeTeam_name, awayTeam_name, homeTeam_logo, awayTeam_logo } = this.state;


        const matchStatus = { 'D': 2, 'W': 1, 'L': 0 };
        return (
            <div className="col-xs-12 pd-0">
                <div className="lm" style={{ padding: '15px' }}>
                    <div className="col-xs-12 pd-0">
                        <h4 className="inline">Last Match </h4>
                    </div>

                    <div className="col-xs-12 pd-0" style={{ float: 'left', marginLeft: "-3%" }}>
                        <div className="col-md-12 pd-0"> <img src={homeTeam_logo} style={{ height: 28, width: 28, marginBottom: 5 }} alt="" /> <strong>{homeTeam_name}</strong>
                            {Object.entries(homeTeam_match).map((data, key) => (
                                data[1].map((league, key) => (
                                    <div key={key}>
                                        {league.winnerTeamId == null && league.winnerTeamId != homeTeamId && league.winnerTeamId != awayTeamId && <div key={key} className="bdstat draw" style={{ float: 'right' }}>D</div>}
                                        {league.winnerTeamId == homeTeamId && league.winnerTeamId != null && league.winnerTeamId != awayTeamId && <div key={key} className="bdstat win" style={{ float: 'right' }}>W</div>}
                                        {league.winnerTeamId != homeTeamId && league.winnerTeamId != null && <div key={key} className="bdstat lose" style={{ float: 'right' }}>L</div>}
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                    <div className="liner"></div>
                    {Object.entries(homeTeam_match).map((data, key) => (
                        <React.Fragment key={key}>
                            <h5>{data[0]}</h5>
                            <table className="table table-striped custab mb-10">
                                <tbody>
                                    {data[1].map((league, key) => (
                                        <tr key={key} onClick={() => this.props.history.push(`/match/details/${league.match_id}`)}>
                                            <td>
                                                <div className="col-xs-1 pd-0">
                                                    <img src={league.home_logo} style={{ height: 27 }} />
                                                </div>

                                                <div className="col-xs-3 pd-0">
                                                    <p className="text-right">{league.homeTeam_name}</p>
                                                </div>
                                                <div className="col-xs-4 plr5 text-center">
                                                    <td width="45" className="text-date" ><Moment format="ddd,DD/MM/YY" style={{ marginLeft: 17 }}>{league.date_time}</Moment></td>
                                                    {league.homeTeam_id == league.winnerTeamId && <strong><span style={{ color: "green" }}>{league.homeTeam_score}</span> - <span style={{ color: "red" }}>{league.awayTeam_score}</span></strong>}
                                                    {league.awayTeam_id == league.winnerTeamId && <strong><span style={{ color: "red" }}>{league.homeTeam_score}</span> - <span style={{ color: "green" }}>{league.awayTeam_score}</span></strong>}
                                                    {league.awayTeam_id != league.winnerTeamId && league.homeTeam_id != league.winnerTeamId && <strong>{league.homeTeam_score}- {league.awayTeam_score}</strong>}
                                                </div>
                                                <div className="col-xs-3 pd-0">
                                                    <p className="text-left">{league.awayTeam_name}</p>
                                                </div>

                                                <div className="col-xs-1 pd-0">
                                                    <img src={league.away_logo} style={{ height: 27 }} />
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </React.Fragment>
                    ))}
                    <div className="col-xs-12 pd-0">
                        <h4 className="inline">Last Match </h4>
                    </div>

                    <div className="col-xs-12 pd-0" style={{ float: 'left', marginLeft: "-3%" }}>
                        <div style={{ float: 'left' }}> <img src={awayTeam_logo} style={{ height: 28, width: 28, marginBottom: 5 }} alt="" /> <strong>{awayTeam_name}</strong></div>

                        {Object.entries(awayTeam_match).map((data, key) => (
                            data[1].map((league, key) => (
                                <div key={key}>
                                    {league.winnerTeamId == null && league.winnerTeamId != homeTeamId && league.winnerTeamId != awayTeamId && <div className="bdstat draw" style={{ float: 'right' }}>D</div>}
                                    {league.winnerTeamId != homeTeamId && league.winnerTeamId != null && league.winnerTeamId == awayTeamId && <div className="bdstat win" style={{ float: 'right' }}>W</div>}
                                    {league.winnerTeamId != awayTeamId && league.winnerTeamId != null && <div className="bdstat lose" style={{ float: 'right' }}>L</div>}
                                </div>

                            ))
                        ))}
                    </div>


                    <div className="liner"></div>
                    {Object.entries(awayTeam_match).map((data, key) => (
                        <React.Fragment key={key}>
                            <h5>{data[0]}</h5>
                            <table className="table table-striped custab mb-10">
                                <tbody>
                                    {data[1].map((league, key) => (
                                        <tr key={key} onClick={() => this.props.history.push(`/match/details/${league.match_id}`)}>
                                            <td>
                                                <div className="col-xs-1 pd-0">
                                                    <img src={league.home_logo} style={{ height: 27 }} />
                                                </div>

                                                <div className="col-xs-3 pd-0">
                                                    <p className="text-right">{league.homeTeam_name}</p>
                                                </div>
                                                <div className="col-xs-4 plr5 text-center">
                                                    <td width="45" className="text-date" ><Moment format="ddd,DD/MM/YY" style={{ marginLeft: 17 }}>{league.date_time}</Moment></td>

                                                    {league.homeTeam_id == league.winnerTeamId && <strong><span style={{ color: "green" }}>{league.homeTeam_score}</span> - <span style={{ color: "red" }}>{league.awayTeam_score}</span></strong>}
                                                    {league.awayTeam_id == league.winnerTeamId && <strong><span style={{ color: "red" }}>{league.homeTeam_score}</span> - <span style={{ color: "green" }}>{league.awayTeam_score}</span></strong>}
                                                    {league.awayTeam_id != league.winnerTeamId && league.homeTeam_id != league.winnerTeamId && <strong>{league.homeTeam_score}- {league.awayTeam_score}</strong>}
                                                </div>
                                                <div className="col-xs-3 pd-0">
                                                    <p className="text-left">{league.awayTeam_name}</p>
                                                </div>

                                                <div className="col-xs-1 pd-0">
                                                    <img src={league.away_logo} style={{ height: 27 }} />
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }
};

export default withRouter(LastMatch);