const User = require('./users.model')
const Publicacion = require('./publicaciones.model')


User.hasMany(Publicacion)
Publicacion.belongsTo(User)

module.exports = {User, Publicacion}