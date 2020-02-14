var mongoose = require('mongoose');


const URI_BDD = `mongodb+srv://adminMorningNews:UjSDuqH9xmn6nfnf@cluster0-gbe2d.mongodb.net/morningnews?retryWrites=true&w=majority`;

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true
	};
mongoose.connect( URI_BDD, 
	options, 
	function (err) { 
		if (!typeof(err)) {console.log(err);}
	});

