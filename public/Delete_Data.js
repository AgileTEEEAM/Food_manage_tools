var FoodModel = require('./test_DB.js');

//delete data in DB module
var DeleteDate =  function(id) {
    return new Promise( function(resolve,reject){
    FoodModel.findByIdAndRemove(id, (err)=> {
        if (!err)
            resolve(id);
        else
        resolve("error") ;
        
    })})
}
module.exports = DeleteDate;