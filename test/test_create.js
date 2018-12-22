//Describe tests
var chai = require('chai');
var createDate = require('../public/Create_Data.js');
var expect = chai.expect;
describe('Save records to DB', function() {
    this.timeout(0);
    // Save records
    it('Save foods', async function(){
        const o = await createDate("TestingCreate","1997-11-01", "19971-11-01", "1997-11-01", "Meat" );
        expect(o).to.equal('create success');
})});

