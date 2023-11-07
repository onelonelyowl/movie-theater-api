const app = require('./app')
const seed = require('./db/seed')

seed()
app.listen(3000)