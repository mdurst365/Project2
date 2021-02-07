// const { sequelize } = require(".");
var bcrypt = require("bcryptjs");
// Defining our user model
module.exports = (sequelize, DataTypes) =>{
    var User = sequelize.define('User', {
      //Username cannot be null and musy be unique
        name: {
          type :DataTypes.STRING,
          allowNull: false,
          unique: true
        },
      //Password may not be null and must be between 5-10 characters
        password: {
          type: DataTypes.STRING,
          len: [5, 10],
          allowNull : false
        },
        teamName:{
      //No constraints. Go Wild
          type: DataTypes.STRING,
        }
    });

    // Creating a custom method for our user model. This checks if an unhashed password entered by the user can be compared to the hashed password stored in the database.
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });

    User.associate = (models) => {
        User.hasMany(models.Player);
    };
    return User;
}