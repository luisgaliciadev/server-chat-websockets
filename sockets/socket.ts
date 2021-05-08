import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-listas';
import { Usuario } from '../classes/usuario';

export const usuarioConectado = new UsuariosLista;

export const conectarCliente = (cliente: Socket, io:socketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuarioConectado.agregar(usuario);
};

// Clientes descontedados
export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioConectado.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuarioConectado.getLista());
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
        console.log('Mensaje recibido: ', payload);

        io.emit('mensaje-nuevo', payload);
    });
}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload, callback: Function)  => {
        usuarioConectado.actulizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuarioConectado.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado.`
        });
    });
}

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', ()  => {
        io.to(cliente.id).emit('usuarios-activos', usuarioConectado.getLista());
    });
}


