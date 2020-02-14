import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import articleWishlist from './reducers/article.reducer';
import tokenuser from './reducers/token.reducer'

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

import './App.css';
import Nav from './Nav';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';


const store = createStore( combineReducers( { tokenuser, articleWishlist }),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );




function App() {

  
	return (
		
	 <Provider store={store}>
	 
		<Router>
		
		
			<Switch>
				
				<Route exact path='/'>
					<ScreenHome />
				</Route>
				
				<Route path="/sources/:id" component={ScreenArticlesBySource} />
				
				<Route path='/sources' exact>
					<Nav />  
					<ScreenSource />
				</Route>
												
				<Route path='/myarticles'>
					<Nav />  
					<ScreenMyArticles />
				</Route>
				
			</Switch>
		</Router>
		
	 </Provider>	
	);
}

export default App;
