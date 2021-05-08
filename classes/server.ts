import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

const whitelist = ['http://localhost:4201','http://localhost:4200'];

// Class Server
export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;
    
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        // this.io = this.httpServer
        this.io = (socketIO as any)(this.httpServer,
            {
                cors: {
                    origin: whitelist, 
                    methods: ["GET", "POST"],
                    credentials: true
                }
            });
        this.escucharSockets();
    }

    public static get instance() {
        return this,this._instance || (this._instance = new this());
    }

    // Escuchar sockets
    private escucharSockets() {
        console.log('Escuchando conexiones');

        this.io.on('connection', cliente => {     
            
            // Conectar cliente
            socket.conectarCliente(cliente, this.io);
            
            // Configurar usuario
            socket.configurarUsuario(cliente, this.io);

            // Obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io);
        
            // Desconexion de cliente
            socket.desconectar(cliente, this.io);

            // Escuchar mensajes
            socket.mensaje(cliente, this.io);



        });

    }

    // Server Up
    start(callbak: any) {
        this.httpServer.listen(this.port, callbak);
    }

}