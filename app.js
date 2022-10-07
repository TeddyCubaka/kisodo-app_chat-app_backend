const express = require('express');
const mongoose = require('mongoose')

const app = express();



app.use(express.json())

app.get('/api/debut', (req, res, next)=>{
    res.status(200).json({message : "connecter"})
})

app.listen(3000, (err)=>{
    if(err) throw err;
    console.log('sever start on port 3000')
})