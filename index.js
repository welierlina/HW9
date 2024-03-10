var express = require('express')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')

var swaggerJsdoc = require('swagger-jsdoc')
var swaggerUi = require('swagger-ui-express')


var pool = require("./queries.js")

var app = express()

const morgan = require('morgan')

app.use(morgan('common'))


//app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

var movies =  require('./movies.js')

app.use('/movies', movies)

pool.connect((err, res) => {
    console.log(err);
    console.log('connected');
})

app.get('/', (req, res) => {
    const token = jwt.sign(
        {
            userID: 3,
            role: 'admin',
        },
        'koderahasiayangsangatsangatrahasia',
        { expiresIn: '1h'}
    )
    res.json({
        token: token,
    })
})

app.get('/verify/:token', (req, res) => {
    const data = jwt.verify(
        req.params.token,
        'koderahasiayangsangatsangatrahasia'    
    )
    res.json({
        data: data,
    })
})



const options =  {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with swagger',
            version: '0.1.0',
            description: 'This is a simple CRUD API application made with Express and documented with swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./route/*'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(specs, { explorer: true}))


app.listen(3000)




