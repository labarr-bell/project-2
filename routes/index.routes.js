const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



// let filteredArray;
// Event.find()
// .then(result=>{
//   for(i=0;result.length;i++){
//     if(result[i].cities===userIputCitiies){
//       filteredArrray.push(result[i])
//     }
//   }
// })



module.exports = router;
