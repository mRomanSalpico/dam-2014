/* global describe, it */
require.config({
    baseUrl: '../app/scripts',
    nodeRequire:require
});

(function () {
    'use strict';

    //  tests.js


    describe('FizzTest',function(){
        var mod;

        beforeEach(function(done){

            require(['Fizz'], function(Fizz){

                mod =   Fizz;

                done();
            });

        });

        describe('Test  methods',   function    ()  {

            it('Should  return  1', function    ()  {

                assert.equal(false, mod.fizz(1));
                assert.equal(false, mod.fizz(2));
                assert.equal(true, mod.fizz(3));
                assert.equal(false, mod.fizz(4));
                assert.equal(false, mod.fizz(5));
                assert.equal(true, mod.fizz(6));
                assert.equal(true, mod.fizz(15));


            });

        });

    });

})();