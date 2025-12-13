const multer = require('multer');
const path = require('path');
const fs = require('fs');


const getStorageProductPath = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `public/uploads/images/product/${year}/${month}`;
};
// Cấu hình Multer
const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        const storagePath = getStorageProductPath();
        fs.mkdirSync(storagePath, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
        cb(null, storagePath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file theo thời gian hiện tại + đuôi file gốc
    }
});

const uploadProductImg = multer({
    storage: storageProduct,
});

const getStorageDistributorPath = () => {
    return `public/uploads/images/distributor`;
};
// Cấu hình Multer
const storageDistributor = multer.diskStorage({
    destination: function (req, file, cb) {
        const storagePath = getStorageDistributorPath();
        fs.mkdirSync(storagePath, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
        cb(null, storagePath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file theo thời gian hiện tại + đuôi file gốc
    }
});

const uploadDistributorImg = multer({
    storage: storageDistributor,
});



module.exports = { uploadProductImg, uploadDistributorImg }