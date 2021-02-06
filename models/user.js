// const { sequelize } = require(".");
var bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) =>{
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        teamName: DataTypes.STRING,
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };

    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });

    User.associate = (models) => {
        User.hasMany(models.Player);
    };
    return User;
}