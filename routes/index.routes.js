const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  let filteredArrray;
  Event.find()
  .then(result=>{
    for(i=0;result.length;i++){
      if(result[i].cities===userIputCitiies){
        filteredArrray.push(result[i])
      }
    }
  })
  res.render("index");
});


module.exports = router;
