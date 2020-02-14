export default function(tokenuser = null, action) {
	
	console.log('action ', action.token)
	
	if( action.type === 'addLogin' ) {
		
		return action.token
	}
//	else if( action.type === 'deleteLogin' ) {
//	
//		return null
//	} 
	else {
	
		return tokenuser ;
	} 
}
