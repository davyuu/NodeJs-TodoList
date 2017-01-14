var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://test:test@ds111479.mlab.com:11479/todo');

//Create schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick ass'}];

var urlencodedParser = bodyParser.urlencoded({entended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
		//get data from mongodb and pass to view
		Todo.find({}, function(err, data){
			if (err) throw err;
	        res.render('todo', {todos: data});
		});
    });

    app.post('/todo', urlencodedParser, function(req, res){
		//get data from view and add to mongodb
		var newTodo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		})
    });

    app.delete('/todo/:item', function(req, res){
		//delete requested item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		});
    });
}
