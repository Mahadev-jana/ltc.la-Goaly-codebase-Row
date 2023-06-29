import React, { Component } from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { hasIn, size } from 'lodash';
// import HomeTeamGoals from './HomeTeamGoals';
// import noImage from '../../../assets/img/noimage.jpg'
import { Link } from 'react-router-dom';
import noImage from '../../assets/img/noimage.jpg';
import Moment from 'react-moment';
import History from './history';
import account from "../../assets/img/account-1@2x.png";
import cup from "../../assets/img/cup.svg";
import coins from "../../assets/img/coins.svg";
import manchester from '../../assets/img/Manchester united.svg';
import chelsea from '../../assets/img/Chelsea.svg';
import noDataImg from '../../assetsStaging/img/no_data_found.png'

// const Monthly = React.memo(({ scoreList }) => {
class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitTo: 3,
      seeAll: 'See All'
    }
  }
  onSeeAll = param => () => {
    this.setState({

      limitTo: this.state.limitTo + param,
      seeAll: 'Thats All'
    })
  }
  render() {
    const { scoreList } = this.props;
    const { limitTo } = this.state;
    return (

      <div class="cover-board" style={{ paddingTop: '24px' }}>
        {!!scoreList &&
          scoreList.map((score, key) => {

            return <>
              <div class="board shadow">
                <div class="player">
                  <div class="cover-img">
                    <img style={{ borderRadius: '50%' }} src={score.image} alt="" />
                    <div>{score.rank}</div>
                  </div>
                  <span class="name my-2">{score.name}</span>
                  <div class="achievement">
                    <div class="win">
                      <img src={cup} alt="" />
                      <span>{score.wins} Won</span>
                    </div>
                    <span class="text-secondary">|</span>
                    <div class="point">
                      <img src={coins} alt="" />
                      <span>{score.coins} Points</span>
                    </div>
                  </div>
                </div>

                {!!score.history && <div class="history">
                  <h4>History Point</h4>
                  <div class="cover-record">
                  </div>
                </div>}
                
                {!!score.history && 
                  <History historyScore={score.history}/>
                }
                {/* {!!score.history && score.history.slice(0, limitTo).map((details, index) => {
                  return <>
                    <div class="record">
                      <div class="match">
                        <div class="left-team">
                          <img
                            src={details.homeTeamLogo}
                            width="20%"
                            alt=""
                          />{" "}
                          {details.homeTeamName}
                        </div>
                        <span class="score">{details.homeTeamScore}-{details.awayTeamScore}</span>
                        <div class="right-team">
                          <img src={details.awayTeamLogo}

                            width="20%" alt="" />{" "}
                          {details.awayTeamName}
                        </div>
                      </div>
                      <div class="match-point">
                        <span class="date"><Moment format="ddd, DD/MM/YY">{details.created_at}</Moment></span>
                        <span class="point">{details.coin_won} Points</span>
                      </div>
                    </div>
                  </>
                })} */}
              </div>
              {/* <div class="see-all">
                <a onClick={this.onSeeAll((score.history.length - 1))}>{this.state.seeAll}</a>
              </div> */}
            </>
          })}
          
          {
            scoreList.length === 0 && <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
              <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
            </div>
          }

      </div>
    );
    // });
  }
}

export default Monthly;