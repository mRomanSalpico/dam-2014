/* global describe, it */
require.config({
    baseUrl: '../app/scripts',
    nodeRequire:require
});

(function () {
    'use strict';

    //  tests.js


    describe('Test',function(){
        var mod;

        beforeEach(function(done){

            require(['fizzbuzz'], function(fizzbuzz){

                mod =   fizzbuzz;

                done();
            });

        });

        describe('Test  methods',   function    ()  {

            it('Should  return  1', function    ()  {

                assert.equal(1, mod.fizzbuzz(1));
                assert.equal('1,2', mod.fizzbuzz(2));
                assert.equal('1,2,Fizz', mod.fizzbuzz(3));
                assert.equal('1,2,Fizz,4', mod.fizzbuzz(4));
                assert.equal('1,2,Fizz,4,Buzz', mod.fizzbuzz(5));
                assert.equal('1,2,Fizz,4,Buzz,Fizz', mod.fizzbuzz(6));
                assert.equal('1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz', mod.fizzbuzz(15));


            });

        });

    });

})();