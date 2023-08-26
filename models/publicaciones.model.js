const { DataTypes: dt } = require('sequelize')
const db = require('./sequelize.config')

const Publicacion = db.define('publicacion', {
  publicacionID: {
    type: dt.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  producto: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 35],
        msg: 'El largo del nombre debe medir entre 2 y 35 caracteres'
      }
    }
  },
  foto: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 200],
        msg: 'La foto  debe medir entre 2 y 50 caracteres'
      }
    }
  },
  descripcion: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 280],
        msg: 'La foto descrpcion entre 2 y 280'
      }
    }
  },
  stockInicial: {
    type: dt.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  stockDisponible: {
    type: dt.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  precio: {
    type: dt.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})


module.exports = Publicacion