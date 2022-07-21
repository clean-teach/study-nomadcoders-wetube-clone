import express, { urlencoded } from 'express'
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import { localsMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(logger);
app.use(urlencoded({extended: true}));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
}));

app.use((req, res, next) => {
    req.sessionStore.all((error, session) => {
        // console.log(session);
        next();
    });
});

app.use(localsMiddleware);

app.use('/uploads', express.static('uploads'));
app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

export default app;