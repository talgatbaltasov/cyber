'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _users = require('./controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var port = 3000;
var app = (0, _express2.default)();
var apiRoutes = _express2.default.Router();

app.use(_bodyParser2.default.urlencoded({ extended: false }));

apiRoutes.post('/login', _users2.default.authenticate);
apiRoutes.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        _jsonwebtoken2.default.verify(token, 'F926DA7D876944AB1C21F714BC32A', function (err, decoded) {
            if (err) {
                return res.status(200).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
apiRoutes.get('/users', _users2.default.index);
apiRoutes.get('/users/:id', _users2.default.show);
apiRoutes.post('/users', _users2.default.create);
apiRoutes.put('/users', _users2.default.update);
apiRoutes.delete('/users', _users2.default.delete);
app.use('/api', apiRoutes);

app.listen(port, function () {
    return console.log('Test - port ' + port);
});