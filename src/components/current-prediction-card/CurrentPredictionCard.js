import React, { Fragment, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
import { isNull } from 'lodash';
import { getUserDetails } from '../../_helper/authentication';
import UserPlayContest from '../../pages/matches/UserPlayContest';
import Swal from 'sweetalert2';
import Spinner from '../../components/loders/loder-spinner';
import './currentPrediction.css';
import * as moment from 'moment';
import Countdown from 'react-countdown';
import stadiumImg from '../../assetsStaging/img/stadium.png';


const CurrentPredictionCard = React.memo(({ venue_image, isLoading, awayteam, awayteamid, awayteamlogo, hometeam, hometeamid, hometeamlogo, id,
 match_id, league_logo, match_start, players, pred_end, pred_start, venue, history, currentDate, score_home, score_away, status, winPoint }) => {
    function awayDetails() {

        // history.push(`team/${awayteamid}`);


    }
    function homeDetails() {

        // history.push(`team/${hometeamid}`);


    }

    function playContest() {
        console.log(getUserDetails())
        if (getUserDetails() == null) {
            console.log('user not logged in');
            Swal.fire({
                title: 'You need to login to predict',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'OKAY',
                cancelButtonText: 'CANCEL'
            }).then((result) => {
                if (result.value) {
                    history.push('/login')
                }
            })

        }
        else {
            history.push(`contest/${id}`)
        }

    }

    const [{ open, predictionId }, setModal] = useState({ open: false, predictionId: null });
    console.log(currentDate)
    var now = currentDate;
    var then = match_start;
    var ms = moment(then, "YYYY/MM/DD HH:mm:ss").diff(moment(now, "YYYY/MM/DD HH:mm:ss"));
    // function dayHourMinuteFormat(ms){
    //     const days = Math.floor(ms / (24*60*60*1000));
    //     const daysms=ms % (24*60*60*1000);
    //     const hours = Math.floor((daysms)/(60*60*1000));
    //     const hoursms=ms % (60*60*1000);
    //     const minutes = Math.floor((hoursms)/(60*1000));
    //     const minutesms=ms % (60*1000);
    //     const sec = Math.floor((minutesms)/(1000));
    //     return days+"d:"+hours+"h:"+minutes+"m";
    // }

    // const timeLeftToStartGame = dayHourMinuteFormat(ms);
    // console.log(timeLeftToStartGame)
    // console.log(ms)
    // console.log(days,"ddddddddd")
    // console.log(timeLeftToStart)
    // console.log(now)
    // console.log(then)
    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <p class="text-center text-white mb-1">
                Closed at <br />
                <strong>{days}d:{hours}h:{minutes}m:{seconds}s</strong>
            </p>

        }
    };
    var dynamicBackground = {
        backgroundImage: 'url(' + venue_image + ')'
    }
    var staticBackground = {
        backgroundImage: 'url(' + stadiumImg + ')'
    }
    return (
        <React.Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {!isNull(id) && <UserPlayContest predictionId={predictionId} closeModal={() => setModal({ open: false, predictionId: null })} />}
            </Modal>
            {!isLoading && <div className="contest row" style={(venue_image == "" || venue_image == null) ? staticBackground : dynamicBackground}>
                <div className='blurContainer'>
                    <div className="d-flex j-center">
                        <div className="club-left mx-1 text-center" onClick={homeDetails} style={{ width: '80px' }}>
                            <div className="logo" onClick={() => history.push(`/club-info/${hometeamid}`)}><img style={{ height: '65px', width: '65px' }} src={hometeamlogo} alt="" /></div>
                            <h5 className="mb-0">{hometeam}</h5>
                        </div>
                        {(currentDate <= match_start) &&
                            <div className="mid mx-2 d-flex ais-center">
                                <div className="h-max-c">
                                    <div className="date p-1"><Moment format="ddd, DD/MM/YY">{match_start}</Moment></div>
                                    <div className="place p-1">{venue}</div>
                                </div>
                            </div>
                        }
                        {(currentDate > match_start) &&
                            <div class="mid mx-2 d-flex flex-column my-auto">
                                <div class="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                    <span>{score_home}</span>
                                    <span class="mx-2 border-right"></span>
                                    <span>{score_away}</span>
                                </div>
                                <span class="my-1"><Moment format="ddd, DD/MM/YY">{match_start}</Moment></span>
                            </div>
                        }
                        <div className="club-right mx-1 text-center" onClick={awayDetails} style={{ width: '80px' }}>

                            <div className="logo" onClick={() => history.push(`/club-info/${awayteamid}`)}><img style={{ height: '65px', width: '65px' }} src={awayteamlogo} alt="" /></div>
                            <h5 className="mb-0">{awayteam}</h5>
                        </div>
                    </div>

                    {(currentDate > match_start ) && <div className="d-flex" style={{marginTop:"2rem"}}>
                           <div className="w-100 p-1 border text-white" style={{borderRadius:"10px",backgroundColor:'rgb(255, 255, 255, 0.15)'}}>
                            This match has ended on:<br/>
                            <strong><Moment format="ddd, DD/MM/YY">{utcToLocal(pred_end)}</Moment></strong>
                           </div>
                       </div>
                    }



                   {(currentDate <= match_start) && <div className="d-flex border" style={{marginTop:'2rem',borderColor:'white',borderRadius:'10px',backgroundColor:'rgb(255, 255, 255, 0.15)'}}>
                        <div className="w-50 p-1 bg-transparent text-white border-right">
                        Points You Got:<br/>
                        <strong>100 Points</strong>
                        </div>
                        <div className="w-50 p-1 bg-transparent text-white ">
                            {/*Closed at:} <br/>*/}
                            <strong>{/*0d:7h:58m:3s*/} <Countdown
                                date={Date.now() + ms}
                                renderer={renderer}
                            /></strong>
                        </div>
                    </div>
                    }


                    {/* {(currentDate <= match_start) &&
                        <>
                            <p class="text-center text-white mt-2" style={{ display: 'content' }}><strong>100 Points</strong></p>
                            <hr class="mt-1 mb-1" />
                        </>
                    }

                    {(currentDate <= match_start) &&
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <Countdown
                                date={Date.now() + ms}
                                renderer={renderer}
                            />



                        </div>

                    } */}

                    {(currentDate >= pred_start) && (currentDate <= pred_end) &&
                        <>
                            <button type="button" className="btn bg-green p-2 w-100 my-2 text-white"
                                style={{ fontSize: '12pt',backgroundColor:'#7cd327' }} onClick={playContest}>
                                <strong>LET'S PLAY</strong>
                            </button>
                            <div className="d-flex">
                                <div className="w-50 p-1 bg-whitesmoke border-right" style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>Start: <br /> <strong><Moment format="ddd, DD/MM/YY">{pred_start}</Moment></strong></div>
                                <div className="w-50 p-1 bg-whitesmoke" style={{ borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>End: <br /> <strong><Moment format="ddd, DD/MM/YY">{pred_end}</Moment></strong></div>
                            </div>
                            <button type="button" className="btn btn-lg btn-maroon mt-2" onClick={() => setModal({ open: true, predictionId: id })} style={{padding:'5px'}}>See Who Play</button>
                        </>
                    }
                    {(currentDate < pred_start) && (currentDate < pred_end) &&
                        <button type="button" className="btn bg-green p-2 w-100 my-2 text-white" style={{ fontSize: '12pt' }}><strong>COMING UP</strong></button>
                    }
                    {(currentDate > pred_start) && (currentDate > pred_end) &&
                    <>
                        <button type="button" className="btn bg-green p-2 w-100 my-2 text-white" style={{ fontSize: '12pt',backgroundColor:'#cfcfcf' }} onClick={()=>history.push(`match/details/${match_id}`)}><strong>MATCH RESULT</strong></button>
                        <button type="button" className="btn btn-lg btn-maroon" onClick={() => setModal({ open: true, predictionId: id })} style={{padding:'5px'}}>Prediction Result</button>
                        </>
                    }

                    {/* <div className="w-100 p-2 text-white" style={{ border: ' 1px solid whitesmoke', borderRadius: "0 0 10px 10px" }}>
                    Total point can win: <b>100</b>
                </div> */}
                    
                </div>
            </div>
            }
        </React.Fragment>

    )
});

export default withRouter(CurrentPredictionCard);


{/* <div>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {!isNull(id) && <UserPlayContest predictionId={predictionId} closeModal={() => setModal({ open: false, predictionId: null })} />}
            </Modal>
            <Row style={{ marginBottom: '30px' }}>
                <Col xs={12} className="lm ct pd-0">
                    <div class="ct-page">
                        {(currentDate < pred_start) && (currentDate < pred_end) && <Link >
                            <span style={{
                                position: 'absolute',
                                top: '35%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'rgb(255, 255, 255)',
                                padding: '10px 20px',
                                fontSize: '20px',
                                letterSpacing: '1px',
                                borderRadius: '5px'
                            }}>Coming Up</span>
                        </Link>}
                        {(currentDate >= pred_start) && (currentDate <= pred_end) &&
                            <div onClick={playContest}
                            //  to={`contest/${id}`}
                            >
                                <span style={{
                                    position: 'absolute',
                                    top: '28%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    // background: 'rgb(72 41 89 / 1)',
                                    color: 'rgb(255, 255, 255)',
                                    padding: '10px 20px',
                                    fontSize: '20px',
                                    letterSpacing: '1px',
                                    padding: '10px 35px 10px 35px'
                                    // borderRadius: '5px'
                                }}>Let's Play</span>

                            </div>
                        }
                        {(currentDate > pred_end) && (currentDate > pred_start) && <Link >
                            <span style={{
                                position: 'absolute',
                                top: '35%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'rgb(255, 255, 255)',
                                padding: '10px 20px',
                                fontSize: '20px',
                                letterSpacing: '1px',
                                borderRadius: '5px'
                            }}>Time Up</span>
                        </Link>}

                        <div class="head">
                            <div class="col-xs-7 pl-10 pr-5">
                                <div class="left" style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <img src={league_logo} height="34" alt="" style={{
                                        width: 'auto'
                                    }} />
                                    &nbsp; {league}
                                </div>
                            </div>
                            <div class="col-xs-5 pr-10 pl-10 text-right">
                                <div class="right" style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div class="matchdate"><Moment format="ddd, DD/MM/YY">{match_start}</Moment></div>
                                    <div class="stadium" style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {venue} &nbsp;
									<img src="http://fe.linkit360.com/goaly/img/thumb/ico-stadium.png" alt="" style={{
                                            width: 'auto'
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Row className="mid2">
                            <Col xs={12} className="pd-0">
                                <Row>
                                    <Col xs={3} onClick={homeDetails}>
                                        <div class="square">
                                            <img src={hometeamlogo} height="60" alt="" />
                                        </div>
                                    </Col>
                                    <Col xs={6} className="pd-0 text-center">
                                        <div class="line">
                                            <div class="text-center" style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <div>{hometeam}</div>
                                                {status && status == "FT" && <div style={{ padding: 5, paddingLeft: '15px' }}>{score_home}</div>}
                                                <div style={{ margin: '0 5px' }}>Vs</div>
                                                {status && status == "FT" && <div style={{ padding: 5, paddingLeft: '20px' }}>{score_away}</div>}
                                                <div>{awayteam}</div>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={3} onClick={awayDetails}>
                                        <div class="square2 text-right">
                                            <img src={awayteamlogo} height="60" alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="clearfix"></div>
                    <div class="bt-page2">
                        <ul>
                            {!!pred_start && <li>
                                <strong>Prediction:</strong>  <span class="pre-date text-green"><strong>Start: </strong><Moment format="ddd, DD/MM/YY">{pred_start}</Moment>&nbsp;&nbsp;|&nbsp;&nbsp;<strong>End:</strong> <Moment format="ddd, DD/MM/YY">{pred_end}</Moment> </span>
                            </li>}
                            <li>
                                <strong>Total point can win:{winPoint}</strong>
                            </li>
                            <li>
                                {!!players.length && <strong >User who play:</strong>}
                                <span class="pre-date">
                                    {players && players.map((prediction, key) => (
                                        <div >&nbsp; {key + 1}.{prediction.name}&nbsp;({prediction.prediction}) </div>
                                    ))}
                                </span>
                            </li>
                            {(currentDate >= pred_start) && (currentDate <= pred_end) ?
                                <li className="text-center">
                                    <a className="btn btn-who" onClick={() => setModal({ open: true, predictionId: id })} style={{ marginRight: '15px' }}>Show Who Play</a>
                                    <span className="btn btn-who" style={{ background: 'white', color: 'black', border: '1px solid black' }}>Weekly Contest</span>
                                </li>
                                :
                                <li className="text-center">
                                    <a className="btn btn-who" onClick={() => setModal({ open: true, predictionId: id })} >Show Who Play</a>

                                </li>
                            }
                        </ul>
                    </div>
                </Col>
            </Row>
        </div> */}
        const utcToLocal = dateTime => {
            const stillUtc = moment.utc(dateTime).toDate();
            return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
        }

const styles = {

    title: {
        background: stadiumImg
    }
}