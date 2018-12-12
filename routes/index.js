var express = require('express');
var router = express.Router();
var createDate = require('../public/Create_Data.js');
var findData = require('../public/Find_Data.js');
var check_expired = require('../public/Check_Isexpired.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'layout' });
});
/* GET show page. */
router.get('/show', async function(req, res, next) {
    await check_expired();
    var Data = await findData();
    
    console.log("Data")
   
    console.log(Data)
    console.log("Data")
    res.render('show', {
      buyFoodDate       :Data[0],
      expiredDate       :Data[1],
      Isexpired         :Data[2], 
      bestBeforeDate    :Data[3], 
      length            :Data[4],
      food_name         :Data[5],
      Food_type         :Data[6],
      id                :Data[7],
    });
})
  
/* GET input page. */
router.get('/test', function(req, res, next) {
  res.render('input', { title: 'input' });
});


/* GET input sucess  page. */
router.get('/inputed', async function(req, res, next) {
  let Food_Name = req.query.Food_Name;
  let Buy_Date = req.query.Buy_Date;
  let Expired_date = req.query.Expired_date;
  let best_before_date = req.query.best_before_date;
  let Food_type = req.query.Food_type;
  /*option='Meat'
            |                       
            option='Seafood'
            |                       
            option='Egg'
            |                        
            option='Dairy'
            |                        
            option='Fruits'
            |                        
            option='Vegetables'
            |                       
            option='Drinks'*/
  if (Food_Name == "Seafood" ||Food_Name == "Meat")
  {
    var Alert_day = '3';
  }else if(Food_Name == "Dairy"||Food_Name == "Vegetables" )
  {
    var Alert_day = '5';
  }else if(Food_Name == "Fruits" )
  {
    var Alert_day = '10';
  }else if(Food_Name == "Drinks" )
  {
    var Alert_day = '30';
  }
  //let Alert_day = req.query.Alert_time;
  var o = await createDate(Alert_day,Food_Name,Buy_Date, Expired_date, best_before_date, Food_type );
  console.log("00");
  console.log(o);
  res.render('input_success');
});

/* GET delete page. */
router.get('/delete', async function(req, res, next) {
  let id = req.query.id
  var iddel = await DeleteDate(id)
  res.render('input', { title: 'input' });
});

/* GET update page. */
router.get('/update', function(req, res, next) {
  res.render('input', { title: 'input' });
});

module.exports = router;
