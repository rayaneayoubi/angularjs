let express= require('express');
let fs= require('fs');
let bodyParser = require('body-parser');

let app= express();
app.listen(8080);
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



function generateId(todos){
    var d = todos[0].id;
   for(var i=1 ; i < todos.length ;i++){
       if( todos[i].id > d){
         d = todos[i].id ;
       }
    
      }
   return (d+1);
};

app.get('/todo/:id',function (request,response){
    
    //recuperer la liste des todo ds le fichier
    //selectionner le todo dont l'id est id 
    //s'il n'existe pas  on status 404 si oui on renvoie 200 + todo
        fs.readFile('todo.json','utf8',function(err,data){
            try{ 
                var todos = JSON.parse(data);
                // console.log("todo:" + request.params.id)
              for(var i=0 ; i<todos.length; i++){
                    // console.log("todo2:" + todos[i].id)
                    if(todos[i].id.toString() == request.params.id.toString()){
                        // console.log("todo3:" + todos[i])  
                        response.status(200).send(todos[i]);
                    }
                }
                response.status(404); 
            }
            catch(e){
                console.error("Parsing error:", e); 
           
            };
        });
    })
.get('/todo',function (request,response) {
    //recuperer la liste des todo ds le fichier
    //renvoyer la liste des todo ds la reponse
    fs.readFile('todo.json','utf8',function(err,data){
       try{ 
           var todos = JSON.parse(data);
           response.status(200).send(todos);
        }
       catch(e){
        console.error("Parsing error:", e); 
       }
        
    });

app.post('/todo', function(request, response) {
    // console.log("test");
    // response.status(200).send("test");*
    try {
        var todos = JSON.parse(fs.readFileSync('todo.json','utf8'));
         console.log("to" +JSON.stringify(todos));
         console.log("body" + JSON.stringify(request.body));
         var todo = {};
         todo.id = generateId(todos);
         todo.label = request.body.label;
         todo.cat = request.body.cat;
         todo.check = request.body.check;
         console.log("tod:" + todo);
         todos.push(todo);

         fs.writeFile('todo.json',JSON.stringify(todos));
         response.status(201).send(todo);

       }
    catch(e){
        console.error("Parsing error:", e); 
       }
    
});

app.delete('/todo/:id',function(request,response){
//chercher le tabl ds le fichier
//on parcours le tableau jusqu'a l'ele correspondant a l'id
// on suprime l'ele du tabl 
//on recrie le tabl 
//code si oui 200 si non 500 et 404 si on trouve pas l'ele
try{
    var todos = JSON.parse(fs.readFileSync('todo.json','utf8'));
    console.log(todos);
    for(var i=0 ; i < todos.length ; i++){
        console.log("idd:" + todos[i].id);
        console.log("idf:"+ JSON.stringify(request.params.id));
        if(todos[i].id == request.params.id){
            todos.splice(i,1);
            response.status(200).send();
        }
     }
    fs.writeFile('todo.json',JSON.stringify(todos));
    response.status(404);   
}catch(e){
    console.error("Parsing error:", e); 
    response.status(500);
}
});
app.put('/todo/:id',function(request,response){
    try{
        var todos = JSON.parse(fs.readFileSync('todo.json','utf8'));
        console.log(todos);
        var todo= {};
        for(var i=0 ; i< todos.length ; i++){
            if( todos[i].id == request.params.id){
                
                todo.label = request.body.label;
                todo.cat = request.body.cat;
                todo.check = request.body.check;
                console.log("tod:" + todo);
                todos.change(todo);
                 response.status(200).send(todos);
            }
        }
        fs.writeFile('todo.json',JSON.stringify(todos));
        response.status(404);  
    }
    catch(e){
        console.error("Parsing error:", e); 
        response.status(500);  
    }
});
});
