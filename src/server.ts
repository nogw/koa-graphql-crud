require('dotenv').config()
import Koa from 'koa'
import * as cors from '@koa/cors'
import * as Router from 'koa-router'
import * as graphqlHttp from 'koa-graphql';
import { schema } from './graphql/schema'
import db from './database/db'

const app = new Koa();
const router = new Router();
const graphqlServer = graphqlHttp({schema: schema, graphiql: true})

db.connect()
router.all('/graphql', graphqlServer)

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
app.listen(4000);