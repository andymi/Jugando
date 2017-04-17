var sql = require('mysql');
var config = {
    "user": "root",
    "password": "",
    "database": "bonanza",
    "port": "3306",
    "host": "localhost"
}

function beforeRender(done) {
    sql.connect(config).then(function() {
        var req = new sql.Request();
        return req.query('select count(*) as Count, raza  from Animal, Raza where animal.RazaIdRaza=raza.idRaza group by raza').then(function(recordset) {
            request.data = { animal: recordset };
            done();
        });
    }).catch(done);
}