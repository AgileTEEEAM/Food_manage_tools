
var expect = require('chai').expect;
var convert_existing_date = require('../public/Convert_Date_format');
describe('Save records to DB', function() {
    this.timeout(0);
    
    it('Testing the fomate Data programme',  function(){
        FirstCase =  convert_existing_date("Saturday 12 01 2018");
        SecondCase =  convert_existing_date("Sunday 12 10 2018");
        ThirdCase =  convert_existing_date("Sunday 12 31 2018");

        expect(FirstCase[1]).to.equal('12');
        expect(FirstCase[2]).to.equal('01');
        expect(FirstCase[3]).to.equal('2018');
        expect(FirstCase[0]).to.equal('Saturday');

        expect(SecondCase[1]).to.equal('12');
        expect(SecondCase[2]).to.equal('10');
        expect(SecondCase[3]).to.equal('2018');
        expect(SecondCase[0]).to.equal('Sunday');

        expect(ThirdCase[1]).to.equal('12');
        expect(ThirdCase[2]).to.equal('31');
        expect(ThirdCase[3]).to.equal('2018');
        expect(ThirdCase[0]).to.equal('Sunday');
        setTimeout((function() {  
            return process.kill(process.pid);
        }), 5000);
})});
