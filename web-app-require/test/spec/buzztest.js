/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl: '../app/scripts',
        nodeRequire:require
    });


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

                assert.equal('', mod.buzz(1));
                assert.equal('', mod.buzz(2));
                assert.equal('', mod.buzz(3));
                assert.equal('', mod.buzz(4));
                assert.equal('Buzz', mod.buzz(5));
                assert.equal('', mod.buzz(6));
                assert.equal('Buzz', mod.buzz(15));


            });

        });

    });

})();