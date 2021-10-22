const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
const port = process.env.PORT || 3001;
const { Pool, Client } = require('pg');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//'postgresql://postgres:123456@localhost:5432/nodepg'
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://hzhagotljosawg:a4814e357a3fdca11e0b6084b0cb9d583997d0b9d862ba8b5c3c7225516a21c4@ec2-3-212-168-103.compute-1.amazonaws.com:5432/d4ssg28at051ir',
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/customer', function (req, res) {
    pool.connect(function (err, client) {
        client.query('SELECT * FROM public.customer;', function (req, result) {
            res.render('customer', { list: result });
        });
    });
});

app.get('/resigter', function (req, res) {
    res.render('resigter');
})
app.post("/resigter", urlencodedParser, function (req, res) {
    pool.connect(function (err, client) {
        var ten = req.body.txtName;
        var tuoi = req.body.txtAge;
        var mail = req.body.txtEmail;
        var diachi = req.body.txtAddress;

        client.query("INSERT INTO customer(name,age,email,address) VALUES('" + ten + "','" + tuoi + "','" + mail + "','" + diachi + "')", function (req, result) {


            res.redirect('../customer');
        });
    })
})

app.get('/login', function (req, res) {
    res.render('login');
})

app.post("/login", urlencodedParser, function (req, res) {
    pool.connect(function (err, client) {
        var mail = req.body.txtEmail;
        client.query("SELECT email from customer WHERE ('" + mail + "')=email", function (req, result) {
            res.send("dang nhap thanh cong");
            //res.redirect('../customer');
        });
    })
})

app.get("/test", function (req, res) {
    res.render("test");
});

app.get("/", function (req, res) {
    res.render("main");
});

app.listen(port, () => {
    console.log("server listening to port " + port);
});