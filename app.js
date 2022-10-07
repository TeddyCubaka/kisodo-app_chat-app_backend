const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const User = require('./models/users')

const app = express();

mongoose.connect(process.env.DATABASE_URL,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !', process.env.DATABASE_URL));

app.use(express.json())

app.use('/api', (req, res)=>{
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(404).json({ error }))
})

app.listen(3000, (err)=>{
    if(err) throw err;
    console.log('sever start on port 3000')
})