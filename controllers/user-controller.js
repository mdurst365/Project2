// const { Model } = require('sequelize/types');
const db = require('../models');
var passport = require("../config/passport");

module.exports = (app) =>{
    app.get("/api/users", function(req, res){
        db.User.findAll({
            include: [db.Player],
        }).then((dbUser) => res.json(dbUser));

    });

    

    

    app.get('/api/users/:id', function(req, res){
        db.User.findOne({
            where:{
                id: req.params.id,
            },
            include: [db.Player],
        }).then((dbUser) => res.json(dbUser));

    });

    app.post('/signup', function(req,res){
        db.User.create({
            name: req.body.user,
            password: req.body.password,
            teamName: req.body.teamName,
        }).then(function(){ 
        res.redirect(307, "/login")
        }).catch(function(err){
            res.status(401).json(err);
        });
    });

    app.post("/login", (req,res) => passport.authenticate('local', { successRedirect: "/", failureRedirect: '/login'})(req, res));


    app.get('/login', function(req,res){
        res.render('login');
    })

    app.get('/index', function(req,res){
        res.render('index');
    })


    app.delete('/api/users/:id', function(req,res){
        db.User.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbUser) => res.json(dbUser));

    });

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