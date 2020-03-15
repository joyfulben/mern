const mongoose = require('mongoose')
// IMPORT MONGOOSE TO CREATE SCHEMA

/*

____       _
/ ___|  ___| |__   ___ _ __ ___   __ _
\___ \ / __| '_ \ / _ \ '_ ` _ \ / _` |
 ___) | (__| | | |  __/ | | | | | (_| |
|____/ \___|_| |_|\___|_| |_| |_|\__,_|

*/

const amiiboSchema = mongoose.Schema({
  character: String,
  gameSeries: String,
  image: String,
  type: String
})

module.exports = mongoose.model('Amiibo', amiiboSchema)
