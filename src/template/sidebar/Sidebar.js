import React from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { setUserDetails,setJWT,isAuthenticate, getUserDetails } from '../../_helper/authentication';
import './sidebar.scss';
import Account from '../account';
import Subscribe from '../../components/subscibe';
// import leaderboard from  '../../assets/icon/icon-1.png';
// import reward from  '../../assets/icon/icon-2.png';
import AccountImg from '../../assetsStaging/img/account.svg';
import contest from '../../assetsStaging/img/sidenav/contest.png';
import reward from '../../assetsStaging/img/sidenav/reward.png';
import leaderboard from '../../assetsStaging/img/sidenav/leaderboard.png';
import winners from '../../assetsStaging/img/sidenav/winners.png';
import Language from '../../assetsStaging/img/sidenav/language.png';
import faq from '../../assetsStaging/img/sidenav/faq.png';
import logout from '../../assetsStaging/img/sidenav/logout.png';
import privacypolicy from '../../assetsStaging/img/sidenav/privacypolicy.png';
import term from '../../assetsStaging/img/sidenav/term.png';
import enter from '../../assetsStaging/img/sidenav/enter.png';

//import { useHistory } from "react-router";

//import {Modal,Button} from 'react-bootstrap';
//import { Button } from 'react-bootstrap';
import {useState} from 'react';
import axios from '../../_config/axios'
import './Sidebar.css';
import Modal from 'react-responsive-modal';


