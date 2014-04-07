this.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'calcular':
            var numero = data.msg;
            //inicia contador temporal
            var start = new Date().getTime();
            // array que almacenará los primos encontrados
            var arrPrimos = [];
            for (i = 1; i <= numero ; i++){
                // todo primo tiene solo 2 divisores
                var divisores = 2;
                // buscamos otros divisores
                for ( j = 2; j<i ; j++){
                    // si encontramos más de dos divisores
                    // no es primo y pasamos a otro posible divisor
                    if (i%j === 0){
                        divisores++;
                        break;
                    }
                }
                // si tiene 2 divisores es primo
                // lo añadimos al array mediante el método push()
                if (divisores == 2){
                    arrPrimos.push(i);
                }
            }
            // finalizamos el contador temporal
            var finish = new Date().getTime();
            var tiempoEmpleado = finish - start;

            this.postMessage({'tiempo': tiempoEmpleado, 'primos': arrPrimos });

            break;

        case 'stop':
            this.postMessage('WORKER STOPPED: '+data.msg+'. (buttons will no longer work)');
            this.close(); // Terminates the worker.
            break;
        default:
            this.postMessage('Unknown command: '+data.msg);
    }
}, false);


