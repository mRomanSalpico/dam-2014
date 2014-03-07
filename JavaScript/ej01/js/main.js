(function(){
    "use strict";

    var meses = ["Enero", "Febrero"];
    meses.push("Marzo");
    meses.push("Abril");
    meses.push("Mayo");
    meses.push("Junio");
    meses.push("Julio");
    meses.push("Agosto");
    meses.push("Septiembre");
    meses.push("Octubre");
    meses.push("Noviembre");
    meses.push("Diciembre");

    console.log(meses);
    for (var i = meses.length - 1; i >= 0; i--) {
        console.log(meses[i]);
    };

})();