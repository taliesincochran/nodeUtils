const addRoute = (routerOrApp, RESTfulOperator, route, callBack) => {
    const restFulMethods = [
        'checkout',
        'copy',
        'delete',
        'get',
        'head',
        'lock',
        'merge',
        'mkactivity',
        'mkcol',
        'move',
        'notify',
        'options',
        'patch',
        'post',
        'purge',
        'put',
        'report',
        'search',
        'subscribe',
        'trace',
        'unlock',
        'unsubscribe'
    ]
    if((routerOrApp !== 'router' && routeOrApp !== 'app') || restFulMethods.indexOf(RESTfulOperator) === -1) {
        console.log("Usage: " + "arguments = routerOrApp = must equal 'router' or 'app', RESTful operator must be a valid RESTful operator, route = path to route");
        process.exit(-1);
    }
    let newRoute;
    if(routerOrApp === 'router') {
        newRoute  = `
router.${RESTfulOperator}('/${route}', 
    ${callBack};
});
`
return newRoute;
    } else {
        let newRoute = `
app.${RESTfulOperator}('/${route}', (res,req) => {
    ${callBack}
});
`
    }
}
module.exports = addRoute;