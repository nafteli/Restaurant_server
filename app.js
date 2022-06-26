import bodyParser from "body-parser";
import express from "express";
// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
import routes from './routes/account.js';
app.use('/api/', routes)


const port = process.env.PORT || 3000;
//start server
app.listen(port, ()=>{
    console.log(`listeniing at port:${port}`)
}) 