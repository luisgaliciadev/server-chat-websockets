import {Router, Request, Response} from 'express' ;
import Server from '../classes/server';
import { UsuariosLista } from '../classes/usuarios-listas';
import { usuarioConectado } from '../sockets/socket';
export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo bien'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    };
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    
    const payload = {
        de,
        cuerpo
    };
    const server = Server.instance;
    console.log(id)
    server.io.in(id).emit('mensaje-privado', payload);
    // server.io.emit('mensaje-privado', payload);
    
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

// Servicios para obtener ids de usuarios
router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;
    const usuarioConectado = new UsuariosLista;
    let clients = JSON.parse(usuarioConectado.getData());
    let clientes: any = [];
    clients.forEach((cliente: any) => {
        clientes.push(cliente.id)
    });
    return res.json({
        ok: true,
        clientes
    });
   
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalles', (req: Request, res: Response) => {
    const usuarios = usuarioConectado.getLista();
    res.json({
        ok: true,
        clientes: usuarios
    });
   
});

export default router;