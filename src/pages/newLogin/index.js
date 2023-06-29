import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";
import axios from '../../_config/axios';
import { setUserDetails,setJWT } from '../../_helper/authentication';
import GoalyWhiteLogo from '../../assetsStaging/img/goaly_logo_white.png';
import './index.css';
import {Modal,Button} from 'react-bootstrap';

const Login = (props) => {
    const [phoneNo,setPhoneNo] = useState('');
    //const [password,setPassword] = useState('');
    const [errPh,setErrPh]= useState(false);
    //const [errPass,setErrPass]= useState(false);

    const [loading, setLoading] = useState(false);
    const [pinotp,setpinotp]=useState(false);
    const[otps,setotps]=useState('');
    const[otpserr,setotpserr]=useState('');
    const[loginerr,setloginerr]=useState('')
    


    const handleChangePhone = prop => event =>{
        if(prop=='phone'){
            setPhoneNo(event.target.value);
            setErrPh(false);
        }

    }
    // const handleChangePassword = prop => event =>{
    //     if(prop=='password'){
    //         setPassword(event.target.value);
    //         setErrPass(false);
    //     }

    // }
    // const loginWithPhonePassword = (e) =>{
    //     if(phoneNo==''){
    //         setErrPh(true);
    //     }
    //     if(password==''){
    //         setErrPass(true);
    //     }
    //     else{
    //     setLoading(true);
    //     const payload = new FormData();
    //     payload.append('phone_no', phoneNo);
    //     payload.append('password', password);
    //     axios.post('StageGoalyApi/login', payload)
    //         .then(res => {
    //             setLoading(false);
    //             // console.log(res.data);
    //             if (res.data.success == 0 && res.data.error == 1 && res.data.status==400) {
    //                 // setErrPhPass(true)
    //                 Swal.fire({
    //                     title: 'Invalid Phone number or Password',
    //                     text: "Try again!!!",
    //                     type: 'error',
    //                     // showCancelButton: true,
    //                     confirmButtonColor: 'red',
    //                     // cancelButtonColor: '#d33',
    //                     confirmButtonText: 'Okay',
    //                     // cancelButtonText: 'try again'
    //                 }).then((result) => {
    //                     if (result.value) {
    //                         setPhoneNo('');
    //                         setPassword('');

    //                     }
    //                 })
    //             }
    //             if (res.data.success == 1 && res.data.error == 0 && res.data.status==200) {
    //                 setUserDetails(res.data.data.user_details);
    //                 setJWT(res.data.data.JWT);
    //                 props.history.push('/')
    //             }
    //         })
    //     }
        
    // }

       function loginWithMsisdn(){
           console.log("hi")
           console.log(phoneNo)
           let phon= "Subscription/login?msisdn="+phoneNo
           axios.get(phon).then(res=>{
               console.log(res)
               if(res.data.status==='active'){
                   //setpinotp(true);
                   console.log('hi')
                setUserDetails(res.data);
                setJWT(res.data.JWT);
                window.location.href="/"

               }else{

                 setloginerr(res.data.msg)

               }
           }).catch(err=>{
            setErrPh(false);
               console.log("error")
               
           })

       }


       function handleotpChange(e) {
        //console.log(e.target.value);
        setotps(e.target.value)

      }

        function handleSubmit(){
            console.log(phoneNo,otps)
            let otpurl= "Subscription/OtpConfirm?msisdn="+phoneNo+"&otp="+otps
            console.log(otpurl)
            axios.get(otpurl).then(res=>{
                console.log(res)
                if(res.data.response=== "false"){
                    setotpserr("Invalid Otp")
                   console.log("hi")
                }else{
                    setUserDetails(res.data);
				setJWT(phoneNo);
                //localStorage.setItem('userDetails', JSON.stringify(res.data));
                localStorage.setItem('response',JSON.stringify(res.data.response));
                localStorage.setItem('status',JSON.stringify(res.data.status));
				localStorage.setItem('msisdns',JSON.stringify(res.data.mssisdn));
				//localStorage.setItem('msisdnnnn',JSON.stringify(phoneNo));
				window.location.href="/"
                }
            }).catch(error=>{
                console.log("error")
            })
        }

        function cancelotp(){
            setpinotp(false);
            setotpserr('');
        }

    // console.log(phoneNo)
    // console.log(password)
    // console.log(user_details)
    return (
        <div className="login-wrapper row" style={{background:'#D1171B'}}>
            <div className="container">
                <div className="login-logo text-center" style={{ marginTop: '40px', marginBottom: '30px' }}>
                    <img src={GoalyWhiteLogo} alt="Logo" />
                </div>
                <div className="login-card">
                    <div style={{ marginBottom: '24px' }}>
                        {/* <h3 className="mt-0" style={{ fontWeight: 'bold' }}>Login</h3> */}
                        <p className="mb-0" style={{ opacity: 0.8 }}>Enter Msisdn</p>
                    </div>
                    {/* <form> */}
                        <input type="number" className="form-control mb-2 login-box-shadow"
                        value={phoneNo}
                         placeholder="Msisdn" onChange={handleChangePhone('phone')} />
                         {errPh && <div style={{color:'red'}}>Msisdn is required</div> }
                         {loginerr && <p style={{textAlign:'center',fontWeight:500,color:'red'}}>{loginerr}</p>}
                        {/* <input type="password" className="form-control mb-2 login-box-shadow"
                        value={password}
                         placeholder="Password" onChange={handleChangePassword('password')} />
                         {errPass && <div style={{color:'red'}}>Password is required</div> }
                        <p className="text-right" onClick={()=>props.history.push('/forget-password')}><a className="text-blue">Forgot Password</a></p> */}
                        {loading && <Loader
                            type="Puff"
                            color="#ac4cb7"
                            height={50}
                            width={50}
                            style={{textAlignLast:'center'}}
                            // timeout={3000} //3 secs
                        />}
                        <button className="btn btn-block bg-blue btn-success login-box-shadow mb-2"
                         style={{ fontWeight: 'bold' }}
                         onClick={loginWithMsisdn}>Login</button>
                        {/* <p className="text-center mb-0">Don't have an account? <Link to='/new-register-msisdn' className="text-blue">Create one</Link></p> */}
                    {/* </form> */}


                    {pinotp && <div> <div /*className="static-modal"*/>
                                  <Modal.Dialog style={{top:184,width:'111%',position :'fixed',marginLeft:'-25px'}} > 
                                     <Modal.Header style={{backgroundColor:'white'}}>
                                <Modal.Title style={{textAlign:'center',height:53}}>Enter OTP</Modal.Title>
                                  </Modal.Header>
                                     
                                     <Modal.Body style={{backgroundColor:'white',textAlign:'center'}}><input type="text" style={{textAlign:'center',border:'1px solid black',height:30,borderRadius:12}} onChange={handleotpChange} />
									 {otpserr && <p style={{textAlign:'center',fontWeight:500,color:'red'}}>{otpserr}</p>}
									 </Modal.Body>

                                            <Modal.Footer style={{marginRight:15}}>
                                          <Button onClick={cancelotp}>Cancel</Button>
                                        <Button bsStyle="red" onClick={handleSubmit}>Submit</Button>
                                                 </Modal.Footer>
                                              </Modal.Dialog>
                                               </div></div>}
                   
                </div>
            </div>
        </div>

    )
}
export default withRouter(Login);