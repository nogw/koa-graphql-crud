import Koa from 'koa'
import mount from 'koa-mount'
import graphqlHTTP from 'koa-graphql'
import db from './database/db'

const app = new Koa

db.connect()

app.use(mount("/graphql", graphqlHTTP
  ({
    schema,
    graphiql: true
  }))
)

app.listen(3000, () => {
  console.log(`run in ${3000}`)
})