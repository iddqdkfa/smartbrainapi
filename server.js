const express = require('express');

const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123321Ab!',
      database : 'smartbrain'
    }
  });

  

  app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})



app.post('/signin', (req, res) => {signin.handleSignin(req,res,db,bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

app.listen(3000, () =>{

    
    console.log("app is working")
})