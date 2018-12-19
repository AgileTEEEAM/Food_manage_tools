//
var chai = require('chai');
var createData = require('../public/Create_Data.js');
var expect = chai.expect;
var expireSoon = require('../public/Check_expire_soon');
var DB = require('../public/test_DB');

//Gen a string of current system time
var curTime = new Date();
var curTimeToNum = curTime.getTime();

//get the date near current time
var OneDayAfter = new Date(curTimeToNum-86400000);
var TwoDayB4 = new Date(curTimeToNum+(86400000*2));
var FiveDayB4 = new Date(curTimeToNum+(86400000*5));
var Twenty8DayB4 = new Date(curTimeToNum+(86400000*28));

//Change to format yyyy-mm-dd
var Expired = OneDayAfter.toLocaleDateString();
var NearExpire = TwoDayB4.toLocaleDateString();
var NotExpire = FiveDayB4.toLocaleDateString();
var Twenty8Day = Twenty8DayB4.toLocaleDateString();

//Create record
createData('MeatExpired', '2018-12-01', Expired, Expired, 'Meat');
createData('MeatNearExpire', '2018-12-01', NearExpire, NearExpire, 'Meat');
createData('MeatNotExpire', '2018-12-01', NotExpire, NotExpire, 'Meat');

createData('SeaFoodNearExpire', '2018-12-01', NearExpire, NearExpire, 'Seafood');
createData('VegNearExpire', '2018-12-01', NearExpire, NearExpire, 'Vegetables');
createData('DairyNearExpire', '2018-12-01', NearExpire, NearExpire, 'Dairy');
createData('FruitsNearExpire', '2018-12-01', Twenty8Day, Twenty8Day, 'Fruits');
createData('DrinksNearExpire', '2018-12-01', Twenty8Day, Twenty8Day, 'Drinks');

describe('Test the check expiry day function', function() {
    this.timeout(0);
    it("Check the expired status ", async function(){
        await expireSoon();

        var data1 = await DB.findOne({ Food_Name: 'MeatExpired' });
        console.log('Status of food that expired yesterday is '+data1.Isexpire_soon);
        
        var data2 = await DB.findOne({ Food_Name: 'MeatNearExpire' });
        console.log('Status of food that will expire 2 days later is '+ data2.Isexpire_soon);

        var data3 = await DB.findOne({ Food_Name: 'MeatNotExpire' });
        console.log('Status of food that will expire 5 days later is '+ data3.Isexpire_soon);

        var data4 = await DB.findOne({ Food_Name: 'SeaFoodNearExpire' });
        console.log('Status of Sea Food that will expire 2 days later is '+ data4.Isexpire_soon);

        var data5 = await DB.findOne({ Food_Name: 'VegNearExpire' });
        console.log('Status of Vegetable that will expire 2 days later is '+ data5.Isexpire_soon);

        var data6 = await DB.findOne({ Food_Name: 'DairyNearExpire' });
        console.log('Status of Dairy that will expire 2 days later is '+ data6.Isexpire_soon);

        var data7 = await DB.findOne({ Food_Name: 'FruitsNearExpire' });
        console.log('Status of Fruits that will expire 28 days later is '+ data7.Isexpire_soon);

        var data8 = await DB.findOne({ Food_Name: 'DrinksNearExpire' });
        console.log('Status of Drinks that will expire 28 days later is '+ data8.Isexpire_soon);

        await expect(data1.Isexpire_soon).to.equal('OVER');
        await expect(data2.Isexpire_soon).to.equal('true');
        await expect(data3.Isexpire_soon).to.equal('false');
        
        await expect(data4.Isexpire_soon).to.equal('true');
        await expect(data5.Isexpire_soon).to.equal('true');
        await expect(data6.Isexpire_soon).to.equal('true');
        await expect(data7.Isexpire_soon).to.equal('false');
        await expect(data8.Isexpire_soon).to.equal('true');

    })
})