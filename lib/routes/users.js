
module.exports = function *( next ) {
    this.status = 200
    this.body = {
        status: 200,
        message: 'It works'
    };
};
