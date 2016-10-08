

const Hapi = require('hapi');
const { get, create, update } = require('./api');

const server = new Hapi.Server();


server.connection({ port: 3000 });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/resources/{path*}',
        handler: { directory: { path: './public/resources' } }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./public/index.html');
        }
    });

    //api
    server.route({
      method: 'GET',
      path: '/schedule',
      handler: get
    });

    server.route({
      method: 'POST',
      path: '/schedule',
      handler: create
    });

    server.route({
      method: 'POST',
      path: '/schedule/{pos}',
      handler: update
    });



  server.start((err) => {
      if (err) {
          throw err;
      }
      console.log(`Server running at: ${server.info.uri}`);
  });    
});


