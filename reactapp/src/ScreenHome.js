import React, { useState } from 'react';
import {  Redirect } from 'react-router-dom';
import { Input, Button } from 'antd';
import {connect} from 'react-redux';

import './App.css';


function ScreenHome(props) {

  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  
  const [signinEmail, setsigninEmail] = useState('');
  const [signinPassword, setsigninPassword] = useState('');
  
  
  const [signupName, setsignupName] = useState('');
  const [signupEmail, setsignupEmail] = useState('');
  const [signupPassword, setsignupPassword] = useState('');
  
  
  
  
  	const handleSignIn = async () => {
		let url = '/sign-in';
		let options = {  
			method: 'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: `email=${signinEmail}&password=${signinPassword}` };

		let sources = await fetch( url, options );
		let response = await sources.json();
		
		if ( response.success ) {
			props.login( response.userToken );
		} else {
			setError( response.error )
		}
		console.log('signin ', response.userToken )
		
		setIsLogin( response.success );
  	}

  
  
  
  	const handleSignUp = async () => {
		let url = '/sign-up';
		let options = {  
			method: 'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: `name=${signupName}&email=${signupEmail}&password=${signupPassword}` };

		let sources = await fetch( url, options );
		let response = await sources.json();
		console.log('signup response ',response)
		
		if ( response.success ) {
			console.log('signup response ', response.userToken)
			props.login( response.userToken );	
		} else {
			setError( response.error )
		}
		
		setIsLogin( response.success );
  	}
  	
	
	
	if ( isLogin ) { 
		console.log('islogin condition ', isLogin, props.token )
	 	return( <Redirect to="/sources" /> )  
	}
	
  
  
  	const ShowError = () => {
		if ( error ) { 
			return( <h1>{error} </h1> ); 
		}  
		else { return null ;}
	}

  
  
  return (
  	<div className="back-image-loginpage">
  	
		<ShowError />
		
		<div className="Login-page">

			{/* SIGN-IN */}

			<div className="Sign">
					
				<Input id="signinEmail" className="Login-input" placeholder="arthur@lacapsule.com" 
					onChange={(e) => setsigninEmail(e.target.value)} required />

				<Input.Password id="signinPassword" className="Login-input" placeholder="password"
					onChange={(e) => setsigninPassword(e.target.value)} required />


				<Button onClick={()=>handleSignIn()} style={{width:'80px'}} type="primary">Sign-in</Button>

			</div>

			{/* SIGN-UP */}

			<div className="Sign">
						
				<Input id="signupName" className="Login-input" placeholder="Arthur G" 
					onChange={(e) => setsignupName(e.target.value)} required />
					
				<Input id="signupEmail" className="Login-input" placeholder="arthur@lacapsule.com" 
					onChange={(e) => setsignupEmail(e.target.value)} required />

				<Input.Password id="signupPassword" className="Login-input" placeholder="password"
					onChange={(e) => setsignupPassword(e.target.value)} required />

				<Button onClick={()=>handleSignUp()} style={{width:'80px'}} type="primary">Sign-up</Button>

			</div>

		</div>
	</div>
  );
}




function mapStateToProps(state) {
  return {
    token: state.tokenuser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: function(str) { 
       dispatch( { type: 'addLogin', token: str } )
    }
  }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)( ScreenHome );



