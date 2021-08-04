const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const PORT = 3001

const user = {
    username: 'admin',
    password: bcrypt.hashSync('admin', 10)
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.post('/login', async (req, res) => {
    
    try {
        if (await bcrypt.compare(req.body.password, user.password) && req.body.username === user.username) {
            res.send('Logged in!')
        } else {
            res.send('Invalid Credentials.')
        }
    } catch {
        res.status(500).send()
    }
    
    // jwt.sign({user: user}, 'secretkey', (err, token) => {
    //     if(err){
    //         res.send(err)
    //     } else {
    //         res.send(token)
    //     }
    // })
})

app.get('/greetings', (req, res) => {
    res.send(user)
})



// ----- Monta el servidor ----- //
app.listen(PORT, () => {
    console.log(`server working on port ${PORT}`)
})