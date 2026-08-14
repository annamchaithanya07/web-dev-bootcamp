const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static("frontend"));
app.use(express.json());
var users = [
    {
    "id" : 1,
    "name" : "Timmothy",
    "gender" : "male",
    "image" : "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
    "id" : 2,
    "name" : "Victor",
    "gender" : "male",
    "image" : "https://randomuser.me/api/portraits/men/48.jpg",
    },
{
    "id" : 3,
    "name" : "Si",
    "gender" : "female",
    "image" : "https://randomuser.me/api/portraits/women/34.jpg",
},
{
    "id" : 4,
    "name" : "Felix",
    "gender" : "male",
    "image" : "https://randomuser.me/api/portraits/men/78.jpg",
},
{
    "id" : 5,
    "name" : "Sandra",
    "gender" : "female",
    "image" : "https://randomuser.me/api/portraits/women/45.jpg",
},
{
    "id" : 6,
    "name" : "Bojan",
    "gender" : "male",
    "image" : "https://randomuser.me/api/portraits/men/55.jpg",   
},
{
    "id" : 7,
    "name" : "Rafaele",
    "gender" : "female",
    "image" : "https://randomuser.me/api/portraits/women/8.jpg",
},
{
    "id" : 8,
    "name" : "Nathan",
    "gender" : "male",
    "image" : "https://randomuser.me/api/portraits/men/2.jpg",
},
{
    "id" : 9,
    "name" : "Lydia",
    "gender" : "female",
    "image" : "https://randomuser.me/api/portraits/women/92.jpg",
},
{
    "id" : 10,
    "name" : "Tomothy",
    "gender" : "male",
    "image" : "https://randomuser.me/api/portraits/men/29.jpg",
}

]

 var nextId=11;
function findIndex(id){
    for(var i=0; i<users.length; i++){
        if(id === users[i].id){
            return i;
        }
    }
    return -1;
}
app.get("/api/users", function(req ,res){
    return res.json(users);
})
app.get("/api/users/:id", function(req ,res){
    var id = Number(req.params.id);
    var  index = findIndex(id);
    if(index === -1){
        return res.status(404).json({"message": "User not found with id :" + id});
    }
    var user = users[index];
    return res.json(user);
})
app.get("/api/random-user", function(req ,res){
    if (users.length === 0){
        return res.status(404).json({"message": "No users available"});
    }
    var randomIndex = Math.floor(Math.random() * users.length);
    return res.json(users[randomIndex]);
})

app.post("/api/users", function(req ,res){
    var newUser = req.body;
    var tempUser = {
        "id" : nextId,
        "name" : newUser.name,
        "gender" : newUser.gender,
        "image" : newUser.image
    };
    nextId=nextId+1;
    users.push(tempUser);
    return res.status(201).json({
        "message": "User added sssuccessfully",
        "user": tempUser
    });
});



app.listen(port, function(){
    console.log("Server is running on port " + port);
})