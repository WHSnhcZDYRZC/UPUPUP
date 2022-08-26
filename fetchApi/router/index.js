;(() => {
    const { router } = require('../app.js');

    router.use('/ssrPort', router)

    module.exports = {
        router,
    }
})();