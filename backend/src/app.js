const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')

const app = express()

app.use(passport.initialize());

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