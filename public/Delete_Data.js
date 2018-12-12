var FoodModel = require('./test_DB.js');

//delete data in DB module
var DeleteDate =  function(id) {

    return new Promise(FoodModel.findByIdAndRemove(id, (err)=> {
        if (!err)
            resolve("deleted success" );
        else
        resolve(resolve) ;
        
    }))
}
module.exports = DeleteDate;