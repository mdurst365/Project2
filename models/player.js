module.exports = function(sequelize,DataTypes){
    var Player = sequelize.define("Player",{
        name: DataTypes.STRING,
        position:DataTypes.STRING
    });
      return Player;
};