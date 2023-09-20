const express = require('express')
const router=express.Router();

const {
  createUser,
  getAllUsers,
  createTravelDestination,
  getAllTravelDestination,
  getTravelDestinationByName,
  readTravelDestinationsByRating,
  updateTravelDestination,
  deleteTravelDestination,
  filterDestinationsByRating,
  addReview,
  getDestinationReviewsWithUserDetails
}=require('./functions')

//user routs
router.post('/user',createUser)
router.get('/user',getAllUsers)



//destination routs

router.post('/destinations',createTravelDestination)
router.get('/destinations',getAllTravelDestination)
router.get('/destinations/rating',readTravelDestinationsByRating)
router.get('/destinations/:name',getTravelDestinationByName)
router.post('/destinations/:destinationId',updateTravelDestination)
router.delete('/destinations/:destinationId',deleteTravelDestination)
router.get('/destinations/filter/:minRating',filterDestinationsByRating)
router.post('/destinations/:destinationId/reviews',addReview)
router.get('/destinations/:destinationId/reviews',getDestinationReviewsWithUserDetails)





module.exports=router