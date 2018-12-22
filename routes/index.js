var express = require('express');
var router = express.Router();
var createDate = require('../public/Create_Data.js');
var findData = require('../public/Find_Data.js');
var check_expired = require('../public/Check_Isexpired6.js');
var Check_expire_soon = require('../public/Check_expire_soon.js');
var DeleteDate = require('../public/Delete_Data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'layout' });
});
/* GET show page. */
router.get('/show', async function(req, res, next) {
    await check_expired();
    await Check_expire_soon();
    var Data = await findData();
    var Has_veriable1 = false;
    for (i = 0; i < Data.length; i++) 
    {
      var mon = Data[2]
      console.log(Data)
      if (mon[i] == true)
      {
        Has_veriable1 = true;
      }
    } 
   
    res.render('show', {
      buyFoodDate       :Data[0],
      expiredDate       :Data[1],
      Isexpired         :Data[2], 
      bestBeforeDate    :Data[3], 
      length            :Data[4],
      food_name         :Data[5],
      Food_type         :Data[6],
      id                :Data[7],
      Isexpire_soon     :Data[8],
      Has_veriable      :Has_veriable1,
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
  
  var o = await createDate(Food_Name,Buy_Date, Expired_date, best_before_date, Food_type );
  res.render('input_success');
});


module.exports = router;
