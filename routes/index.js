var express = require('express');
var router = express.Router();
let url = require('url');
let mongooes = require("mongoose");
var app = express();

mongooes.connect('mongodb://localhost/FoodDB');// { useNewUrlParser: true }
let db = mongooes.connection;

db.on('error', ()=>{
    console.log('error connect')
  });
db.once("open", function(){
    console.log('connected')
  })
  
db.once("close", function(){
    console.log('disconnected')
  })
  
let Schema = mongooes.Schema;
let foodSchema = new Schema({
    Food_Name: String,
    Buy_Date:Date,
    Expired_date:Date,
    best_before_date: Date,
    Food_type : String,
    Isexpired :{type: Boolean,
      default: false},
  })
  
  
let FoodModel = mongooes.model('data_set', foodSchema)
  


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'layout' });
});
/* GET show page. */
router.get('/show', function(req, res, next) {
  FoodModel.find({},"-_id",{}).then((result)=>{
    var list = {};
    var food = [];
    var expire = [];
    var buyFoodDate = [];
    var bestBeforeDate = [];
    var FoodType = [];
    var expiredDate = [];
    for (var i = 0; i < result.length ; i++)
    {
      // extract the food name from the database
      food.push(result[i].Food_Name);
      // extract the Buy_Date of those food from the database
      buyFoodDate.push(result[i].Buy_Date);
      // extract the expiredDate of those food from the database
      expiredDate.push(result[i].Expired_date);
      // extract the best_before_date of those food from the database
      bestBeforeDate.push(result[i].Expired_date);
      // extract the Food_type of those food from the database
      FoodType.push(result[i].Food_type);
      // extract the Isexpired of those food from the database
      expire.push(result[i].Isexpired);
    }
    list['food_name'] = food;
    list['Isexpired'] = expire;
    list['Buy_Date'] = buyFoodDate;
    list['expiredDate'] = expiredDate;
    list['Expired_date'] = bestBeforeDate;
    list['Food_type'] = FoodType; 
    console.log(list);
    res.render('show', { list });})
  
  
});
/* GET input page. */

router.get('/test', function(req, res, next) {
  res.render('input', { title: 'input' });
});

//Find data in DB module
var FindDate = function(){
  var list = {};
  var find = FoodModel.find({},"-_id",{}).then((list)=>{
  

  return list;})
}


//create data in DB module
var createDate = function(Food_Name, Buy_Date, Expired_date,best_before_date,Food_type ){
  
  time1 = Buy_Date.replace(/-/g,':').replace(' ',':');
  time1 = time1.split(':');
  var Buy_Date_dateType = new Date(time1[0],(time1[1]-1),time1[2]);  // convert the Buy_Date of food to Data Type   

  time3 = Expired_date.replace(/-/g,':').replace(' ',':');
  time3 = time3.split(':');
  var Expired_date_dateType = new Date(time3[0],(time3[1]-1),time3[2]);// convert the expire_data of food to Data Type   

  time2 = best_before_date.replace(/-/g,':').replace(' ',':');
  time2 = time2.split(':');
  var best_before_date_dateType = new Date(time2[0],(time2[1]-1),time2[2]);// convert the best_before_date of food to Data Type   


  FoodModel.create({
    Food_Name: Food_Name,
    Buy_Date:Buy_Date_dateType,
    Expired_date:Expired_date_dateType,
    best_before_date:best_before_date_dateType,
    Food_type:Food_type,},
    (err) => {
      if (!err){
          console.log("create success");
      }
      else
      {
          throw err;
      }
  });
}

router.get('/inputed', function(req, res, next) {
  let Food_Name = req.query.Food_Name;
  let Buy_Date = req.query.Buy_Date;
  let Expired_date = req.query.Expired_date;
  let best_before_date = req.query.best_before_date;
  let Food_type = req.query.Food_type;
  createDate(Food_Name,Buy_Date, Expired_date, best_before_date, Food_type );
  res.render('input_success');
});



module.exports = router;
