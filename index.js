import cors from "cors"
const express = require('express')
const port = 3001


const app = express()
const uuid = require('uuid')
app.use(express.json())
app.use (cors())

const users = []


const checkUserId = (request, response, next) => {
    const { id } = request.params


    const index = users.findIndex(user => user.id === id)


    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }


    request.userIndex = index
    request.userId = id


    next()
}


app.get('/users', (request, response) => { // buscando informações back-end


    return response.json(users)
})


app.post('/users', (request, response) => { // criando informações back-end


    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }


    users.push(user)


    return response.status(201).json(user)
})


app.put('/users/:id', checkUserId, (request, response) => { // atualização informação back-end


    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId


    const updateUser = { id, name, age }


    users[index] = updateUser


    return response.json(updateUser)


})


app.delete('/users/:id', checkUserId, (request, response) => { // deletando informações back-end
    const index = request.userIndex


    users.splice(index, 1)


    return response.status(204).json(


    )
})




app.listen(port, () => {
    console.log(`Servidor ${ port } rodando 🚀`);
});