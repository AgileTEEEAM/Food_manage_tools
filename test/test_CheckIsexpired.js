//
//var check_Isexpired = require('../public/Check_Isexpired');
var chai = require('chai');
var createData = require('../public/Create_Data.js');
var expect = chai.expect;
var checkExpired = require('../public/Check_Isexpired');
var DB = require('../public/test_DB');

//Gen a string of current system time
var curTime = new Date();
var curTimeToNum = curTime.getTime();

//get the date near current time
var previousDay = new Date(curTimeToNum-86400000);
var nextDay = new Date(curTimeToNum+86400000);

//Change to format yyyy-mm-dd
var preDayString = previousDay.toLocaleDateString();
var nextDayString = nextDay.toLocaleDateString();

//Create record
createData("10",'PreviousDay', '2018-12-01', preDayString, preDayString, 'TestObject');
createData("10",'NextDay', '2018-12-01', nextDayString, nextDayString, 'TestObject');

describe('Test the check expiry day function', function() {
    this.timeout(0);
    it("Check the expired status ", async function(){
        await checkExpired();
        var data1 = await DB.findOne({ Food_Name: 'PreviousDay' });
        console.log('Status of food that expired yesterday is '+data1.Isexpired);
        
        var data2 = await DB.findOne({ Food_Name: 'NextDay' });
        console.log('Status of food that will expire tommorrow is '+ data2.Isexpired);

        expect(data1.Isexpired).to.equal(true);
        expect(data2.Isexpired).to.equal(false);

    })
})