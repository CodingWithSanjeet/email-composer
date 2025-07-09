module.exports = (err, req, res, next) =>{
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: err.stauts< 500 ? 'fail': 'error',
        message: err.message || 'Internal Server Error'
    });
}