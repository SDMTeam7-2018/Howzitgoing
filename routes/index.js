var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('teammember', { title: 'HowIsIt' });
});

module.exports = {

    getHomePage: (req, res) => {
        res.render('index.ejs', {
        title: "How Is It"
        });
    }
};