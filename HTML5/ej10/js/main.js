$(function() {


//hacer comprobaciones sobre si se puede usar indexedDB en el navegador
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
if ('webkitIndexedDB' in window) {
window.IDBTransaction = window.webkitIDBTransaction;
window.IDBKeyRange = window.webkitIDBKeyRange;
}

//creamos la base de datos
var request = indexedDB.open('tareas');
request.onerror = function () {
    console.log('failed to open indexedDB');
};
var db = null, version = '0.1';
request.onsuccess = function (event) { //una vez creada la BD hay que crear los objetos de la base de datos
    db = event.target.result;
    if (version != db.version) { // primero controlamos la version
        // set the version to 0.1
        var verRequest = db.setVersion(version);
        verRequest.onsuccess = function (event) { //aquí se crean los objetos de la base de datos
            var store = db.createObjectStore('pendientes', { //se crea un identificador unico autoincrementable
            keyPath: 'identificador',
            autoIncrement: true
            });

            // now we're ready to create the object store!
        };
        verRequest.onerror = function () {
            alert('unable to set the version :' + version);
        };
    }
};

    function addTweet(tweet){
         db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
            var time = (new Date(Date.parse(tweet.created_at))).getTime();
            tx.executeSql('INSERT INTO tweets (id, user, date, text) VALUES (?, ?, ?, ?)',
            [tweet.id, tweet.user, time / 1000, tweet.text]);

            var users  = tx.executeSql('SELECT * FROM users WHERE users.id = ?',
            [tweet.user], function(tx, results) {
                console.log(results);
                            if (results && results.rows.length===0)
                                tx.executeSql('INSERT INTO users (id, nombre, imagen) VALUES (?, ?, ?)',
                                [tweet.user, "usuario desconocido", ""]);

            });


         });

    }

    function addUser(user){
         db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
            tx.executeSql('INSERT INTO users (id, nombre, imagen) VALUES (?, ?, ?)',
            [user.id, user.nombre, user.imagen]);
         });

    }

    function getTweets() {
         var tweets = $.ajax({ url : 'data/tweets.json',
                                dataType: 'json',
                                cache : false,
                                success: function(data, textStatus, jqXHR){
                                    for (var i = 0; i < data.length; i++) {
                                        addTweet(data[i]);
                                    }
                                },
                                error : function(jqXHR, textStatus, errorThrown){
                                    console.log(errorThrown);
                                }
            });
    }

    function getUsers() {
         var tweets = $.ajax({ url : 'data/users.json',
                                dataType: 'json',
                                cache : false,
                                success: function(data, textStatus, jqXHR){
                                    for (var i = 0; i < data.length; i++) {
                                        addUser(data[i]);
                                    }
                                },
                                error : function(jqXHR, textStatus, errorThrown){
                                    console.log(errorThrown);
                                }
            });

    }
    var db = openDatabase('tweetdb', '1.0', 'All my tweets', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        //tx.executeSql('DROP TABLE users', []);
        tx.executeSql('CREATE TABLE IF NOT EXISTS users(id PRIMARY KEY, nombre, imagen)', [], getUsers);
    });

    db.transaction(function (tx) {
        //tx.executeSql('DROP TABLE tweets', []);
        tx.executeSql('CREATE TABLE IF NOT EXISTS tweets(id PRIMARY KEY, user, date, text)', [], getTweets);
    });


    var tweetEl = document.getElementById('tweets');
    $(document).on('click', '#mostrar', function(e){
         db.transaction(function (tx) {
             tx.executeSql('SELECT * FROM tweets inner join users WHERE tweets.user = users.id', [],
             function(tx, results) {
                 var html = [], len = results.rows.length;
                 for (var i = 0; i < len; i++) {
                     html.push('<li> Usuario: ' + results.rows.item(i).nombre +'    --- Texto:  ' + results.rows.item(i).text +'</li>');
                 }
                 tweetEl.innerHTML = html.join('');
             });
         });
    });






});