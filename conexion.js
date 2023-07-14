var Sequelize = require("sequelize");
var usuarioModelo = require("./modelos/usuarios")
require("dotenv").config();

var db = process.env.DB_MYSQL;
var usuario = process.env.USUARIO_MYSQL;
var password = process.env.PASSWORD_MYSQL;
var host = process.env.HOST_MYSQL;
var port = process.env.PORT_MYSQL;

var conexion = new Sequelize(db,usuario,password,{
    host:host,
    port:port,
    dialect: 'mysql',
    dialectOptions:{

        ssl:{

            rejectUnathorized:true
        }

    }

});

conexion.sync({force:false})

.then(()=>{
console.log("Conectado a MYSQL de planetScale");

})

.catch((err)=>{
        console.log("Error al conectarse a MYSQL de planetScale"+err);
        console.log("Intentar una conexion local");

db = process.env.DB_MYSQL_LOCAL;
usuario = process.env.USUARIO_MYSQL_LOCAL;
password = process.env.PASSWORD_MYSQL_LOCAL;
host = process.env.HOST_MYSQL_LOCAL;
port = process.env.PORT_MYSQL_LOCAL;

conexion = new Sequelize(db,usuario,password,{
    host:host,
    port:port,
    dialect: 'mysql'
});

conexion.sync({force:false})

.then(()=>{
    console.log("Conectarse a MYSQL local");

})

.catch((err)=>{
    console.log("Error al conmectarse a MYSQL local");
});

});

var Usuario = usuarioModelo(conexion);

 module.exports = {
    Usuario:Usuario
 }