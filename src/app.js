//Simple node server. 
const path      = require('path')
const express   = require('express')
const hbs       = require('hbs'); //1. partial configuration
const weather   = require('./utils/geocode');
const geocode = weather.geoCode;
const forcast  = weather.forcast;

const app = express()
const port = process.env.PORT || 3000;// means that it will either take port number
                                    //from environment or set to 3000

//Define paths to the public directory and the template directory
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname+'/../templates/views');
const partialsPath = path.join(__dirname+'/../templates/partials') //2
console.log("views path",viewsPath);

//Setup handle bars and the views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);//3 

//setup static directory.
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
    title: 'Index',
    name: 'Keerthana Prakash'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
    title: 'About',
    name: 'Keerthana Prakash'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
    title: 'Help',
    name: 'Keerthana Prakash'
    });
});
// app.get('/weather', (req, res) => {
//     res.render('weather',{
//         title : 'Weather',
//         forecast: 'It is snowing',
//         location: 'Philadelphia',
//         name: 'Keerthana Prakash'
//     });
// });

/*return the forcast details of  location. api is connecteed to the weatherstack api
and return the wether details back. 
http://localhost:3000/weather?address=alappuzha
 */
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send("Error:Plese provide an Address");
    }
    //={} means the object is set empty object.{longitude,latitude,placename}={} 
    geocode(req.query.address,(error,{longitude,latitude,placeName}={})=>{
        if(error){
            return res.send({error});
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error});

            }
            res.send({
                forcast:forcastData,
                placeName,
                address : req.query.address
            });
            

        })

    })

    // res.render('weather',{
    //     title : 'Weather',
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address : req.query.address,
    //     name: 'Keerthana Prakash'
    // });
});

//setting the 404 handler. set it the end of all routes.

app.get('/help/*', (req, res) => {
    res.render('404',{
        title : 'Help Article Not Found!',
        errorMessage : 'Help Article Not Found!',
        name: 'Keerthana Prakash'

    });
});


app.get('*', (req, res) => {
    res.render('404',{
        title : 'Page Not Found!',
        errorMessage : 'Help Article Not Found!',
        name: 'Keerthana Prakash'

    });
});

app.listen(port,() => {
console.log('Server is up on port .',port)
})


















// const path = require('path')
// const express = require('express')
// const app = express()
// const publicDirectoryPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirectoryPath))
// console.log(publicDirectoryPath);

// app.set('view engine', 'hbs'); // setting up the express template engine hbs.

// const viewsPath = path.join(__dirname, '../templates/views')
// app.set('views', viewsPath)
// //Template rendering using hbs
// // app.get('/',(req,res)=>{
// //     res.render('views/index.hbs',{
// //         title : "Weather app",
// //         name : "Keerthana Prakash"

// //     });
// // });

// app.get('/', (req, res) => {
//     res.render('index', {
//     title: 'My title',
//     name: 'Andrew Mead'
//     })
// })

// app.get('/about',(req,res)=>{
//     res.render('index.hbs',{
//         title : "About",
//         name : "Keerthana Prakash"

//     });
// });
// app.get('/weather',(req,res)=>{
//     res.send({
//         forcast : "It is rainig",
//         location : "Cherthala"
//     });
// });

// app.listen(3000,()=>{
//     console.log("server started at port 3000...")
// });