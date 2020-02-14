import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';



/* Initialize News API */
//const NewsAPI = require('newsapi');
const APIkey = '920fe1871ec5410289dba3174398da12';




function ScreenSource(props) {


  const [ sourceList, setSourceList ] = useState([]);
  const [ languageCountry, setLanguageCountry ] = useState({});


  const CheckLogin = () => {

	if ( props.userToken === '' ) {
		return <Redirect to='/'/>
	} else { return null }
}
	
	const fetchSources = async function (lang = 'fr', country='fr' ) {
		let urlRequestNews = `https://newsapi.org/v2/sources?country=${country}&language=${lang}&apiKey=${APIkey}`;
		let sources = await fetch( urlRequestNews );
		let response = await sources.json();
		if(response.status === 'ok'){
			setSourceList( response.sources )
		}
	}
	
	const saveUserLang = async function ( dataLang ) {
		console.log( 'here save UserLang ', props.tokenuser )
		let options = {
			method: 'POST',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: `lang=${dataLang.lang}&country=${dataLang.country}&token=${props.tokenuser}`
		};
		
		let srx = await fetch( '/save-language', options );
		let response = await srx.json();
		
		if(response.success){
			setLanguageCountry({ lang: dataLang.lang, country: dataLang.country })
		}
	}
	

	

  useEffect( () => {
  
  		const fetchLang = async function ( tokenStr ) {
			console.log( 'here fetch langue ', props.tokenuser )
			
			let srx = await fetch( `/get-language?token=${tokenStr}` );
			let response = await srx.json();
			
			if(response.success){
				setLanguageCountry({ lang: response.languageSettings.lang, country: response.languageSettings.country })
			}
		}
	  
  		fetchLang( props.tokenuser );
  		
	}, [props.tokenuser] );
	

  useEffect( () => {
		fetchSources( languageCountry.lang, languageCountry.country );
	}, [languageCountry] );


  return (
   <div>
   	<CheckLogin />
		<div className="Banner" style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
			
			<Avatar src={`/images/flag_FR.png`} style={{margin:'5px', cursor:'pointer'}} 
				onClick={ () => saveUserLang( { lang: 'fr', country:'fr' } ) } />
				
			<Avatar src={`/images/flag_UK.png`} style={{margin:'5px', cursor:'pointer'}} 
				onClick={ () => saveUserLang({ lang: 'en', country:'gb' }) } />
			
			<Avatar src={`https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg`} 
				style={{margin:'5px', cursor:'pointer'}} 
				onClick={ () => saveUserLang({ lang: 'es', country:'es' }) } />
				
		</div>


		<div className="HomeThemes">
			 
			<List
				itemLayout="horizontal"
				dataSource={sourceList}
				renderItem={item => (
				  <List.Item>
					 <List.Item.Meta
						avatar={<Avatar src={`/images/${item.category}.png`}/>}
						title={<Link to={`/sources/${item.id}`}>{item.name}</Link>}
						description={item.description}
					 />
				  </List.Item>
				)}
			 />

		</div>  
			 

		            
    </div>
  );
}



function mapStateToProps(state) {
  return {
    tokenuser: state.tokenuser
  }
}

export default connect(
    mapStateToProps, 
    null
)( ScreenSource );


