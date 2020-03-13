const amiibos = require('express').Router()
const Amiibo = require('../models/amiibos.js')




// Schema
// const Amiibo = require('../models/test.js')

/*
____                           _        _   _
|  _ \ _ __ ___  ___  ___ _ __ | |_ __ _| |_(_) ___  _ __
| |_) | '__/ _ \/ __|/ _ \ '_ \| __/ _` | __| |/ _ \| '_ \
|  __/| | |  __/\__ \  __/ | | | || (_| | |_| | (_) | | | |
|_|   |_|  \___||___/\___|_| |_|\__\__,_|\__|_|\___/|_| |_|

____             _
|  _ \ ___  _   _| |_ ___
| |_) / _ \| | | | __/ _ \
|  _ < (_) | |_| | ||  __/
|_| \_\___/ \__,_|\__\___|

*/

//Index
amiibos.get('/', (req, res) => {
  Amiibo.find({}, (err, foundAmiibos) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(foundAmiibos)
  })
})

/*

_                _        ____             _
| |    ___   __ _(_) ___  |  _ \ ___  _   _| |_ ___  ___
| |   / _ \ / _` | |/ __| | |_) / _ \| | | | __/ _ \/ __|
| |__| (_) | (_| | | (__  |  _ < (_) | |_| | ||  __/\__ \
|_____\___/ \__, |_|\___| |_| \_\___/ \__,_|\__\___||___/
           |___/

*/
//Create
amiibos.post('/', async(req, res) => {
  Amiibo.create(req.body, (error, createdAmiibo) => {
    if (error) {
      res.status(400).json({error: error.message})
    }
    res.status(200).send(createdAmiibo)
  })
})

//Delete
amiibos.delete('/:id', (req, res) => {
  Amiibo.findByIdAndRemove(req.params.id, (err, deletedAmiibo) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deletedAmiibo)
  })
})

//Update
amiibos.put('/:id', (req, res) => {
  Amiibo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedAmiibo) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updatedAmiibo)
  })
})

module.exports = amiibos
