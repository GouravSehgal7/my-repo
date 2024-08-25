const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema');
const mongoose = require('mongoose')
const authschema = require('./Auth/Authschema')
const cors = require('cors')
const authresolver = require('./Auth/AuthResolver')
const dotev = require('dotenv')
const app = express();
dotev.config();
app.use(express.json())


// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin','*')
//   res.setHeader('Access-Control-Allow-Method','GET,POST,PUT,PATCH,DELETE')
//   res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorisation')
// })

app.use(()=>{
  let arr = {"hello ": "world"}
})

app.use(cors())


app.use('/graphql',graphqlHTTP((req)=>({
    schema:makeExecutableSchema({typeDefs: authschema, resolvers: authresolver }),
    graphiql: true,
    context: { req },
}))
)


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    console.log("Database connected");
  })
  .then(()=>{
    app.listen(3000,()=>{
        console.log("server is running on port 3000");
    })
  })
  .catch((err)=>console.log(err))