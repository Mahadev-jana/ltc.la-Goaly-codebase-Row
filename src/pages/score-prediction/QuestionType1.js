import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isAuthenticate } from '../../_helper/authentication';
import { dateTimeFomat } from '../../_helper/date-format';
import StaticImg from '../../assetsStaging/img/stadium.png';
import Moment from 'react-moment';
import './QuestionType1.css';

const winPoints = {
	textAlign: 'right',
	float: 'right',
	fontSize: '16px',
};


class QuestionType1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score1: '',
			score2: ''
		}
	}
	onHandleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	}
	onSubmit = (questionNo, homeLogo, awayLogo) => {
		const { score1, score2 } = this.state;
		if (isAuthenticate()) {
			if (score1.trim() === '' || score2.trim() === '') {
				Swal.fire({
					type: 'warning',
					title: 'All field are required!'
				});
			} else {
				this.props.changeQusetion(questionNo, `${score1} : ${score2}`, homeLogo, awayLogo);
			}
		} else {
			Swal.fire({
				title: 'Please login first to submit your prediction!!',
				type: 'warning',
				confirmButtonText: 'Login'
			}).then((result) => {
				if (result.value) {
					this.props.history.push('/login');
				}
			});
		}
	}

	render() {
		var dynamicDivStyle = {
			background: 'url(' + this.props.venueImg + ')',
			padding: '1em',
			marginBottom: '1em',
			textAlign: 'center',
			backgroundSize: ' 100% 100%, cover',
			backgroundPosition: '0 0',
		}
		var staticDivStyle = {
			background: 'url(' + StaticImg + ')',
			padding: '1em',
			marginBottom: '1em',
			textAlign: 'center',
			backgroundSize: ' 100% 100%, cover',
			backgroundPosition: '0 0'
		}
		const { questionNo, homeTeam, awayTeam, banner, question, startDate, changeQusetion, venue } = this.props;
		return (
			<Fragment>
				<div className="contest" style={(this.props.venueImg=="" || this.props.venueImg==null) ? staticDivStyle : dynamicDivStyle}>
					<div className="d-flex j-center">
						<div className="club-left mx-1 text-center">
							<div className="logo" style={{width: '75px',height: '75px'}}><img style={{width:'60px',height:'60px'}} src={homeTeam.logo} alt="" /></div>
							<h5 className="mb-0">{homeTeam.name}</h5>
						</div>
						<div className="mid mx-2 d-flex ais-center">
							<div className="h-max-c">
								<div className="date p-1"><Moment format="dddd, DD/MM/YYYY">{startDate}</Moment></div>
								<div className="place p-1">{venue}</div>
							</div>
						</div>
						<div className="club-right mx-1 text-center">
							<div className="logo"  style={{width: '75px',height: '75px'}}><img style={{width:'60px',height:'60px'}} src={awayTeam.logo} alt="" /></div>
							<h5 className="mb-0">{awayTeam.name}</h5>
						</div>
					</div>
					<div className="d-inline-block text-white total-point mt-2">Total Poin Win: <strong>{question.reward}</strong></div>
				</div>
				<div className="p-2 text-center" style={{ backgroundColor: '#FA2427' }}>
					<h5 className="text-white my-1 font-weight-normal">{question.text}</h5>
				</div>

				<div className="prediction-wrapper bg-white mb-1">
					<div className="d-flex j-center ais-center mb-1">
						<div className="left mx-2 text-center">
							<div className="prediction-box">
								<input
									type="number"
									className="ct-input-scr"
									style={{ width: '30%' }}
									onChange={this.onHandleChange('score1')}
								/>
							</div>
							<div className="d-inline-block mt-1" style={{ display: 'grid', justifyItems: 'center'}}>
								<span className="mr-1" style={{ fontSize: '12px' }}>{homeTeam.name}</span>
								<img width="25" src={homeTeam.logo} alt="" />
							</div>
							
						</div>
						<div className="mx-2" style={{ marginTop: '-30px' }}>
							VS
						</div>
						<div className="right mx-2 text-center">
							<div className="prediction-box">
								<input
									type="number"
									className="ct-input-scr"
									style={{ width: '30%' }}
									onChange={this.onHandleChange('score2')}
								/>
							</div>
							<div className="d-inline-block mt-1" style={{ display: 'grid', justifyItems: 'center'}}>
								<span className="mr-1" style={{ fontSize: '12px' }}>{awayTeam.name}</span>
								<img width="25" src={awayTeam.logo} alt="" />
							</div>
							
						</div>
					</div>
					<button
						type="button"
						className="btn p-2 w-100 my-2 text-white shadow"
						style={{ fontSize: '12pt',background:'#2B229A' }}
						onClick={() => this.onSubmit(questionNo, homeTeam.logo, awayTeam.logo)}
					><strong>Submit Answer {questionNo}</strong>
					</button>
				</div>
			</Fragment>
		);
	}
};

export default withRouter(QuestionType1);

{/* <div className="col-xs-12 lm ct">
				<h2 className="text-left" style={{ color: 'black' }}><p style={winPoints}>Points Win:-{question.reward}</p></h2>
				<div className="hr"></div>
				<div style={{
					position: 'relative'
				}}>
					<div style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 'auto',
						width: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<img src={homeTeam.logo} alt="" style={{ height: '60%' }} onClick={() => this.props.history.push(`/my-team/${homeTeam.id}`)} />
					</div>
					<div style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 'auto',
						right: 0,
						width: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<img src={awayTeam.logo} alt="" style={{ height: '60%' }} onClick={() => this.props.history.push(`/my-team/${awayTeam.id}`)} />
					</div>
					<div style={{
						position: 'absolute',
						color: '#fff',
						top: '5px',
						right: '5px',
						background: 'rgba(0, 0, 0, 0.5)',
						padding: '5px 10px',
						border: '1px solid #fff',
						borderRadius: '3px',
						fontSize: '11px'
					}}><Moment format="ddd, DD/MM">{startDate}</Moment></div>
					<img src={banner} style={{
						height: '200px',
						width: '100%',
						objectFit: 'cover',
						objectPosition: 'center'
					}} />
				</div>
				<h2 className="ct-title" style={{ color: 'black', margin: 10 }}><strong>{questionNo}. </strong> {question.text}</h2>
				<div className="hr"></div>
				<div className="col-xs-6 scrL">
					<img src={homeTeam.logo} alt="" onClick={() => this.props.history.push(`/my-team/${homeTeam.id}`)} />
					<input
						type="number"
						className="ct-input-scr"
						onChange={this.onHandleChange('score1')}
						// autoFocus
					/>
					<span>&nbsp;</span>
					<br />
					<h4 className="tl">{homeTeam.name}</h4>
					<p className="marcatori-partita">&nbsp; </p>
				</div>
				<div className="col-xs-6 scrR">
					<span>&nbsp;</span>
					<input
						type="number"
						className="ct-input-scr"
						onChange={this.onHandleChange('score2')}
					/>
					<img src={awayTeam.logo} alt="" onClick={() => this.props.history.push(`/my-team/${awayTeam.id}`)} />
					<br />
					<h4 className="tl">{awayTeam.name}</h4>
					<p className="marcatori-partita">&nbsp; </p>
				</div>
				<div className="clearfix"></div>
				<div className="col-xs-12" style={{ textAlign: 'center' }}>
					<button
						type="button"
						className="btn btn-primary btn-ct black"
						onClick={() => this.onSubmit(questionNo,homeTeam.logo,awayTeam.logo)}
					>Submit Answer {questionNo}</button>
				</div>
			</div> */}


