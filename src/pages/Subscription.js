import { string } from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../_config/axios';
import { setUserDetails,setJWT } from '../_helper/authentication';
//import {withRouter} from 'react-router-dom';
class Subscription extends React.Component{
    constructor(props){
        super(props);
       // console.log(props)
       this.state= {
           checks: false,
           falmsi:false,
           otp: " ",
           msisdn: "",
           
       };
       

    }
    componentDidMount(params){
        
        localStorage.clear();
        var msisdn="";
       var f= window.location.search.substring(1);
       console.log(f)
        var url=window.location.pathname;
        for (var i=0;i<f.length;i++){
            if(f[i]== '&'){
                break;
            }
            if(f[i]== '='){
                msisdn = "";
                continue;
            }
            else{ 
                 msisdn = msisdn +f[i];
            }
        }
        this.setState({msisdn:msisdn})
        console.log(msisdn)
        
        var apiurl="/Subscription/subcribed?msisdn="+msisdn
        console.log(apiurl)
        
        const payload = new FormData();
        payload.append('msisdn',msisdn)
        //payload.append('event',event)
        axios.get(apiurl,payload).then(res=>{
            console.log(res)
            if(res.data.response=== true){
                console.log("hi")
                this.setState({checks:true})
            }
            else{
              this.setState({falmsi:true})
            }
        

                   
                   
                   
                   
                   // this.props.history.push('/')
            
        }).catch(err=>{
            console.log(error);
        })

    }
    
    handleclick(e){
    //console.log(e.target.value)
    this.setState({otp:e.target.value});
    
    }
    handlesubmit=()=>{
        //console.log("Abhay");
        //console.log(this.state.otp);
        console.log(this.state.otp);
        const payload = new FormData();
        let url = "Subscription/confirmation?msisdn="+this.state.msisdn+"&pin="+this.state.otp+"&service="
        console.log(url)
        axios.get(url).then(res=>{
            console.log(res)
        }).catch(res=>{
            console.log("Error")
        })
    }
    
    render(){
        
        return(
            <>
            {!this.state.checks && <div style={{height:"300px",width:'100%'}}>
            <center style={{marginTop:'50%'}}>{this.state.uuid}Please wait....</center>
            </div>}
            {this.state.checks  && <div>
                <div style={{height:"600px",width:'100%',padding:'20px',backgroundColor:"white", border:'1px solid black'}}>
                    <div style={{margin:'auto'}}>
                        <h1>Enter OTP</h1>
                <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder= " Enter OTP"style={{ padding:"10px"}} type ="number" onChange={(e)=>this.handleclick(e)}></input>
                <br/>
                <br/>
                <button class="form-control btn btn-red" style={{color:"white"}} onClick={this.handlesubmit}>SUBMIT </button>
                </div>
                </div>
                </div>}
                <h1>{this.state.otp}</h1>
                {this.state.falmsi && <h1>Not a valid msisdn</h1>}
             
            </>
        )
    }
}
export default withRouter(Subscription);