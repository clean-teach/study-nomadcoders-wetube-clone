import './db.js';
import './models/Video.js'
import app from './server.js'

const PORT = 4000;

const handleListen = () => {
    console.log(`✔ server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListen);