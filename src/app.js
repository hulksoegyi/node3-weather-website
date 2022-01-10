const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Richard',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Richard',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Richard',
        helpText: 'This is help text. bitch!',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Richard',
        message: 'Help article not found',
    });
});

// Fetch weather data according to geocode
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: `Address must be provided to retrieve weather information.`
        });
    }
    
    geocode(req.query.address, ({lat, long} = {}) => {
        console.log(lat, long);
        forecast(lat, long, ({locationName, dataStr: forecastStr} = {}) => {
            console.log(locationName, forecastStr);
            res.send({
                location: locationName,
                forecast: forecastStr
            });            
        });
    });
});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: `You must provide a search term.`,
        })
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Richard',
        message: 'Here is my 404 page.',
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});