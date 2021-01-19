const Sequelize = require('sequelize')

const sequelize = new Sequelize('shopDB', 'shopper', 'shoppass', {
    dialect: 'sqlite',
    storage: "./db.sqlite3"
})

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cartProducts: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    fbAccessToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ghAccessToken: {
        type: Sequelize.STRING,
        allowNull: true
    },

})

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    manufacturer: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    imageSRC: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Description:{
       type: Sequelize.STRING,
    allowNull:true
    },
    specification:{
        type:Sequelize.STRING,
        allowNull:true
    },
    enlargedImage:{
        type:Sequelize.STRING,
        allowNull:true
    }



})

sequelize.sync()
    .then(() => {
        console.log("synced");

    })
    .catch(() => {
        console.log("error in syncing");

    })

exports = module.exports = {
    Users, Product
}