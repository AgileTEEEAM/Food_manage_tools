var FoodModel = require('./test_DB.js');

//create data in DB module
var CreateDate =  function(Food_Name=null, Buy_Date=null, Expired_date=null,best_before_date=null,Food_type=null ){
  
    // formate the Date
    time1 = Buy_Date.replace(/-/g,':').replace(' ',':');
    time1 = time1.split(':');
    var Buy_Date_dateType = new Date(time1[0],(time1[1]-1),time1[2]);  // convert the Buy_Date of food to Data Type   
  
    time3 = Expired_date.replace(/-/g,':').replace(' ',':');
    time3 = time3.split(':');
    var Expired_date_dateType = new Date(time3[0],(time3[1]-1),time3[2]);// convert the expire_data of food to Data Type   
  
    time2 = best_before_date.replace(/-/g,':').replace(' ',':');
    time2 = time2.split(':');
    var best_before_date_dateType = new Date(time2[0],(time2[1]-1),time2[2]);// convert the best_before_date of food to Data Type   
  
    return new Promise( function(resolve,reject){

         //insert the date to DB
    FoodModel.create({
      Food_Name: Food_Name,
      Buy_Date:Buy_Date_dateType,
      Expired_date:Expired_date_dateType,
      best_before_date:best_before_date_dateType,
      Food_type:Food_type,},
      (err) => {
        if (!err){
            resolve("create success");
        }
        else
        {
            throw err;
        }
    });
    })
   /*
    //verify insert Data
    // if we can find the data : output success  create
    // else output fail create
    return new Promise( function(resolve,reject){
        FoodModel.find({Food_Name:Food_Name,Buy_Date:Buy_Date_dateType,Expired_date:Expired_date_dateType,Food_type:Food_type }," -_id  " ,{limit:1},).lean().exec(function (err, data) {
            
            console.log("000")
            console.log(data)
            console.log("000")
            if(data[0])
            {   
                console.log(data);
                resolve("success create");
            }else
            {
                resolve("fail create ")
            }
      });

  })*/

}  
  module.exports = CreateDate;