const errorHandler = (err, req, res, next) => {
    console.log(`Error => ${err.message}`.red);
    res.status(500).json({
        code: 500,
        data: 'Server error'
    })
};

const notFound = (req, res) => {
    console.log(`Not Found => ${err.message}`.red);
    res.status(404).json({
      code: 404,
      data: 'Server error',
    });
};

module.exports = { errorHandler, notFound };
