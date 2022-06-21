const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('content', function (request, response) {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


let numbers = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },

]

app.get('/', (request, response )=> {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/numbers', (request, response) => {
    response.json(numbers)
})

app.get('/api/numbers/:id', (request, response) => {
    const id = Number(request.params.id)
    const number = numbers.find(number => number.id === id)

    if(number) {
        response.json(number)
    } else {
        response.status(404).end()
    }
    })

app.delete('/api/numbers/:id', (request, response) => {
    const id = Number(request.params.id)
    numbers = numbers.filter(number => number.id !== id)
    console.log(numbers)
    response.status(204).end()
})

app.post('/api/numbers', (request, response) => {
    const id = Math.floor(Math.random() * 100000)


    const number = request.body
    const name = number.name
    number.id = id

    if(name && number.number){
        const found = numbers.find(num => num.name == name)
        console.log(found)

        if(found === undefined){
            numbers = numbers.concat(number)
            response.json(number)
        } else {
            response.status(409).send({error: "name must be unique"})
        }
    } else {
        response.status(400).send({error: "name or number missing"})
    }
})


app.get('/info', (request, response) => {
    const total = notes.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${total} people</p>
                    ${date}
    `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Phonebook backend Server running on port ${PORT}`)
})
