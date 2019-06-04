const utils =  require('../');
const addRoute = (routerOrApp, RESTfulOperator, route, callBack) => {
    let newRoute;
    if((routerOrApp !== 'router' && routeOrApp !== 'app') || utils.restfulMethods.indexOf(RESTfulOperator) === -1) {
        console.log("Usage: " + "arguments = routerOrApp = must equal 'router' or 'app', RESTful operator must be a valid RESTful operator, route = path to route");
        process.exit(-1);
    }
    if(routerOrApp === 'router') {
        newRoute  = `
router.${RESTfulOperator}('/${route}', (res, req) => {
    ${callBack}
});
`
return newRoute;
    } else {newRoute = `
app.${RESTfulOperator}('/${route}', (res,req) => {
    ${callBack}
});
`
    }
}
module.exports = addRoute;