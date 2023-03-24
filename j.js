const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
const exphbs = require('express-handlebars');

const Sequelize = require("sequelize");


const sequelize = new Sequelize("nxqmjlfo", "nxqmjlfo", "RH6UrzNIF5uWU02-yEG74KyhE6hS5wCJ", {
    host: "suleiman.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});





var User = sequelize.define('Student111', {
    name: Sequelize.STRING,
    email: Sequelize.STRING
});



// Load styles from public folder
app.use(express.static("./public/"));

// Define a custom Handlebars helper function to format dates
const hbs = exphbs.create({
    helpers: {
        formatDate: function (date) {
            return date;
        }
    },
    extname: ".hbs"
});

// Register handlebars as the rendering engine for views
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");


// Use body-parser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form
app.get('/update-user', (req, res) => {


    User.findAll({
        where: { id: req.query.id }
    }).then(() => {
        res.render('edit', { users: req.query.id, layout:false });
    });
   
});

// Update user data in database
app.post('/update-user', (req, res) => {
   

    // const name = req.body.name;
    // const id = req.body.id;
    // const email = req.body.email;
    // // Update data into PostgreSQL
    // pool.query(
    //     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    //     [name, email,id],
    //     (error, results) => {
    //         if (error) {
    //             console.log(error); res.status(500).json({ message: 'Error update data into PostgreSQL' });
    //         } else {
    //             res.redirect("/");
    //         }
    //     });

    // update a record using the "Name" model with the data from req.body
    User.update({
        name: req.body.name,
        email: req.body.email
    }, {
        where: { id: req.body.id }
    }).then(() => {
        console.log("successfully updated name: " + req.body.id);
        res.redirect("/"); // redirect back to the home page
    });
});

// Delete user data in database
app.get('/delete-user', (req, res) => {
  

    User.destroy({
        where: { id: req.query.id }
    }).then(() => {
        console.log("successsfully removed user: " + req.query.id);
        res.redirect("/"); // redirect back to the home page
    });


});

// Handle form submission
app.post('/insert-user', (req, res) => {
    // create a record using the "Name" model with the data from req.body
    User.create({
        name: req.body.name,
        email: req.body.email
    }).then(() => {
        console.log("successfully created a new name");
        res.redirect("/");
    });
});


app.get('/', (req, res) => {
    // fetch all of the names and order them by id
    User.findAll({
        attributes1: ["name"],
        attributes2: ["email"]

    }).then((data) => {

        res.render("index", {
            data: data,
            layout: false // do not use the default Layout (main.hbs)
        });
    });
});


// synchronize the database before we start the server
sequelize.sync().then(() => {
    // start the server to listen on HTTP_PORT
    app.listen(HTTP_PORT, onHttpStart);
});

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}



const HTTP_PORT = process.env.PORT || 8080;
