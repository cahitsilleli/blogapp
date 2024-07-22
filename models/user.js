const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Name and surname information cannot be empty."
            },
            isFullname(value) {
                if(value.split(" ").length < 2) {
                    throw new Error("please enter first name and last name");
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "email already exist"
        },
        validate: {
            notEmpty: {
                msg: "email information cannot be empty"
            },
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "password cannot be empty"
            },
            len: {
                args: [5, 10],
                msg: "password should be between 5-10 characters"
            }
        }
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{ timestamps: true });

User.afterValidate( async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
})

module.exports = User;