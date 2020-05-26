var {expect, assert} = require('chai')
var {add} = require('./functions')

describe('import', function(){
    it('should import file for test', function(){
        expect(add(2,3)).to.equal(5)
    })
})