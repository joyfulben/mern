const amiibos = require('express').Router()

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

// Index

  amiibo.get('/', (req.res) => {
    res.send("This is displaying our page!")
  })


/*

_                _        ____             _
| |    ___   __ _(_) ___  |  _ \ ___  _   _| |_ ___  ___
| |   / _ \ / _` | |/ __| | |_) / _ \| | | | __/ _ \/ __|
| |__| (_) | (_| | | (__  |  _ < (_) | |_| | ||  __/\__ \
|_____\___/ \__, |_|\___| |_| \_\___/ \__,_|\__\___||___/
           |___/

*/

module.exports = amiibos
