import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import users from './controllers/users';
import articles from './controllers/articles';

const port = 3000;
const app = express();
const apiRoutes = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

apiRoutes.post('/login', users.authenticate);
apiRoutes.post('/registration', users.create);

apiRoutes.use(function(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'F926DA7D876944AB1C21F714BC32A', function(err, decoded) {
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

apiRoutes.get('/users', users.index);
apiRoutes.get('/users/:id', users.show);
apiRoutes.put('/users', users.update);

apiRoutes.get('/articles', articles.index);
apiRoutes.get('/articles/:id', articles.show);
apiRoutes.post('/articles', articles.create);
apiRoutes.put('/articles', articles.update);
apiRoutes.delete('/articles', articles.delete);

app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Test - port ${port}`));
