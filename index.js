var fs = require('fs');
var path = require('path');

module.exports = base64ToImage;

function base64ToImage(dir) {
    return function (req, res, next) {
        var raw = req.body.base64;
        var filename = getRandomFileName();
        if (!checkBase64(raw)) return next();
        var base64 = raw.replace(/^data:image\/.;base64,/, "");
        var abs = path.join(dir, filename);
        fs.writeFile(abs, base64, 'base64', function (err) {
            if (err) return next(err);
            res.locals.image = {
                name: filename,
                abs: abs
            };
            return next();
        });
    }
}

function checkBase64(raw) {
    return raw && typeof(raw) === 'string' && raw.match(/^data:image\/.;base64,/);
}


function getRandomFileName() {
    return Math.random().toString(36).substring(5) + '.jpg';
}