// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        teamName: DataTypes.STRING,
    });

    User.associate = (models) => {
        User.hasMany(models.Player, {
          
        });
    };
    return User;
}