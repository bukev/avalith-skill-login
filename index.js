require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// ----- static user ----- //
const user = {
    username: 'admin',
    password: bcrypt.hashSync('admin', 10)
}


// ----- login ----- //
app.post('/login', async (req, res) => {

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    
    try {
        if (await bcrypt.compare(req.body.password, user.password) && req.body.username === user.username) {
            res.json({"message": 'Logged in!', "token": accessToken})
        } else {
            res.send('Invalid Credentials.')
        }
    } catch {
        res.status(500).send()
    }

})


// ----- middleware, authenticates token ----- //
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


// ----- Buenos días X! ----- //
app.get('/greetings', authToken, (req, res) => {
    // res.send(user)
    res.send(`Buenos días ${req.user.username}!`)
})


// ----- mounting server ----- //
app.listen(PORT, () => {
    console.log(`server working on port ${PORT}`)
})