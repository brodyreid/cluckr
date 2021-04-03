const logger = require('morgan')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const clucksRouter = require('./routes/clucks')
const bcrypt = require('bcrypt')
const session = require('express-session')

// Setting up engine and middleware
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


const PORT = 3000
const ADDRESS = 'localhost'
app.listen(PORT, ADDRESS, () => {
    console.log(`Server listening on http://${ADDRESS}:${PORT}`)
})


app.use((request, response, next) => {
    const { username } = request.cookies
    response.locals.username = username
    next()
})


app.use('/', clucksRouter)


module.exports = app