
const express=require('express');
const cors = require('cors');
const colors=require('colors');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
const schema = require('./schema/schema');
const connectDB = require('./config/db');

const port = process.env.PORT||5000;

const app = express();
app.use(cors());

connectDB();

app.listen(port,console.log(`Server running on port ${port}`))
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV==='development'
}))