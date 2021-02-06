var db = require("../models");
var passport = require("../config/passport");

//routes 
module.exports = function(app){
    app.get("/api/players", function(req, res){
       db.Player.findAll({}).then(function(bdPlyer){
            res.render("login")
        })
    });
    app.get("/api/players/:UserId", function(req, res){
        db.Player.findAll({
            where: {
                UserId: req.params.UserId
            },
        }).then((dbPlayer) => res.json(dbPlayer));
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
    UserId: req.body.UserId
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


    
    

    
