//Describe tests
var findData = require('../public/Find_Data.js');
var expect = require('chai').expect;
var createDate = require('../public/Create_Data.js');

before(function () {
    createDate("TestingCreate","1997-11-01", "19971-11-01", "1997-11-01", "Meat" );
});

// Create a food that ready for Read
describe('Read a Record', function() {
    this.timeout(0);
    it("find testing", async function(){ 
        const o = await findData();
        expect(o).to.not.be.null;
    });
});