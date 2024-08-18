import express, { response } from 'express';


const app = express();
const PORT = process.env.PORT || 3000;

// middle ware to parse input
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})

const mockUsers = [
    {"id":1, "username":'Bob'},
    {"id":2, "username":'Charlotte'},
    {"id":3, "username":'William'},
    {"id":4, "username":'Jack'},
    {"id":5, "username":'Elise'}
]

app.get('/api/users', (request, response) => {
    console.log(mockUsers);
    console.log(request.query);

    // takes the key words 'filter' and 'value' from input query
    const {
        query: {filter, value},
    } = request;
    console.log(request.query);

    if (!filter && !value)
        return response.send(mockUsers);
    else if (filter && value) {
        const filteredReturn = mockUsers.filter((user) => user[filter].toLowerCase().includes(value.toLowerCase()));
        return response.send(filteredReturn);
    }
    else return response.send("To return specific result, parameters 'filter' and 'value' must be passed")

})

//get route params as input
app.get('/api/users/:id', (request, responce) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id) 
    if (isNaN(parsedId))
        return responce.status(400).send("Bad request. Invalid user ID.")
    
    const userResponse = mockUsers.find((user) => user.id === parsedId)
    // if user doesn't exist
    if (!userResponse)
        return responce.sendStatus(404)
    else
        return responce.send(userResponse)
})

app.post('/api/users', (request, responce) => {
    console.log(request.body);
    //return responce.send(200);
    const newUser = {"id":900, "username":'TJ'}
    mockUsers.push(newUser)
    return responce.status(201).send(mockUsers)
})