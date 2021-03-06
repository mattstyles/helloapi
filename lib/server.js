/**
 * helloapi
 */

var path        = require( 'path' );

var koa         = require( 'koa' );
var logger      = require( 'koa-bunyan-logger' );
var serve       = require( 'koa-static' );
var route       = require( 'koa-route' );
var mount       = require( 'koa-mount' );
var cors        = require( 'koa-cors' );

var render      = require( './util/views' );



var app = koa();

app.use( cors() );

app.use( logger() );
app.use( logger.requestLogger() );

// Custom 404
app.use( function *( next ) {
    yield next;

    if ( this.body || !this.idempotent ) {
        return;
    }

    this.status = 404;
    this.body = yield render( '404' );
});


// Users route
app.use( route.get( '/users', require( './routes/users' ) ) );


// Serve the frontend
app.use( serve( path.join( __dirname, '../public' ) ) );


// Export composable app
module.exports = app;
