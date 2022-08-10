const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const myconn = require('express-myconnection');

const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ips_crud',
    port: 3306
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());
app.use(cors());

// routes -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API');
})
app.use('/ipsbarranquilla', routes);

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'), "✔️");
})