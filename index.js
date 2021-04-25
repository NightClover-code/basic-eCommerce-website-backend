//importing dependencies
const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('');
const uuid = require('uuid/dist/v4');
//initializing app
const app = express();

//middleware
app.use(express.json());
app.use(cors());
