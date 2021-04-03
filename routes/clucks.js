const { response, request } = require('express')
const { userParams } = require('../db/client')
const knex = require('../db/client')
const router = require('express').Router()
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30

router.get('/sign_in', (request, response) => {
    response.render('sign_in')
})

router.post('/sign_in', (request, response) => {
    const { username } = request.body
    response.cookie('username', username, { maxAge: COOKIE_MAX_AGE })
    response.redirect('/new_cluck')
})

router.post('/sign_out', (request, response) => {
    response.clearCookie('username')
    response.redirect('/sign_in')
})

router.get('/new_cluck', (request, response) => {
    response.render('new_cluck')
})

router.get('/', (request, response) => {
    response.render('cluck_index')
})

router.get('/index', (request, response) => {
    return knex('current_clucks')
      .orderBy('created_at', 'DESC')
      .select('*')
      .then(clucks => {
        response.render('cluck_index', { clucks })
    })
})

router.post('/index', (request, response) => {
    const { imageURL, content } = request.body
  
    knex('current_clucks')
      .insert(
        {
            username: request.cookies.username,
            imageURL,
            content,
        }, '*')
      .then((data) => {
        console.table(data)
      })
      .catch(console.error)
      response.redirect('/index')
  })

router.post('/users', async(request, response) => {
    const { username, password } = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const [ user ] = await knex('users')
        .insert({
            username,
            password: hashedPassword,
        }, '*')

    request.session.user = {
        id: user.id,
        username: user.username,
    }
    response.redirect('/')
})

module.exports = router