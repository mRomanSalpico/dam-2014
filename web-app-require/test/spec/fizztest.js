/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl: '../app/scripts',
        nodeRequire:require
    });


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

                assert.equal('', mod.fizz(1));
                assert.equal('', mod.fizz(2));
                assert.equal('Fizz', mod.fizz(3));
                assert.equal('', mod.fizz(4));
                assert.equal('', mod.fizz(5));
                assert.equal('Fizz', mod.fizz(6));
                assert.equal('Fizz', mod.fizz(15));


            });

        });

    });

})();