const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const PORT = 3001

const user = {
    username: 'admin',
    password: 'admin'
}

app.use(express.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
    const {username, password} = req.body

    console.log(username)
    console.log(password)
    console.log('asd')

    res.send(username)
    res.send(password)
    // jwt.sign({user: user}, 'secretkey', (err, token) => {
    //     if(err){
    //         res.send(err)
    //     } else {
    //         res.send(token)
    //     }
    // })
})

app.get('/greetings', (req, res) => {
    res.send('Hola')
})

app.listen(PORT, () => {
    console.log(`server working on port ${PORT}`)
})