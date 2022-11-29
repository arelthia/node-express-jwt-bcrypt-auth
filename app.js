const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

const users = require('./routes/users');


app.use(cors());
app.use(express.json());
app.use('/user', users);



app.get('/', (req, res) => {
    res.send('Silence is Golden');
});

app.listen(PORT, () => console.log(`app running on http://127.0.0.1:${PORT}`));