require('dotenv').config()
import Koa from 'koa'
import * as Router from 'koa-router'
import * as graphqlHttp from 'koa-graphql';
import graphqlSchema from './graphql/schema'
import db from './database/db'

const app = new Koa();
const router = new Router();
const graphqlServer = graphqlHttp({schema: graphqlSchema, graphiql: true})

db.connect()
router.all('/graphql', graphqlServer)
app.use(router.routes()).use(router.allowedMethods())
app.listen(4000);