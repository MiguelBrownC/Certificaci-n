const { DataTypes: dt } = require('sequelize')
const db = require('./sequelize.config')

const User = db.define('user', {
  userID: {
    type: dt.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 50],
        msg: 'El largo del nombre debe medir entre 2 y 50 caracteres'
      }
    }
  },
  email: {
    type: dt.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: [true],
        msg: "Debe ingresar un correo válido"   
      },
      len: {
        args: [2, 35],
        msg: 'El largo del email debe medir entre 2 y 35 caracteres'
      }
    }
  },
  password: {
    type: dt.STRING,
    allowNull: false,
  }
}, {timestamps: true})


try {
  db.sync()
}
catch(err) {
  console.error('Something went wrong with the SYNC of the table Transferencia', err)
}


module.exports = User