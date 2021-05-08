import Server from "./classes/server";
import { SERVER_PORT } from "./global/environment";
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;
// BodyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({origin: '*', credentials: true}));

// server.app.use(cors({origin: 'http://localhost:5000', 
//                     credentials: true,
//                     methods: ["GET", "POST"]}));
// CORS
server.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header( "Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS ");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'false');
    res.header('Content-Type', 'text/plain');
    next();
});

server.app.use('/', router)

server.start( ()=> {
    console.log(`Server online en el puerto ${SERVER_PORT}`);
});


