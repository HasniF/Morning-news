export default function(tokenuser = '', action) {
	
	
	if(action.type === 'addLogin') {
		
		return action.token
	}
	
	else if(action.type === 'deleteLogin') {
	
	
	} 
	
	else {
	
		return tokenuser ;
	} 
}