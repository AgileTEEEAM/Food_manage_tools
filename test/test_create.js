//Describe tests
var mocha = require('mocha');
var assert = require('assert');
var FoodModel = require('../routes/index.js');

describe('Save records to DB', function() {
    this.timeout(0);
    // Save records
    it('Save foods', function(done){
        var food = new FoodModel ({
            Food_Name: 'Apple',
            Buy_Date: 'Monday',
            Expired_date:'Friday',
            best_before_date: 'Thursday',
            Food_type: 'Fruits'
        });
        food.save().then(function () {
            assert(food.isNew === false);
        });
        done();
    });
});