import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { post } from "../../api";
import { LeaderboardSimmer } from "../../simmer-loader";
import { Tabs, Tab, DropdownButton, MenuItem,ButtonGroup,Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import All from "./all";
import Monthly from "./monthly";
import Weekly from "./weekly";
// import "../../assets/css/leaderboard.css";
// import '../../assets/css/bootstrap.min.css';
import phone from '../../assets/img/slider/1.png';
import band from '../../assets/img/slider/3.png';
import playstation from '../../assets/img/slider/2.png';
import Slider from './slider';
import axios from '../../_config/axios';
import './index.css';
const sliderData=[
  {
    id:1,
    url:phone,
    desc:'slide1'

  },
  {
    id:2,
    url:playstation,
    desc:'slide1'
  },
  {
    id:3,
    url:band,
    desc:'slide1'
  }

]
class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      allGen:[],
      user:[],
      weekly: [],
      monthly: [],
      userData:[],
      loading: false,
      tab: "All",
      sliderData:[],
      slideLoading:false,
      mergedArray:[],
      secondPartOfFirstArray:[],
      firstPartOfFirstArray:[],
      mergedArray2:[]
    };
  }

  componentDidMount() {
   
    this.setState({
      slideLoading:true
    });
    setTimeout(()=>{
      this.setState({sliderData,slideLoading:false});
    });
    this.setState({ loading: true });
    
    // post("getleaderboard")
    //   .then(res => {
    //     if (res.data.success)
          // this.setState({
          //   all: res.data.score_list.general,
          //   weekly: res.data.score_list.weekly,
          //   monthly: res.data.score_list.monthly,

          //   loading: true
          // });
    //   })
    //   .catch(err => console.log(err));
    // const payload = new FormData();
    // const userdetails = JSON.parse(localStorage.getItem('userDetails'));
    
    // payload.append('user_id', userdetails.id);
    axios({
        method: 'post',
        url: 'api/getleaderboard',

        // headers: {
        //     'JWT': localStorage.getItem('JWT'),
        // },
        // data: payload
    }).then(res => {
        
        if ( res.data.success) {
            // console.log('fgdbg')
            this.setState({
              all: res.data.score_list.general,
              weekly: res.data.score_list.weekly,
              monthly: res.data.score_list.monthly,
              userData:res.data.score_list.userData,
              // id:userdetails.id,
  
              loading: true,

             
              // secondPartOfFirstArray:res.data.score_list.general.slice(3,res.data.score_list.general.length),
              // firstPartOfFirstArray:res.data.score_list.general.slice(0,3),
              // mergedArray:[...this.state.firstPartOfFirstArray,...this.state.secondPartOfFirstArray]
              
            });
            // console.log(jnhjhj) 
            // this.state.all.map((element,index)=>{
              
            //      console.log('find');
            //    let sub = {
            //                "user_id":element.user_id,
            //                "name": element.name,
            //                "image": element.image,
            //                "coins":element.coins,
            //                "wins":element.wins,
            //                "rank":element.rank,
            //                "history":element.history
            //            }
                      
            //            this.state.allGen.push(sub);
            //            if (element.user_id.search(id) != -1) {
            //             let sub = {
            //               "user_id":element.user_id,
            //               "name": element.name,
            //               "image": element.image,
            //               "coins":element.coins,
            //               "wins":element.wins,
            //               "rank":element.rank,
            //               "history":element.history
            //           }
                      
            //          this.state.user.push(sub);
            //           }
            //           }) 
                    
            }
        
    }).catch(err => {
        console.log({ err })
    })

 
  
  }
 

  setTab(tab) {
    this.setState({
      tab: tab
    });
    this.setState({ id: this.props.id });
  }

  render() {
    const {sliderData,slideLoading,id}=this.state;
    console.log(this.stateallGen)
    // this.state.mergedArray=[...this.state.firstPartOfFirstArray,...userData,...this.state.secondPartOfFirstArray]
    // this.state.mergedArray2=[...this.state.firstPartOfFirstArray,...this.state.secondPartOfFirstArray]
    // console.log(this.state.mergedArray)
    return (
      <React.Fragment>
				{/* <Helmet>
					<title>Goaly | Leaderboard</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />
				</Helmet> */}
      <div class="row leaderboard">
            <div class="header-leaderboard">
                <h4>LEADERBOARD</h4>

                <ul class="sortmenu">
                    <button className={this.state.tab === 'All' ? 'buttonGray':'buttonPink'}><a variant={this.state.tab} eventKey="All"  onClick={() => this.setState({ tab: 'All' })}>All</a></button>
                    <button className={this.state.tab === 'Weekly' ? 'buttonGray':'buttonPink'}><a  activeKey={this.state.tab} onClick={() => this.setState({ tab: 'Weekly' })}>Weekly</a></button>
                    <button className={this.state.tab === 'Monthly' ? 'buttonGray':'buttonPink'}><a activeKey={this.state.tab}  onClick={() => this.setState({ tab: 'Monthly' })}>Monthly</a></button>
                </ul>
                {/* <div class="body-leaderboard"> */}
                
                    {/* </div> */}
            </div>
            <div id="slider" class="carousel slide" data-ride="carousel" style={{height: '90px'}}>
            {!slideLoading && <Slider sliderData={this.state.sliderData} />}
            </div>
            
        {this.state.tab === 'All' && !!this.state.all.length && <All scoreList={this.state.all} id={id}
        // userData={this.state.userData} 
        // secondPartOfFirstArray={this.state.secondPartOfFirstArray} 
        // firstPartOfFirstArray={this.state.firstPartOfFirstArray} 
        // mergedArray={this.state.mergedArray}
        // mergedArray2={this.state.mergedArray2} 

        />}
        {this.state.tab === 'Weekly' && <Weekly scoreList={this.state.weekly} />}
        {this.state.tab === 'Monthly' && <Monthly scoreList={this.state.monthly} />}
      </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LeaderBoard);
