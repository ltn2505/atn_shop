//const { Router } = require("express");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
//var router = express.Router();
const port = process.env.PORT || 3001;
const { Pool, Client } = require('pg')


//const connectionString = 'postgresql://postgres:123456@localhost:5432/nodepg'
//const connectionString = 'postgres://hzhagotljosawg:a4814e357a3fdca11e0b6084b0cb9d583997d0b9d862ba8b5c3c7225516a21c4@ec2-3-212-168-103.compute-1.amazonaws.com:5432/d4ssg28at051ir'
/*const pool = new Pool({
    connectionString,
})
app.get('/customer', function (req, res) {
    pool.query("SELECT * FROM public.customer ORDER BY id ASC", function (req, result) {
        res.render('customer', { list: result });
    })
})*/
const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://hzhagotljosawg:a4814e357a3fdca11e0b6084b0cb9d583997d0b9d862ba8b5c3c7225516a21c4@ec2-3-212-168-103.compute-1.amazonaws.com:5432/d4ssg28at051ir',
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();
app.get('/customer', function (req, res) {
    client.query('SELECT * FROM public.customer;', function (req, result) {

        //if (err) throw err;
        /*for (let row of res.rows) {
            console.log(JSON.stringify(row));
            //res.render('customer');
        }*/
        res.render('customer', { list: result });
        // client.end();
    });
});
/*const client = new Client({
    connectionString,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})*/


/*app.get("/customer", function (req, res) {

    res.render("customer");
})*/

app.get("/test", function (req, res) {
    res.render("test");
});

app.get("/", function (req, res) {
    res.render("main");
});

app.listen(port, () => {  // do not add localhost here if you are deploying it
    console.log("server listening to port " + port);
});