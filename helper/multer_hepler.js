const multer = require('multer');
let fs = require('fs-extra');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirsSync(__dirname + './../public/images/users'); // fs.mkdirsSync will create folders if it does not exist
        cb(null, __dirname + './../public/images/users');
    },
    filename: function (req, file, cb) {
        console.log(file);

        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})

let upload = multer({ storage: storage });

let createUserImage = upload.single('image');

let multerHelper = {
    createUserImage,
}

module.exports = multerHelper;