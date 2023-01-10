const { io } = require('../index');
const {scan} = require('../controllers/puppeteerController')


// Mensajes de Sockets
/* client es un dispositivo que se acanba de conectar a mi socket server */
/* io es todo el servidor, todos los clientes conectador */
io.on('connection', client => {
    console.log('Cliente conectado');
    client.join('BLOCKER');
    scan().then((results)=>{
        io.emit('scan',{
            results
        })
    });
    
    client.on('toggle', (payload)=>{
        console.log(payload.id);

        if(payload.id >= 2) {
            io.emit('requestResponse', {
                status: false,
                id: Number.parseInt(payload.id),
                toggle: payload.toggle
            })

            return;
        }

        // run(payload.id, payload.toggle).then((result)=>{
        //     if(result){
        //         console.log('SUCCESSFULLY TOGLED ID: ' + payload.id + ' to ' + (payload.toggle ? 'BLOCKED ' : 'UNBLOCKED'));
                
        //     }else{
        //         console.log('ERROR');
        //     }

        //     io.emit('requestResponse', {
        //         status: result,
        //         id: Number.parseInt(payload.id),
        //         toggle: !payload.toggle
        //     })
        // })
    });

    client.on('mensaje', ( payload ) => {
        console.log(payload);
        io.emit('mensaje', { admin: 'Hola desde el servidor'})
    });

    // Callback que se ejecuta cuando el client se desconecta
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
})

requestResponse = (result, id, toggle)=>{
    msg = result ? 'The device has been '+ (toggle? 'unblocked' : 'blocked') + '.' : 'Something went wrong...';
    io.to('BLOCKER').emit('requestResponse', {
        msg,
        results: result,
        id: Number.parseInt(id),
        toggle: toggle
    });
}

// requestResponse = (result, id, toggle)=>{
//     msg = result ? 'The device has been '+ (toggle? 'unblocked' : 'blocked') + '.' : 'Something went wrong...';
//     io.to('BLOCKER').emit('requestResponse', {
//         msg,
//         status: result,
//         id: Number.parseInt(id),
//         toggle: toggle
//     });
// }

module.exports = {
    requestResponse
}