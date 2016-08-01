var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//Connect to db
mongoose.connect("mongodb://test:test@ds139685.mlab.com:39685/todolistashwin")
//Create a schema
var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)

/*var item1 =  Todo({item : 'Buy a computer'}).save(function(err){
  if(err) throw err
  console.log('item saved')
})*/

//var data = [{item: 'get milk'}, {item: 'deposit cash'}, {item: 'code'}]
var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function(app){
  app.get('/todo', function(request, response){
    Todo.find({}, function(err,data){
      if(err) throw err
      response.render('todo', {todos : data})
    })

  })

  app.post('/todo', urlencodedParser, function(request, response){
      var newTodo = Todo(request.body).save(function(err, data){
        if(err) throw err
        response.json(data)
      })

      /*data.push(request.body)
      console.log(request.body)
      response.json(data)
      console.log(data)*/
  })

  app.delete('/todo/:item', function(request, response){
    Todo.find({item : request.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err
      response.json(data)
    })
    /*data = data.filter(function(todo){
      console.log(todo.item)
      return todo.item.replace(/ /g, '-') !== request.params.item
    })
    console.log(data)
    response.json(data)*/
  })
}
