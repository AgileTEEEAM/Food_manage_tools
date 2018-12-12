var FoodModel = require('./test_DB.js');
var convert_existing_date = require('./Convert_Date_format.js');


//Find data in DB module
var FindDate =  function(){
    return new Promise(function(resolve,reject){
        FoodModel.find({},"",{},).then((result)=>{
            var id = [];
            var food = [];
            var expire = [];
            var buyFoodDate = [];
            var bestBeforeDate = [];
            var FoodType = [];
            var expiredDate = [];
            for (var i = 0; i < result.length ; i++)
            {
              id.push(result[i]._id);
              // extract the food name from the database
              food.push(result[i].Food_Name);
              // extract the Buy_Date of those food from the database
              var BFD = convert_existing_date(result[i].Buy_Date)
              buyFoodDate.push(BFD);
              // extract the expiredDate of those food from the database
              var ED = convert_existing_date(result[i].Expired_date)
              expiredDate.push(ED);
              // extract the best_before_date of those food from the database
              var BBD = convert_existing_date(result[i].best_before_date)
              bestBeforeDate.push(BBD);
              // extract the Food_type of those food from the database
              var FT = convert_existing_date(result[i].Food_type)
              FoodType.push(FT);
              // extract the Isexpired of those food from the database
              expire.push(result[i].Isexpired); 
            }
            resolve ([buyFoodDate,expiredDate,expire,bestBeforeDate,result.length,food,FoodType,id]);
            })
      })
  }
  module.exports = FindDate;