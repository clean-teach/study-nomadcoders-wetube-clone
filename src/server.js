import express, { urlencoded } from 'express'
import morgan from 'morgan';
import session from 'express-session';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(logger);
app.use(urlencoded({extended: true}));

app.use(session({
    secret: 'Hello',
    resave: true,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    req.sessionStore.all((error, session) => {
        console.log(session);
        next();
    });
});

app.get('/add-one', (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id} <br><br> ${req.session.potato}`);
});

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

export default app;