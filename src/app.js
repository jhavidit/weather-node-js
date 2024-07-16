const express = require('express')
const path = require('path')
const hbs = require('hbs')
const utils = require('./utils.js')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))




app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vidit Jha'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vidit Jha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vidit Jha'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is not provided'
        })
    }


    utils.geocode(req.query.address, (error, { lat, lon } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            utils.forecast(
                lat, lon, (error, data) => {
                    if (error) {
                        return res.send({
                            error: error
                        })
                    } else {
                        return res.send(data)
                    }
                }
            )
        }
    }
    )
})

app.get('*', (req, res) => {
    res.send('404 page not found')
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})