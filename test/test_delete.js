//Describe tests
var chai = require('chai');
var expect = chai.expect;
var createData = require('../public/Create_Data.js');
var deleteData = require('../public/Delete_Data.js');
var DB = require('../public/test_DB');

//Create testing record
createData("TestDelete","1997-11-01", "1997-11-01", "1997-11-01", "Meat");



describe('Test function of Deleting Data', function() {
    this.timeout(0);
    // Save records
    it('Delete data by ID', async function(){
        var data = await DB.findOne({Food_Name: 'TestDelete'});
        const o = await deleteData(data._id);
        const b = await deleteData("abdefg");
        expect(o).to.equal(data._id);
        expect(b).to.equal("error");

        //fail Test
        //expect(o).to.equal('Should be fail the test');
})});

