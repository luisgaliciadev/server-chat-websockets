"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuarioConectado = void 0;
var usuarios_listas_1 = require("../classes/usuarios-listas");
var usuario_1 = require("../classes/usuario");
exports.usuarioConectado = new usuarios_listas_1.UsuariosLista;
var conectarCliente = function (cliente, io) {
    var usuario = new usuario_1.Usuario(cliente.id);
    exports.usuarioConectado.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
// Clientes descontedados
var desconectar = function (cliente, io) {
    cliente.on('disconnect', function () {
        console.log('Cliente desconectado');
        exports.usuarioConectado.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuarioConectado.getLista());
    });
};
exports.desconectar = desconectar;
// Escuchar mensajes
var mensaje = function (cliente, io) {
    cliente.on('mensaje', function (payload) {
        console.log('Mensaje recibido: ', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
// Configurar usuario
var configurarUsuario = function (cliente, io) {
    cliente.on('configurar-usuario', function (payload, callback) {
        exports.usuarioConectado.actulizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuarioConectado.getLista());
        callback({
            ok: true,
            mensaje: "Usuario " + payload.nombre + " configurado."
        });
    });
};
exports.configurarUsuario = configurarUsuario;
// Obtener usuarios
var obtenerUsuarios = function (cliente, io) {
    cliente.on('obtener-usuarios', function () {
        io.to(cliente.id).emit('usuarios-activos', exports.usuarioConectado.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