const Sidebar = ({ open, closeSideBar }) => {
	const language = { "en": "English", "id": "Indonesia", "ms": "Malaysia", "nl": "Deutch", 'km': 'Khmer' };

	const[msisdn,setmsisdn]= useState("");
	const[pin,setpin]= useState("");
	const[errmsisdn,seterrmsisdn]= useState("");
	const[otperr,setotperr]= useState("");


	const[otpopenmodal,setotpopenmodal] = useState(false);

  const [opens, setOpen] = useState(false);
  const onOpenModal = () => {setOpen(true);seterrmsisdn("");}
  const onCloseModal = () => setOpen(false);


  const otpopenmodalfun=()=>setotpopenmodal(true);
  const onCloseModalotp=()=>setotpopenmodal(false);

  

    

	const logOut = () => {
		console.log('logoutt')
		localStorage.removeItem('userDetails');
		localStorage.removeItem('JWT');
		localStorage.clear();
		// localStorage.removeItem('userDetailsforPopup');
	}
	//console.log(isAuthenticate());
	//console.log(localStorage.getItem('msisdns'));
	//let msisdns=  localStorage.getItem('msisdns');
	//console.log(msisdns)

	// function toggleButton () {
	// 	if(!panel) setPanel(true);
	// 	else setPanel(false);
	// 	seterrmsisdn("");
	// 	}


		function handleChange(e) {
			console.log(e.target.value);
			setmsisdn(e.target.value)

		  }

		  function msisdnhit(){
			seterrmsisdn("");
			setotperr("");
			  console.log(msisdn)
			  var apiurl="/Subscription/subcribed?msisdn="+msisdn;
			  console.log(apiurl)
			  const payload = new FormData();
              payload.append('msisdn',msisdn)
			  
             //console.log(apiurl,payload)
			     axios.get(apiurl).then(res=>{
				 console.log(res.data)
				 if(res.data.msg === "subscribe success"){
				 //if(res.data.response === true){
					setOpen(false);
					otpopenmodalfun();
					 
				 }
				//  if(res.data.msg=='Not LTC number'){
				// 	 setOpen(false)
				// 	//setotpopenmodal(true);
				// 	otpopenmodalfun();
				//  }
				 else{
					seterrmsisdn("Invalid MSISDN or MSISDN already Subscribed")
				 }
			 }).catch(err=>{
				 console.log("error")
			 })
		  }

          function handleotpChange(e) {
			//console.log(e.target.value);
			setpin(e.target.value)

		  }

		  function otphit(){
			setotperr("");
			console.log(pin)
			console.log(msisdn)
			const payload = new FormData();
        	let url = "Subscription/confirmation?msisdn="+msisdn+"&pin="+pin+"&service="
        	console.log(url)
        	axios.get(url).then(res=>{
            console.log(res)
            console.log("======================");
            console.log(res.data)
            console.log("-------------");
            console.log(res.data.code);
			if(res.data.msg=== "validate pin successfully"){
				setUserDetails(res.data.data);
            	setJWT(res.data.msisdn);
                //localStorage.setItem('userDetails', JSON.stringify(res.data));
                localStorage.setItem('response',JSON.stringify(res.data.data));
                localStorage.setItem('status',JSON.stringify(res.data.status));
				localStorage.setItem('msisdns',JSON.stringify(res.data.msisdn));
				window.location.href="/"
				
			}else{
				setotperr("Invalid OTP")
			}
        }).catch(res=>{
            console.log("Error")
        })
		  }




		//   function toggleButtonss(){
		// 	  setpin("");
		//   }
            
	// 	    function funsubtog(){
	// 			let unsuburl= "Subscription/unsubcrition?msisdn="+msisdns.substring(1,msisdns.length-1)
	// 			const payload = new FormData();
	// 			payload.append('msisdn',msisdns)
	// 			axios.get(unsuburl).then(res=>{

	// 				console.log(res)
	// 				if(res.data.status==="TRUE"){
	// 					localStorage.clear();
	// 					window.location.href="/"
	// 					//console.log("logour")
	// 				}
					
	// 				//setsubscr("Subscribe");
	// 			}).catch(err=>{
	// 				console.log("error")
	// 			})
				
	//    }

	   function loginunsubs(){
		   //let loginmsisdn = localStorage.getItem('msisdns').substring(1,localStorage.getItem('msisdns').length-1);
		   //console.log(loginmsisdn);
		  // let unsuburl= "Subscription/unsubcrition?msisdn="+getUserDetails().mssisdn;
		   let unsuburl= "Subscription/unsubcrition?msisdn="+getUserDetails().msisdn;
		   console.log(unsuburl)
				//const payload = new FormData();
				//payload.append('msisdn',loginmsisdns)
				axios.get(unsuburl).then(res=>{

					console.log(res)
					if(res.data.status==="TRUE"){
						localStorage.clear();
						window.location.href="/"
						
					}
					
					//setsubscr("Subscribe");
				}).catch(err=>{
					console.log("error")
				})
	   }
	   function loginsubscription(){
		setotperr("");
		   //setmsisdn(local)
		   //let loginmsisdn = localStorage.getItem('msisdns').substring(1,localStorage.getItem('msisdns').length-1);
		   setmsisdn(getUserDetails().msisdn);
		   console.log(msisdn)
			  var apiurl="/Subscription/subcribed?msisdn="+getUserDetails().msisdn;
			  console.log(apiurl)
			  const payload = new FormData();
              payload.append('msisdn',msisdn)
			  
             //console.log(apiurl,payload)
			     axios.get(apiurl).then(res=>{
				 console.log(res.data)
				 if(res.data.msg === "subscribe success"){
				 //if(res.data.response === true){
					//  setotperr("");
					// setpin(true)
					//  setPanel(false);
					setOpen(false);
					otpopenmodalfun();
					 
					 
                 }}).catch(error=>{
					 console.log(error);
				 });
		
		   

	   }
		   // let status= localStorage.getItem('status');
			//console.log(status)
			//let msisdnnnn = localStorage.getItem('msisdnnnn');
			//console.log(msisdnnnn)
	return (
		<>
			{/* <Subscribe show={show} handleClose={this.handleClose}/> */}
			{open && <div style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: 'rgba(0,0,0,0.8)',
				zIndex: 1000
			}} onClick={closeSideBar}></div>}
			<nav className={classNames("sideNav", "bgImg2", { open: open })} style={{ overflow: 'hidden' }}>
				<div className="wrapper" style={{backgroundColor:'#D1171B'}}>
					<div id="sidenavmenu" style={{ display: 'block' }}>
						<div className="sidenav" style={{
							backgroundColor: ' #D1171B',
							width: '300px',
							height: '100%',
							overflowX: 'hidden',
							paddingTop: 0,
							textAlign: 'initial',
						}}>
							<div className="sidenav-header block">
								<img src={isAuthenticate() === true ? getUserDetails().image : AccountImg } alt="" />
								{isAuthenticate() === true ?
									<div className="my-1 text-white">
										<span className="d-block">{getUserDetails().first_name}</span>
										<span className="d-block">{getUserDetails().phone_no}</span>
									</div>
									:
									<div className="my-1 text-white">
										<span className="d-block">Demo Goaly</span>
										{/* <span className="d-block">08129545XXXX</span> */}
									</div>
								}
								{isAuthenticate() && (getUserDetails().msisdn!="") && <div style={{color:'white'}}>{getUserDetails().msisdn}</div>}
								{ isAuthenticate()  &&  (getUserDetails().status=='inactive') && <div style={{color:'white'}}>{getUserDetails().status}</div>}
								{ isAuthenticate()  &&  (getUserDetails().status=='active') && <div style={{color:'white'}}>{getUserDetails().status}</div>}
								{ isAuthenticate()  &&  (getUserDetails().status=='inactive') && <button className="btn btn-pill btn-blue w-75 mt-1" onClick={loginsubscription} ><b>Subscribe</b></button>}
								{ isAuthenticate()  &&  (getUserDetails().status=='active') && <button className="btn btn-pill btn-blue w-75 mt-1" onClick={loginunsubs} ><b>UnSubscribe</b></button>}
								{!isAuthenticate() && <button className="btn btn-pill btn-blue w-75 mt-1" onClick={onOpenModal} ><b>Subscibe</b></button>}
								{/* <button className="btn btn-pill btn-blue w-75 mt-1" onClick={onOpenModal} ><b>Subscibe</b></button> */}
							</div>
							
							  <div>
                             
							  <Modal open={opens} onClose={onCloseModal} center>
                              <h2 style={{textAlign:'center',color:'black'}}>Enter Msisdn</h2>
							  <div style={{textAlign:'center'}}>
                              <input  style={{border:'2px solid black',borderRadius:29,fontSize:14,fontWeight:900,textAlign:'center'}} type='text'  onChange={handleChange}/><br/><br/>
							  </div>
							  {errmsisdn && <p style={{color:'red'}}>{errmsisdn}</p>}
							  <button style={{width:'100%',backgroundColor:'red',borderRadius:10}} onClick={msisdnhit}>Submit</button><br/><br/>
							  <button style={{width:'100%',backgroundColor:'rebeccapurple',borderRadius:10}} onClick={onCloseModal}>Close</button>
                              </Modal>
                              </div>

							  <div>
                             
							  <Modal open={otpopenmodal} onClose={onCloseModalotp} center>
                              <h2 style={{textAlign:'center',color:'black'}}>Enter OTP</h2>
							  <div style={{textAlign:'center'}}>
                              <input  style={{border:'2px solid black',borderRadius:29,fontSize:14,fontWeight:900,textAlign:'center'}} type='text'  onChange={handleotpChange}/><br/><br/>
							  </div>
							  {otperr && <p style={{textAlign:'center',color:'red'}}>{otperr}</p>}
							  <button style={{width:'100%',backgroundColor:'red',borderRadius:10}} onClick={otphit}>Submit</button><br/><br/>
							  <button style={{width:'100%',backgroundColor:'rebeccapurple',borderRadius:10}} onClick={onCloseModalotp}>Close</button>
                              </Modal>
                              </div>
							   
          
							
							<ul className="my-2">

								{!isAuthenticate() ?
									<li><NavLink to="/login" onClick={closeSideBar}><img src={enter} alt="" />Login</NavLink></li>
									:
									''
								}
								<li><NavLink to="/contest" onClick={closeSideBar}><img src={contest} alt="" /> Contest</NavLink></li>

								{/* <li><NavLink to="/reward" onClick={closeSideBar}><img src={reward} alt="" /> Rewards</NavLink></li> */}
								<li><NavLink to="/leaderboard" onClick={closeSideBar}><img src={leaderboard} alt="" /> Leaderboard</NavLink></li>
								<li><NavLink to="/winner" onClick={closeSideBar}><img src={winners} alt="" />Winners</NavLink></li>
								<li><NavLink to="/language" onClick={closeSideBar}><img src={Language} alt="" /> Language <span id="language">{language[selectedLanguage()]}</span></NavLink></li>
								<li><NavLink to="/faq" onClick={closeSideBar}><img src={faq} alt="" /> FAQ</NavLink></li>
								<li><NavLink to="/privacy" onClick={closeSideBar}><img src={privacypolicy} alt="" />Privacy policy</NavLink></li>
								<li><NavLink to="/service" onClick={closeSideBar}><img src={term} alt="" />Terms of Service</NavLink></li>
								{isAuthenticate() ?
									<li><NavLink to="" onClick={logOut}><img src={logout} alt="" /> Logout</NavLink></li>
									:
									''
								}
								{/* <li><NavLink to="/login" onClick={closeSideBar}>New Login</NavLink></li> */}

							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Sidebar;

