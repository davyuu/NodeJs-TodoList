var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static('./public'))

//set up template engine
app.set('view engine', 'ejs');

//fire controllers
todoController(app);

//listen to port
app.listen(app.get('port'), function(){
	console.log('Listening to port', app.get('port'));
})
