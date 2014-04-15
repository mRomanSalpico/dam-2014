/* global describe, it */


(function () {
    'use strict';

    //  tests.js
    require.config({
        baseUrl: '../app/scripts',
        nodeRequire:require
    });

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

                assert.equal('', mod.fizzbuzz());
                assert.equal('', mod.fizzbuzz('hola'));
                assert.equal(1, mod.fizzbuzz(1));
                assert.equal('1,2', mod.fizzbuzz(2));
                assert.equal('1,2,Fizz', mod.fizzbuzz(3));
                assert.equal('1,2,Fizz,4', mod.fizzbuzz(4));
                assert.equal('1,2,Fizz,4,Buzz', mod.fizzbuzz(5));
                assert.equal('1,2,Fizz,4,Buzz,Fizz', mod.fizzbuzz(6));
                console.log(mod.fizzbuzz(15));
                assert.equal('1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz', mod.fizzbuzz(15));


            });

        });

    });

})();