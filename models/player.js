// Exporting and defining Player table
module.exports = (sequelize,DataTypes) => {
    var Player = sequelize.define("Player",{
        name: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        position:DataTypes.STRING
    });

    // Associating the player model to the user model
    Player.associate = (models) =>{
        //Defining relationship between player and user models
        Player.belongsTo(models.User, {
            onDelete: 'CASCADE',
        });
    };
      return Player;
};