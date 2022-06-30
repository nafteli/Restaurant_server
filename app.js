import bodyParser from "body-parser";
import express from "express";
// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
import routes from './routes/account.js';
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
app.use('/api/', routes)


const port = process.env.PORT || 3000;
//start server
app.listen(port, ()=>{
    console.log(`listeniing at port:${port}`)
}) 