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

    app.post('/api/signup', function(req,res){
        db.User.create({
            name: req.body.name,
            password: req.body.password,
            teamName: req.body.teamName,
        }).then(function(){ 
        res.redirect(307, "/api/login")
        }).catch(function(err){
            res.status(401).json(err);
        });
    });

    app.post("/api/login", (req,res) => passport.authenticate('local', { successRedirect: '/', failureRedirect: 'login'})(req, res));

    app.delete('/api/users/:id', function(req,res){
        db.User.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbUser) => res.json(dbUser));

    });

    app.put('/api/users/:id', function(req,res){
        db.User.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then((dbUser) => res.json(dbUser));

    });
}