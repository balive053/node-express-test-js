import express, { response } from 'express';


const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})

const mockUsers = [
    {"id":1, "name":'Bob'},
    {"id":2, "name":'Charlotte'},
    {"id":3, "name":'William'}
]

app.get('/api/users', (request, response) => {
    console.log(mockUsers);
    response.send(mockUsers)
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