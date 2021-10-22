const { Router } = require("express");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var router = express.Router();
const port = process.env.PORT || 3001;
const { Pool, Client } = require('pg')


//const connectionString = 'postgresql://postgres:123456@localhost:5432/nodepg'
const connectionString = 'postgres://qlyxgcpwgnqcvm:4424d7945531c49f5a50d873464fa997ff0762efd15b881e3cc74f7fa6372fbe@ec2-44-199-19-76.compute-1.amazonaws.com:5432/d2nraqel3uo2dk'
const pool = new Pool({
    connectionString,
})
app.get('/customer', function (req, res) {
    pool.query('SELECT * FROM customer', function (req, result) {

        res.render('customer', { list: result });
    })
})


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