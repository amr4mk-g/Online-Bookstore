const mongoose = require('mongoose');

const data = ""
const URL = `mongodb+srv://${data}@cluster0.yqhwxuy.mongodb.net/OnlineBooks?retryWrites=true&w=majority`;

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
 