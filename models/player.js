module.exports = (sequelize,DataTypes) => {
    var Player = sequelize.define("Player",{
        name: DataTypes.STRING,
        position:DataTypes.STRING
    });

    Player.associate = (models) =>{

        Player.belongsTo(models.User, {
            // foreignKey: {
            //     allowNull: false,
            // },
        });
    };
      return Player;
};