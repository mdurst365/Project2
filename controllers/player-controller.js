var db = require("../models");
var passport = require("../config/passport");
const { response } = require("express");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//routes 
module.exports = function(app){
    app.get("/players", function(req, res){
       db.Player.findAll({}).then(function(players){
            res.render("index", { players })
        })
        
    });
    app.get("/", isAuthenticated, async function(req, res){
        const user = await db.User.findByPk(req.user.id);
        // db.Player.findAll({
        //     where: {
        //         UserId: req.params.UserId
        //     },
        // }).then(function(players){res.render("index", { players })});
    const players = await user.getPlayers()
    res.render("index", { players });

    });
   


    app.put('/api/players', (req, res) => {
        db.Player.update(req.body, {
           where :{
               id: req.body.id
           },
        }).then((dbPlayer) => res.json(dbPlayer));
      });
    
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
app.delete("/api/players/:UserId/:id", function(req,res){
    db.Player.destroy({
        where : {
            id : req.params.id
        }
    }).then((dbPlayer) => res.json(dbPlayer));
})
}


    
    

    
