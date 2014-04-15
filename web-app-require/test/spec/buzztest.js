/* global describe, it */
require.config({
    baseUrl: '../app/scripts',
    nodeRequire:require
});

(function () {
    'use strict';

    //  tests.js


    describe('BuzzTest',function(){
        var mod;

        beforeEach(function(done){

            require(['Buzz'], function(Buzz){

                mod =   Buzz;

                done();
            });

        });

        describe('Test  methods',   function    ()  {

            it('Should  return  1', function    ()  {

                assert.equal(false, mod.buzz(1));
                assert.equal(false, mod.buzz(2));
                assert.equal(false, mod.buzz(3));
                assert.equal(false, mod.buzz(4));
                assert.equal(true, mod.buzz(5));
                assert.equal(false, mod.buzz(6));
                assert.equal(true, mod.buzz(15));


            });

        });

    });

})();