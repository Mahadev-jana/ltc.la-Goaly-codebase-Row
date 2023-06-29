import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { isAuthenticate } from '../../_helper/authentication';
import SetFavTeam from '../../components/set-fav-team/SetFavTeam';
import LatestNews from '../../components/latest-news';
import MyTeam from '../../components/my-team';
import OtherMatches from '../../components/other-matches/OtherMatches';
import ContestSlider from '../../components/ContestSlider';
import BigMatches from '../../components/big-matches/BigMatches';
// import LiveMatches from '../../components/live-matches/LiveMatches';
import LatestMatchSlider from '../../components/latest-match-slider';
import VideoHighlights from '../../components/highlights/VideoHighlights';
import MenuCategory from '../../components/menu-category';
import { post, authPost } from '../../api';
import RewardsSlider from '../reward/tabs/RewardsSlider';
import imgTeamAdd from '../../assets/img/tm-add.png';
import AddFavoriteClub from './add-favorite-clubs/AddFavoriteClubs';
import ListMatches from './list-matches/ListMatches';
import ListPrediction from './ListPrediction';
import LiveMatches from './live-matches/LiveMatches';
import GoalyTV from './GoalyTV';
import Football from './Football';
import Transfer from './Transfer';
import Leagues from './Leagues';
import TopMatches from './TopMatches';
import LocalNewsDashboard from './live-matches/LocalNewsDashboard';
import icon from '../../assets/img/logo-goaly.png';
import MatchTime from './match-time/matchTime';
import axios from '../../_config/axios';
import { setUserDetails,setJWT } from '../../_helper/authentication';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerDetails: [],
            news: [],
            setFavTeam: false,
            myTeams: [],
            isLogin: false,
            msisdns:"",
        }
    }
    
    openSetFavTeam = () => {
        this.setState({ setFavTeam: true });
    }
    closeSetFavTeam = () => {
        this.setState({ setFavTeam: false });
    }
    componentDidMount() {

         console.log("Hi");
        axios.get('http://115.84.121.12:52130/api/showheader').then(res=>{
            console.log(res)
            console.log(res.data)
            this.setState({msisdns:res.data});
            this.loginmsisdn();
        }).catch(err=>{
            console.log("err")
        })

        //  post('Subscription/checkmsisdnHeexist').then(res=>{
        //      console.log(res)
        //      if(res.data.success && res.data.code && res.data.error=== 0){
        //          console.log(res.data.msisdn);
        //          this.setState({msisdns:res.data.msisdn});
        //         this.loginmsisdn();
        //      }
        //  }).catch(err=>{
        //      console.log("error")
        //  })

         //Abhay code
        const user = JSON.parse(localStorage.getItem('userDetails'));
        if (user) {
            this.setState({ isLogin: true });
        }
        post('api/getgoalybannerlist')
            .then(res => {
                if (res.data.success)
                    this.setState({ bannerDetails: res.data.banner_details })
            })
            .catch(err => console.log(err));
        if (isAuthenticate())
            // this.getMyTeams();
            this.getLatestNews();
    }
    getMyTeams = (page = 0) => {
        const payload = new FormData();
        payload.append('page', page);
        authPost('api/getfavteam', payload)
            .then(res => {
                const team = res.data.team_list;
                this.setState(prevState => ({ myTeams: [...prevState.myTeams, ...team], page }));
            })
            .catch(err => console.log(err));
    }
    getLatestNews = () => {
        const payload = new FormData();
        payload.append('limit', 4);
        post('api/getlatestnews', payload)
            .then(res => {
                if (res.data.success)
                    this.setState({ news: res.data.news });
            })
            .catch(err => console.log(err));
    }



    loginmsisdn =(e) => {
        
        console.log(this.state.msisdns)
        if(this.state.msisdns!=85620){
            let mis=this.state.msisdns
            console.log(mis.slice(3))
            let url = "Subscription/UserDetails?msisdn="+mis.slice(3)
            console.log(url);
            //console.log(this.state.msisd)
        
      // let url = "Subscription/UserDetails?msisdn="+2059431100
        axios.get(url).then(res=>{
            console.log(res)
            setUserDetails(res.data);
            //setJWT(2059431100);
            setJWT(res.data.msisdn);
               // localStorage.setItem('userDetails', JSON.stringify(res.data));
               // localStorage.setItem('response',JSON.stringify(true));
               // localStorage.setItem('status',JSON.stringify(res.data.status));
				//localStorage.setItem('msisdns',JSON.stringify(res.data.mssisdn));

        }).catch(err=>{
            console.log("error")
        })
       }

    }

    render() {
        const {

            isLogin
        } = this.state;
        window.scrollTo(0, 0)
        return (
            <Fragment>
                {/* <Helmet>
                    <title> Goaly | Home </title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <MenuCategory />
                <AddFavoriteClub />
                <MatchTime />

                {/* {!isLogin && <TopMatches />}
                {!!isLogin && <LiveMatches />}
               <div style={{paddingTop:7}}> <RewardsSlider /></div>
                <ListMatches />
                <GoalyTV />
                <Football />
                <Transfer />
                <Leagues /> */}
            </Fragment>
        );
    }
}

export default Home;