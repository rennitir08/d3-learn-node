// Define a Node module that handles routing
module.exports.setup = (router, uploads, knex) => {

    // 1. Load libraries
    let moment = require('moment')

    // 2. Define routes
    router.get('/todos', function(req, res) {

        knex.select().table('todos').then(function(data) {
            res.json(data)
        })
    })

    router.post('/todos',function(req, res) {

        let now = moment().format('YYYY-MM-DD HH:mm:ss')

        let todo = {
            todo: req.body.todo.trim(),
            completed: req.body.completed ? 'yes': 'no',
            created_at: now,
            updated_at: now,
            category: req.body.category,
            due_date: req.body.due_date
        }
        knex.insert(todo).table('todos').returning('*').then(function(data) {
            res.json(data[0])
        })
    })
    // return the router, with the new routes attached back to the Express web server that's loading these
    return router
}
