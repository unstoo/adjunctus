const express = require('express')
const next = require('next')
const fetch = require('isomorphic-unfetch')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
 
const fileStoreOptions = {
    ttl: 60 * 60 * 24 * 7 * 1
}
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const accounts = {
   _accounts: [ 
    { 
        username: 'asd',
        password: '11'
    },
    {
        username: 'qwe',
        password: '42'
    }],
    auth(username, password){
        return this._accounts.find(account => {
            return account.username === username
        })
    }
}

const data = {
    _records: [
        { username: 'asd', score: '53' },
        { username: 'qwe', score: '198' },
    ],

    forUser(username){
        return this._records.find(record => {
            return record.username === username
        })
    }
}



app.prepare().then(() => {
    const server = express()
    server.use(cookieParser())
    server.use(session({
        store: new FileStore(fileStoreOptions),
        secret: 'keyboard!cat',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 },
        name: 'sid'
    }))
    server.use(express.json()) // for parsing application/json
    server.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    

  
    
    
    

    server.get("/app", (req, res) => {
        if (!req.session || !req.session.username)
            return res.status(403).send('<a href="/">Please login</a>').end()
        
        app.render(req, res, '/app', req.query)
    })

    server.post('/api', (req, res) => {
        const username = req.session.username

        if (!username)
            return res.status(403).send(['Please login'])
        
        const result = data.forUser(username)

        if (!result)
            res.status(444).json(['User not found'])
        
        if (result)
            res.status(200).json(result)
    })

    
    server.post('/auth', (req, res) => {
        const { username, password } = req.body

        const result = accounts.auth(username, password)

        if (!result) 
            return res.status(403).json(['Access denied.'])

        if (result.password != password)
            return res.status(403).json(['Access denied.'])
        

        if (req.session && req.session.username) {
            return res.status(200).json(['Already logged in.'])  }
            

        if (req.session && !req.session.username) {
            req.session.username = username
        }
        

        res.status(200).json(['Access granted.'])
    })

    server.get('/logout', (req, res) => {
        if (!req.session || !req.session.username) 
            return res.status(200).send('<a href="/">You\'re not logged in</a>').end()
        
        
        req.session.destroy(err => {
            if (err) throw Error('Couldnt destroy session', err)
            
            res.clearCookie('sid');
            res.redirect('/')
        })
            
    })

    server.all('*', (req, res) => {
        return handle(req, res)
      })

      server.get("/about", (req, res) => {
        app.render(req, res, '/about', req.query)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log('Listening on PORT ' + port);
    })
})


// const options = (username, password) => ({
//     method: 'post',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         username, password
//     })
// })

// const check = async (username, password) => {
//     // const response = await fetch('/api/login', options(username, password))
// }



// const sessions = {
//     _sessions: [],
//     _check(username) {


//     },
//     create(username) {
//         const sessionId = this.sessions.length
//         this._sessions.push({ username, type: 'user' })
//         return { error: null, id: sessionId }
//     }
// }