const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mainpage: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    confirmation: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: true,
    validate: {
        checkValidConfirmation() {
            if(this.mainpage && !this.confirmation) {
                throw new Error("you have not approved the blog you marked as homepage")
            }
        }
    }
});



module.exports = Blog;