const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const cowin = require('./utils/cowin.js')
const app = express()
const port = process.env.port || 3000

const publicDirecPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath)
app.use(express.static(publicDirecPath));
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'COWIN and Weather Info',
        author: 'Shan',
        name: 'Shanmuganathan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        about: 'This project is created by Shan',
        title: 'About me',
        name: 'Shanmuganathan'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Please contact Shan for any help..!',
        title: 'Help',
        name: 'Shanmuganathan'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a city name for find weather information'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/cowin', (req, res) => {
    if (!req.query.pincode) {
        return res.send({
            error: 'you must provide an pincode!'
        })
    }
    cowin(req.query.pincode, (error, response = {}) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            response
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        code: '404',
        message: 'Help article not found..!',
        name: 'Shanmuganathan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        code: '404',
        message: 'Page not found..!',
        name: 'Shanmuganathan'
    })
})

app.listen(port, () => {
    console.log("server is up on port " + port);
})