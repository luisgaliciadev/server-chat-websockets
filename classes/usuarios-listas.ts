import { Usuario } from './usuario';
const fs = require('fs');

export class UsuariosLista {
    private lista: Usuario[] = [];
    
    constructor() {}

    // Agregar un usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        let jsonDataString = JSON.stringify(this.lista);
        fs.writeFileSync('./data/listClients.json', jsonDataString); 
        return usuario
    }

    public actulizarNombre(id:string, nombre: string) {
        for(let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando usuario.............');
        console.log(this.lista);
        let jsonDataString = JSON.stringify(this.lista);
        fs.writeFileSync('./data/listClients.json', jsonDataString); 
    }

    // Obtener lista de usuarios
    public getLista() {

        return this.lista.filter(usuario => usuario.nombre !== 'no definido');
    }

    // Obtener usuario
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener usuario de una sala
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // Borrar un usuario
    public borrarUsuario(id: string) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {return usuario.id !== id});
        let jsonDataString = JSON.stringify(this.lista);
        fs.writeFileSync('./data/listClients.json', jsonDataString); 
        return tempUser;
    }

    public getData() {
        // const clients = require('./data/listClients.json');
        const clients = fs.readFileSync('./data/listClients.json',
              {encoding:'utf8', flag:'r'});
        return clients
    }
}