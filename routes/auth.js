const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require('bcrypt')

const {auth_required} = require('../middlewares.js')
const {User} = require('../models/index.models.js')


/* Para crear un JWT. */
router.post('/login', async function(req, res, next) {

  // 1. Recibo los parámetros del formulario
  const {email, password} = req.body

  // 2. Verificamos que el usuario exista en la "BBDD"
  const user = await User.findOne({where: {email}})
  if (!user) {
    return res.status(404).json({err: 'Usuario inexistente'})
  }

  // 3. Verificamos que la contraseña sea la correcta
  const son_iguales = password == user.password
  if (!son_iguales) {
    return res.status(400).json({err: 'Contraseña incorrecta'})
  }

  // 3. Calculo 1 hora más
  const una_hora = Math.floor(new Date()/1000) + 3600

  // 4. Creo el token
  const token = jwt.sign({
    exp: una_hora,
    data: {
      id: user.userID,
      email: user.email,
      nombre: user.nombre
    }
  }, process.env.SECRET_KEY)

  // 4. Le retorno el token al cliente
  res.json(token);
});

/* Para crear un JWT. */
router.post('/signup', async function(req, res, next) {

  // 1. Recibo los parámetros del formulario
  const {nombre, email, password, pass_confirm} = req.body

  // 2. Verificamos que los 4 campos existan
  if (!nombre || !email || !password || !pass_confirm) {
    return res.status(400).json({
      err: 'Debe ingresar todos los campos'
    })
  }
  
  // 3. Verificamos que contraseñas coincidan
  if (password != pass_confirm) {
    return res.status(400).json({
      err: 'Las contraseñas no coinciden'
    }) 
  }

  // 4. Verficamos si ese "email" no exista en la base de datos
  const oldUser = await User.findOne({where: {email}})
  if (oldUser) {
    return res.status(400).json({
      err: 'Ese email ya se encuentra registrado'
    })
  }
  
  // 5. Creamos el usuario en la base de datos
  let newUser;
  try {
    
    newUser = await User.create({nombre, email, password})
  }
  catch(error) {
    return res.status(400).json(error)
  }

  // 6. Genero el nuevo token, y se lo envío al usuario
  const una_hora = Math.floor(new Date()/1000) + 3600

  const token = jwt.sign({
    exp: una_hora,
    data: {
      id: newUser.id,
      email,
      nombre
    }
  }, process.env.SECRET_KEY)

  // 4. Le retorno el token al cliente
  res.json(token);
});


// Ruta que está protegida por nuestro middleware llamado "auth_required"
router.get('/my', auth_required, (req, res) => {

  // Info que viene desde el middleware
  const data = req.data
  console.log(data)
  
  // 3. Si todo está ok, devolvemos el dinero
  res.json(data)
})


module.exports = router;