"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var server_1 = __importDefault(require("../classes/server"));
var usuarios_listas_1 = require("../classes/usuarios-listas");
var socket_1 = require("../sockets/socket");
exports.router = express_1.Router();
exports.router.get('/mensajes', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo bien'
    });
});
exports.router.post('/mensajes', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var server = server_1.default.instance;
    var payload = {
        de: de,
        cuerpo: cuerpo
    };
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    });
});
exports.router.post('/mensajes/:id', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var id = req.params.id;
    var payload = {
        de: de,
        cuerpo: cuerpo
    };
    var server = server_1.default.instance;
    console.log(id);
    server.io.in(id).emit('mensaje-privado', payload);
    // server.io.emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});
// Servicios para obtener ids de usuarios
exports.router.get('/usuarios', function (req, res) {
    var server = server_1.default.instance;
    var usuarioConectado = new usuarios_listas_1.UsuariosLista;
    var clients = JSON.parse(usuarioConectado.getData());
    var clientes = [];
    clients.forEach(function (cliente) {
        clientes.push(cliente.id);
    });
    return res.json({
        ok: true,
        clientes: clientes
    });
});
// Obtener usuarios y sus nombres
exports.router.get('/usuarios/detalles', function (req, res) {
    var usuarios = socket_1.usuarioConectado.getLista();
    res.json({
        ok: true,
        clientes: usuarios
    });
});
exports.default = exports.router;
