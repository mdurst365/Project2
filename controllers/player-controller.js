var db = require("../models");
var passport = require("../config/passport");
const { response } = require("express");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//routes 
module.exports = function(app){
    // route to get ALL players
    app.get("/players", function(req, res){
       db.Player.findAll({}).then(function(players){
            res.render("index", { players })
        })
        
    });

    //default route
    app.get("/", isAuthenticated, async function(req, res){
        const user = await db.User.findByPk(req.user.id);  
        const players = await user.getPlayers()
        res.render("index", { players });

    });

    //route to update specific players
    app.put('/api/players/:id', (req, res) => {
        db.Player.update(req.body, {
           where :{
               id: req.params.id
           },
        }).then((dbPlayer) => res.json(dbPlayer));
      });
    
    //Route to create players
    app.post("/api/players", function(req, res){
    db.Player.create({
    name: req.body.name,
    position: "benched",
    UserId: req.user.id
    }).then( dbPlayer =>{
        res.json(dbPlayer)
    console.log(req.body)

    })
    })

    //Route to delete specific players
    app.delete("/api/players/:id", function(req,res){
    db.Player.destroy({
        where : {
            id : req.params.id
        }
    }).then((dbPlayer) => res.json(dbPlayer));
})
}


    
    

    
