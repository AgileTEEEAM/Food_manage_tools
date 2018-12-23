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

/* GET delete page. */
router.get('/delete', async function(req, res, next) {
  let id = req.query.id
  var iddel = await DeleteDate(id)
  res.render('delete_success',);
});



/* GET update page. */
router.get('/update', async function(req, res, next) {
  
  var Data = await findData(req.query.id)
  console.log( Data[0][0][1])
  
  res.render('update', {
    buyFoodDate_month : Data[0][0][1],
    buyFoodDate_day : Data[0][0][2],
    buyFoodDate_year: Data[0][0][3],
    expiredDate_month : Data[1][0][1],
    expiredDate_day : Data[1][0][2],
    expiredDate_year : Data[1][0][3],
    bestBeforeDate_month : Data[3][0][1],
    bestBeforeDate_day : Data[3][0][2],
    bestBeforeDate_year : Data[3][0][3],
    buyFoodDate       :Data[0],
    expiredDate       :Data[1],
    Isexpired         :Data[2], 
    bestBeforeDate    :Data[3], 
    length            :Data[4],
    food_name         :Data[5][0],
    Food_type         :Data[6][0][0],
    id                :Data[7][0],
    Isexpire_soon     :Data[8],
    Has_veriable      :Data[9],
  });
});

/* GET updated page. */
router.get('/updated', async function(req, res, next) {
  console.log(req.query.id)
  await DeleteDate(req.query.id)  
  let Food_Name = req.query.Food_Name;
  let Buy_Date = req.query.Buy_Date;
  let Expired_date = req.query.Expired_date;
  let best_before_date = req.query.best_before_date;
  let Food_type = req.query.Food_type;
  
  await createDate(Food_Name,Buy_Date, Expired_date, best_before_date, Food_type );

  res.render('updata_success', );
});

module.exports = router;
