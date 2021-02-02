// const { Model } = require('sequelize/types');
const db = require('../models');

module.exports = (app) =>{
    app.get("/api/users", function(req, res){
        db.User.findAll({
            include: [db.Player],
        }).then((dbUser) => res.json(dbUser));

    });

    app.get('/apiusers/:id', function(req, res){
        db.User.findOne({
            where:{
                id: req.params.id,
            },
            include: [db.Player],
        }).then((dbUser) => res.json(dbUser));
    });

    app.post('/api/users', function(req,res){
        db.User.create(req.body).then((dbAuthor) => res.json(dbAuthor));
    });

    app.delete('/api/users/:id', function(req,res){
        db.User.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbAuthor) => res.json(dbAuthor));

    });

    app.put('/api/users/:id', function(req,res){
        db.User.update(req.body, {
            where: {
                id: req.body.id,
            },
        })
    });
}