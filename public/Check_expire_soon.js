var FoodModel = require('./test_DB');


var Check_expire_soon = function(){
    
var convert_existing_date = function(time = null)
{
    if (time == null)
    {
        var time1 = new Date();
    time = time1.toString().replace(/-/g,':').replace('T',':');
    time = time.split(' ');
    }
    else
    {
    time = time.split(' ');
    }
    
if(time[0]=="Sun")
{
    time[0] = "7";
}
else if (time[0]=="Mon")
{
    time[0] = "1";
}
else if (time[0]=="Tue")
{
    time[0] = "2";
}
else if (time[0]=="Wed")
{
    time[0] = "3";
}
else if (time[0]=="Thu")
{
    time[0] = "4";
}
else if (time[0]=="Fri")
{
    time[0] = "5";
}
else if (time[0]=="Sat")
{
    time[0] = "6";
}
if(time[1]=="Jan")
{
    time[1] = "1";
} 
else if (time[1]=="Feb")
{
    time[1]="2";
}
else if (time[1]=="Mar")
{
    time[1]="3";
}
else if (time[1]=="Apr")
{
    time[1]="4";
}
else if (time[1]=="May")
{
    time[1]="5";
}
else if (time[1]=="Jun")
{
    time[1]="6";
}
else if (time[1]=="Jul")
{
    time[1]="7";
}
else if (time[1]=="Aug")
{
    time[1]="8";
}
else if (time[1]=="Sep")
{
    time[1]="9";
}
else if (time[1]=="Oct")
{
    time[1]="10";
}
else if (time[1]=="Nov")
{
    time[1]="11";
}
else if (time[1]=="Dec")
{
    time[1]="12";
}
return time;
}
// existing time  time[0] = week
//                time[1] = month
//                time[2] = day
//                time[3] = year
var exist = new Date();
return new Promise( function(resolve,reject){
FoodModel.find({ },  function (err, docs) {
    //var i;
   for (i = 0 ;i<docs.length; i++ )
   {    
        var id_num = docs[i]._id ;
       var s = String(docs[i].Expired_date)
       var Expireddata_date = convert_existing_date(s)
       var DataTime = Expireddata_date[3]+'/'+Expireddata_date[1]+'/'+Expireddata_date[2]+" 12:00:00"
       //convert to s
       var ExpiredDataTime = new Date(DataTime);

       
       var time_different = (ExpiredDataTime - exist) / 86400000;
       
        if (time_different <= docs[i].alert && time_different > 0)
        {
            FoodModel.findOneAndUpdate({_id:id_num},{ Isexpire_soon: "true" },{ returnOriginal: false }, function (err, expried_data) {
                
            })
            
        }
        else if  (time_different <= 0 )
        {
            FoodModel.findOneAndUpdate({_id:id_num},{ Isexpire_soon: "OVER" },{ returnOriginal: false }, function (err, expried_data) {
                
            })
            
        }
        else{FoodModel.findOneAndUpdate({_id:id_num},{ Isexpire_soon: "false" },{ returnOriginal: false }, function (err, expried_data) {
            
        })}

        resolve("ok");
   }
   
   

})

}

)
}
Check_expire_soon()
module.exports = Check_expire_soon;
