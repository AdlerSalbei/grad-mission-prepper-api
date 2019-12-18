const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');

const app = express();
app.use(bodyParser.json());
app.set('json spaces', 4);

// set Access-Control-Allow Headers
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', config['Access-Allow-Origin']);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, POST, DELETE, CONNECT, OPTIONS, TRACE, PATCH');
    next();
});

require('./src/routes/prepper.js')(app);

app.listen(config.port, () => console.log(`
    App listening on port ${config.port}
    Full URI: https://localhost:${config.port}/
`));