const selectedLanguage = () => {
	var name = 'googtrans';
	var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2].split('/')[2];
	return 'en';
}

{/* <div className="notop bg-main">
				<Link to='/profile' onClick={closeSideBar}><Account /></Link>
					<div className="list-block mt-15">
						<div className="list-group">
							<nav>
								<div className="list-block">
									<ul>
										<li className="divider" style={{ marginBottom: '6px' }}>Menu</li>
										<li>
											{isAuthenticate() ?
												<NavLink exact to='/' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
													<div className="item-media"><i className="fa fa-home"></i></div>
													<div className="item-inner">
														<div className="item-title">Home</div>
													</div>
												</NavLink>
												:
												<NavLink to='/login' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
													<div className="item-media"><i className="fa fa-sign-in"></i></div>
													<div className="item-inner">
														<div className="item-title">Login </div>
													</div>
												</NavLink>
											}
										</li>
										<li>
											<NavLink to="/contest" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-bookmark"></i></div>
												<div className="item-inner">
													<div className="item-title">Contest</div>
												</div>
											</NavLink>
										</li>
										<li>
											<NavLink to="/reward" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media">
													<img src={reward} style={{height:15}}/>

													</div>
												<div className="item-inner">
													<div className="item-title">Rewards </div>
												</div>
											</NavLink>
										</li>
										<li>
											<NavLink to="/leaderboard" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media">
													<img src={leaderboard} style={{height:15}}/>
													</div>
												<div className="item-inner">
													<div className="item-title">Leaderboard</div>
												</div>
											</NavLink>
										</li>

										<li>
											<NavLink to="/winner" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-trophy"></i></div>
												<div className="item-inner">
													<div className="item-title">Winners</div>
												</div>
											</NavLink>
										</li>

										<li>
											<NavLink to="/language" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media">
													<i className="fa fa-globe"></i>
												</div>
												<div className="item-inner">
													<div className="item-title">Language</div>
													<div className="item-after">{language[selectedLanguage()]}</div>
												</div>
											</NavLink>
										</li>
										<li>
											{isAuthenticate() &&
												<Link to='/logout' className="item-link close-panel item-content" onClick={closeSideBar}>
													<div className="item-media"><i className="fa fa-sign-out"></i></div>
													<div className="item-inner">
														<div className="item-title">Logout</div>
													</div>
												</Link>}
										</li>
										<li className="divider" style={{
											marginTop: '10px',
											marginBottom: '10px'
										}}></li>
										<li>
											<NavLink to="/faq" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-question-circle"></i></div>
												<div className="item-inner">
													<div className="item-title">FAQ</div>
												</div>
											</NavLink>
										</li>
										<li>
											<NavLink to="/privacy" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-question-circle"></i></div>
												<div className="item-inner">
													<div className="item-title">Privacy Policy</div>
												</div>
											</NavLink>
										</li>
										<li>
											<NavLink to="/service" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
												<div className="item-media"><i className="fa fa-question-circle"></i></div>
												<div className="item-inner">
													<div className="item-title">Terms of Service</div>
												</div>
											</NavLink>
										</li>
										<li className="divider" style={{
											marginTop: '10px',
											marginBottom: '10px'
										}}></li>
										<li>
											<a className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={() => true}>
												<div className="item-media"><i className="fa fa-question-circle"></i></div>
												<div className="item-inner">
													<div className="item-title">Subscribe</div>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</nav>
						</div>
					</div>
				</div> */}


