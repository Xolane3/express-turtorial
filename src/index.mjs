import express, { response } from "express";

//call the express fanction
const app = express();

//Creating a port
const PORT = process.env.PORT || 3001;

const mockUsers = [
    {id: 1, username: "Sway", displayName: "Sway"},
    {id: 2, username: "Morning", displayName: "Morning"}
]


//allow you to listen to a specific port
app.listen(PORT, () =>{
    console.log('Running on Port ' + PORT);
});

//Get request with route
app.get("/", (req, res) =>{
    //sending a JSON Object
    res.status(201).send({name: "Xolane"});
})

app.get('/api/users', (req, res) => {
    res.send(mockUsers);
});

//Route parameters
app.get('/api/users/:id', (req, res) => {
    //params is the object that gives you all the route parameters
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    //If the user doesn't exist
    if(isNaN(parsedId)) return res.status(400).send({ msg: "Bad Request, Invalid ID"});
    //Find Users
    const findUsers = mockUsers.find((user) => user.id === parsedId);
    //If the user does exist
    if(!findUsers) return res.sendStatus(404); //use sendStatus so you won't need to call send
    //else
    return res.send(findUsers);
})