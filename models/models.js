const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const New = sequelize.define('new', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING(512)},
  description: {type: DataTypes.STRING(4096)},
  image: {type: DataTypes.STRING, allowNull: true},
  content: {type: DataTypes.STRING(4096)},
})


module.exports = {
  New
}