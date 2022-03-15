const path = require('path');
const express = require('express')
const res = require('express/lib/response');
const { join } = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for express config to serve
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Naveen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this Page',
        name: 'Naveen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the worlds best help page!',
        name: 'Naveen',
        title: 'Help'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address){
        return res.send({error: 'Enter a valid address'})
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({  
                location,
                forecast: forecastData,
            })

        })

        
    })

})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: '404!! The Help page you are looking for does not exist',
        name: 'Naveen',
        title: 'Help'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: '404!! The  page you are looking for does not exist',
        name: 'Naveen',
        title: 'Help'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})