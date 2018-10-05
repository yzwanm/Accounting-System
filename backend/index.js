var app = require('./app');

var port = 3000

var server = app.listen(port, () => {
    console.log('listening on port ' + port);
});

function stop() {
    server.close();
}

module.exports = server;
module.exports.stop = stop;
