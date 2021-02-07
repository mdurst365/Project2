// const { Model } = require('sequelize/types');
const db = require('../models');
var passport = require("../config/passport");

module.exports = (app) =>{
    //Route to get all users and user data
    app.get("/api/users", function(req, res){
        db.User.findAll({
            include: [db.Player],
        }).then((dbUser) => res.json(dbUser));

    });

    //Route to get a specific user
    app.get('/api/users/:id', function(req, res){
        db.User.findOne({
            where:{
                id: req.params.id,
            },
            include: [db.Player],
        }).then((dbUser) => res.json(dbUser));

    });

    // Signup route
    app.post('/signup', function(req,res){
        db.User.create({
            name: req.body.user,
            password: req.body.password,
            teamName: req.body.teamName,
        }).then(function(){ 
        //Redirects through login route if successful
        res.redirect(307, "/login")
        // If user entered Data is invalid then sends them to an error page with a link to login again
        }).catch(function(){
            req.session.error = 'Incorrect username or password';
            res.redirect(409, '/login');
        });
    });

    // Will send user to error page
    app.get('/error', function(req,res){
        res.render('error', { error: req.session.error });
        // delete res.session.error; // remove from further requests
    })

    // Login route, authenricates user with passport
    app.post("/login", (req,res) => passport.authenticate('local', { successRedirect: "/", failureRedirect: '/login'})(req, res));

    // Initial login route
    app.get('/login', function(req,res){
        res.render('login');
    })

    // route to main page
    app.get('/index', function(req,res){
        res.render('index');
    })

    // route to delete player
    app.delete('/api/users/:id', function(req,res){
        db.User.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbUser) => res.json(dbUser));

    });

    // sends user back to login page
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/login");
      });


    //=================Possible routes to update user info or search for specific teams if user has more than one========//
    // app.put('/api/users/:id', function(req,res){
    //     db.User.update(req.body, {
    //         where: {
    //             id: req.body.id,
    //         },
    //     }).then((dbUser) => res.json(dbUser));

    // });

    // app.get('/api/users/:teamName', function(req,res){
    //     db.User.findAll({
    //         where:{
    //             teamName: req.params.teamName,
    //         },
    //     }).then((dbUser) => res.json(dbUser));
    // })

}