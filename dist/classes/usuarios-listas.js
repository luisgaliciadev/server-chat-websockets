"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
var fs = require('fs');
var UsuariosLista = /** @class */ (function () {
    function UsuariosLista() {
        this.lista = [];
    }
    // Agregar un usuario
    UsuariosLista.prototype.agregar = function (usuario) {
        this.lista.push(usuario);
        var jsonDataString = JSON.stringify(this.lista);
        fs.writeFileSync('./data/listClients.json', jsonDataString);
        return usuario;
    };
    UsuariosLista.prototype.actulizarNombre = function (id, nombre) {
        for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando usuario.............');
        console.log(this.lista);
        var jsonDataString = JSON.stringify(this.lista);
        fs.writeFileSync('./data/listClients.json', jsonDataString);
    };
    // Obtener lista de usuarios
    UsuariosLista.prototype.getLista = function () {
        return this.lista.filter(function (usuario) { return usuario.nombre !== 'no definido'; });
    };
    // Obtener usuario
    UsuariosLista.prototype.getUsuario = function (id) {
        return this.lista.find(function (usuario) { return usuario.id === id; });
    };
    // Obtener usuario de una sala
    UsuariosLista.prototype.getUsuariosEnSala = function (sala) {
        return this.lista.filter(function (usuario) { return usuario.sala === sala; });
    };
    // Borrar un usuario
    UsuariosLista.prototype.borrarUsuario = function (id) {
        var tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(function (usuario) { return usuario.id !== id; });
        var jsonDataString = JSON.stringify(this.lista);
        fs.writeFileSync('./data/listClients.json', jsonDataString);
        return tempUser;
    };
    UsuariosLista.prototype.getData = function () {
        // const clients = require('./data/listClients.json');
        var clients = fs.readFileSync('./data/listClients.json', { encoding: 'utf8', flag: 'r' });
        return clients;
    };
    return UsuariosLista;
}());
exports.UsuariosLista = UsuariosLista;
