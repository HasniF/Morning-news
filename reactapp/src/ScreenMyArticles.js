import React, { useState, useEffect } from 'react';
import { Card, Icon, Modal, Button } from 'antd';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import './App.css';


const { Meta } = Card;


function ScreenMyArticles( props ) {
	
	const [ visible, setVisible ] = useState(false);
	const [ articleModal, setArticleModal ] = useState({});

	const showModal = (newsToShow) => {
		setVisible(true);
		setArticleModal(newsToShow);
	}

	const handleOk = e => {
		//console.log(e);
		setVisible( false );
  };

	const NoArticles = () => {
		if ( props.myArticles.length === 0 ) { 
			return( <h1> Vous n'avez pas d'articles sélectionnés </h1> ); 
		}  
		else { return null ;}
	}

	const CheckLogin = () => {
		console.log( 'token ', props.userToken )
	
		if ( props.userToken === '' ) {
			return <Redirect to='/'/>

		} else { return null }
	}

useEffect( ()=>{
	const a = async function (){
		var back = await fetch(`/article?token=${props.userToken}`)
		var response = await back.json(); 
		console.log("Ma reponse",response);
		props.resetwishlist(response.wishlist);
	}
	a();
},[props.userToken]);

  return (
	 <div>
		<CheckLogin />
		<div className="Banner"/>

		<div className="Card">
			<NoArticles />
			{ props.myArticles.map( ( article, i ) => {
			 return(
				
				<div key={i} style={{display:'flex',justifyContent:'center'}}>
					<Card
						style={{  
						  width: 300, 
						  margin:'15px', 
						  display:'flex',
						  flexDirection: 'column',
						  justifyContent:'space-between' }}
						cover={
							<img
								 alt="example"
								 src={article.image}
							/>
						}
						actions={[
							<Icon type="read" key="ellipsis2" 
								onClick={ () => showModal( 
					       		{titre: article.titre, contenu: article.contenu } 
					       	) } 
					       />,
							<Icon type="delete" key="ellipsis" onClick={ () => props.deleteFromWishList( article.id ) }/>	
						]}
					>
					  
						<Meta
						  title={article.titre}
						  description={article.description}
						/>

					</Card>
					
					<Modal
						title={articleModal.source}
						visible={visible}
						onOk={handleOk}
          			onCancel={handleOk}
						footer={[
							<Button key="okButton" type="primary" onClick={handleOk}>
								Ok
							</Button>,
						]}
					 >
						<Meta 
						  title={articleModal.titre}
						  description={articleModal.contenu}
						/>
						
					</Modal>
					
					

				</div>
			 ) }
			)}

		</div>
		
	</div>
  );
}



function mapStateToProps(state) {
  return {
    myArticles: state.articleWishlist,
    userToken: state.tokenuser
  }
}


function mapDispatchToProps(dispatch) {
  return {
    deleteFromWishList: function(i) { 
       dispatch( { type: 'deleteArticle', articleId: i } )
    },
    resetwishlist: function(tabArticle){
		dispatch({type: "resetwishlist", wishLish : tabArticle })
	}
  }
}
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)( ScreenMyArticles );



