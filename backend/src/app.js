const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

app.use(cors({
    credentials: true,
    origin: [ /localhost/ ]
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(bodyParser.json())

// Register Strategies
require('./auth/passport');

// Register Schemas
require('./models/User')
require('./models/Team')
require('./models/Project')
require('./models/Task')
require('./models/Tag')

// Apply routes
require('./routes/index').apply(app)

main().catch(err => console.error(err));

async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI)
}

app.get('/', (req, res) => {
    res.send({
        apiVersion: '1.0',
        name: 'TimeTracker Backend API',
        author: 'Krzysztof Piątkowski'
    })
})

app.listen(process.env.PORT)