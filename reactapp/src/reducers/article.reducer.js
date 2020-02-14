export default function(articleList = [], action) {
	
	if(action.type === 'addArticle') {
		
		let found = articleList.find(element => element.id === action.article.id);
		if ( found ) {
			return articleList ;
		} else {
			return [...articleList, action.article ] ;
		}
	}
	
	else if(action.type === 'deleteArticle') {
	
		let articleObj = [...articleList];
		let found = articleObj.findIndex( element => element.id === action.articleId );
		articleObj.splice(found,1);

		return articleObj ;
	}else if(action.type === "resetwishlist"){
		var wishlist = action.wishLish;
		return wishlist;
	}
	else {
		return articleList ;
	} 
}
