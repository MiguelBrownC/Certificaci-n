var express = require('express');
var router = express.Router();

const {auth_required} = require('../middlewares')
const {Publicacion} = require('../models/index.models')

router.post('/api/publicaciones', auth_required, async (req, res) => {

  console.log('Datos del formulario', req.body)
  console.log('Datos del usuario', req.data)

  await Publicacion.create({
    producto: req.body.producto,
    foto: req.body.foto,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stockInicial: req.body.stockInicial,
    stockDisponible: req.body.stockInicial,
    userUserID: req.data.id
  })

  return res.json({})
})


module.exports = router