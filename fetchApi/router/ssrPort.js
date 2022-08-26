; (() => {
    const { router } = require('./index');

    const tableData = [{
        id: 1,
        name: '张三',
        age: 18,
    }, {
        id: 2,
        name: '李四',
        age: 20,
    }, {
        id: 3,
        name: '王五',
        age: 99,
    }];

    let id = 3;

    router.get('/get_table_list', (req, res) => {
        res.send(tableData)
    })

    router.post('/set_table_list', (req, res) => {
        console.log(req);
        res.send(tableData)
    })

    router.delete('/del_table_list/:id', (req, res) => {
        const idx = tableData.findIndex(v => (v.id + '') === req.params.id
        );
        tableData.splice(idx, 1);
        res.send({ code: 200, msg: 'ok' })
    })

    module.exports = {
        router,
    }
})();