const Destination=require('../model/tripModel')
const User=require('../model/userModel')

//user functions
const createUser=async(req,res)=>{
  //ok
  try{
    const userData=req.body
    const newUser=new User(userData)
    const savedUser=await newUser.save()
    if(!savedUser){
      res.status(404).json({message:"user not added"})
    }
    res.status(200).json({message:"New user  added",savedUser})
    
  }catch(err){
    res.status(500).json({error:"server side error in creating user",err})
  }
}
const getAllUsers=async(req,res)=>{
  //ok
  try{
    const allUsers=await User.find({})
    
    if(!allUsers){
      res.status(404).json({message:"cant fetch all users data"})
    }
    res.status(200).json({message:"here are all users",allUsers})
    
  }catch(err){
    res.status(500).json({error:"server side error in getting all user",err})
  }
}


//destination functions

const createTravelDestination = async (req, res) => {
  //ok
  try {
    const data = req.body;
     
    const destination = new Destination(data);
    const savedDestination = await destination.save();

    if (!savedDestination) {
       res.status(404).json({ message: "Destination not added" });
    }

     res.status(200).json({ message: "Destination added", savedDestination });
  } catch (err) {
    
     res.status(500).json({ error: "Server side error in adding a destination" });
  }
};

const getAllTravelDestination=async(req,res)=>{
  //ok
  try{
    const allDestinations=await Destination.find({})
    if(!allDestinations){
      res.status(404).json({ message: "cant get all destinations" });
    }
    res.status(200).json({ message: "All destinations", allDestinations });
    
  }catch(err){
    res.status(500).json({ error: "Server side error in getting all destinations" });
  }
}

const getTravelDestinationByName=async(req,res)=>{
  //ok in testing but will make it case sensitive later
  try{
    const destinationName=req.params.name
  
    const destination=await Destination.findOne({name:destinationName})
   
    if(!destination){
      res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json({ message: "Destination details:", destination });
  }catch(err){
     res.status(500).json({ error: "Server side error in getting destination by name " });
  }
}

const getTravelDestinationsByLocation=async(req,res)=>{
  try{
    //will do at last
    
  }catch(err){
     res.status(500).json({ error: "Server side error in getting destination by location name" });
  }
}
const readTravelDestinationsByRating=async(req,res)=>{
  //ok
  try{
  
    const destinations=await Destination.find({}).sort({rating:-1})
    
    if(!destinations){
      res.status(404).json({message:"some issue in retreving all destinations by rating"})
    }
    
     res.status(200).json({message:"all destinations by rating decending order are:",destinations})
  }catch(err){
    res.status(500).json({ error: "Server side error in getting destination by ratings" });
  }
}
const updateTravelDestination=async(req,res)=>{
  //ok
  try{
    const destinationId=req.params.destinationId
    if(!destinationId){
      res.status(400).json({message:"please provide valid id"})
    }
    const dataToBeUpdated=req.body
    const updatedDestination=await Destination.findByIdAndUpdate(destinationId,dataToBeUpdated,{
      new: true
    })
   
    if(!updatedDestination){
      res.status(404).json({message:"Sorry cant update this object"})
    }
    res.status(404).json({message:"object updated",updatedDestination})
    
    
  }catch(err){
    res.status(500).json({ error: "Server side error in updating data" });
  }
}
const deleteTravelDestination=async(req,res)=>{
  //ok
  try{
    const destinationId=req.params.destinationId
    if(!destinationId){
      res.status(400).json({message:"please provide valid id"})
    }
    const deletedData=await Destination.findByIdAndDelete(destinationId)
    if(!deletedData){
      res.status(404).json({message:"unable to delete the object"})
    }
    res.status(200).json({message:"Deleteddata",deletedData})
    
  }catch(err){
    res.status(500).json({ error: "Server side error in deleting data" });
  }
}
const filterDestinationsByRating=async(req,res)=>{
  //ok
  try{
    const minRating=parseFloat(req.params.minRating)
    const destinations=await Destination.find({})
    const filtereddestinations=destinations.filter((el)=>el.rating >=minRating )
    if(filtereddestinations.length===0){
       res.status(404).json({message:"sorry we dont have destinations currently for giving ratings"})
    }
     res.status(200).json({message:`Destinations >= ${minRating} are:`,filtereddestinations})
    
  }catch(err){
    res.status(500).json({ error: "Server side error in getting data above ratings " });
  }
}
const addReview=async(req,res)=>{
  //ok
  try{
    const destinationId=req.params.destinationId
    if(!destinationId){
      res.status(400).json({message:"provide correct id"})
    }
    const reviewData=req.body
    const destination=await Destination.findById(destinationId)
    if(!destination){
      res.status(404).json({message:"destination not found for adding review"})
    }
    destination.reviews.push(reviewData)
    const updatedDestination=await destination.save()
    res.status(200).json({message:"savedreview",updatedDestination})
    
  
    
  }catch(err){
    res.status(500).json({ error: "Server side error in adding reviews " });
  }
}

const getDestinationReviewsWithUserDetails=async(req,res)=>{
  //ok
  try{
    const destinationId=req.params.destinationId
    if(!destinationId){
      res.status(400).json({message:"provide correct id"})
    }
    const destination=await Destination.findById(destinationId)
    if(!destination){
      res.status(404).json({message:"Destination not found so cant get you reviews"})
    }
    const destinationReviews=destination.reviews
    res.status(200).json({message:`All reviews for ${destination.name} are:`,destinationReviews})
  }catch(err){
    res.status(500).json({ error: "Server side error in retriving reviews " });
  }
}







module.exports={
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
}