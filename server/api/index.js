const router = require('express').Router()
module.exports = router

//DO NOT USE THESE API routes
//these API routes are for mapbox style data preparation usage ONLY
router.use('/users', require('./users'))
router.use('/buildings', require('./buildings'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
