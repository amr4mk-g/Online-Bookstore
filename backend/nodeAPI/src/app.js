const express = require('express');
const cors = require('cors');

const user = require('../routes/user')
const admin = require('../routes/admin')
const store = require('../routes/store')

require('./db');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', user)
app.use('/api/mange', admin)
app.use('/api/store', store)

app.use((req,res) => res.status(404).json({error:'Route not found'}));

const port = 3000;
app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});

// to run: node src/app.js
