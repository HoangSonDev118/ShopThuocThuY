const path = require('path');
const dotenv = require('dotenv').config()
const fs = require('fs');

const { uploadProductImg, uploadDistributorImg } = require('../utils/multerImg');
const authMiddleware = require('../middlewares/authMiddleware');

const router = require('express').Router()


router.post('/image/product', uploadProductImg.array('files', 6), (req, res) => {
    // router.post('/image/product', authMiddleware.adminMiddleware, uploadProductImg.array('files', 6), (req, res) => {
    // console.log('upload');
    const uploadedFiles = req.files;
    const newFiles = uploadedFiles.map(file => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${process.env.BASE_URL}/images/product/${year}/${month}/${file.filename}`;
    });
    try {
        res.send({
            status: 'successd',
            files: newFiles
        });
    } catch (err) {
        res.sendStatus(400);
    }
});
router.post('/image/distributor', uploadDistributorImg.array('files', 6), (req, res) => {

    const uploadedFiles = req.files;
    const newFiles = uploadedFiles.map(file => {
        return `${process.env.BASE_URL}/images/distributor/${file.filename}`;
    });
    try {
        res.send({
            status: 'successd',
            files: newFiles
        });
    } catch (err) {
        res.sendStatus(400);
    }
});













router.post('/image/delete', (req, res) => {
    // router.delete('/image/product/delete/:filename', authMiddleware.adminMiddleware, (req, res) => {
    try {
        // const filename = req.params.filename;
        // const filepath = path.resolve(__dirname, '../../public/uploads/images/product/2024/07', filename);
        // fs.unlink(filepath, (err) => {
        //     if (err) {
        //         if (err.code === 'ENOENT') {
        //             return res.status(404).send('File not found.');
        //         }
        //         return res.status(500).send(err.message);
        //     }
        //     res.send('File deleted successfully.');
        // });
        const imageUrl = req.body.filename;

        console.log('path', imageUrl.split('/images/')[1])

        // Tách lấy đường dẫn từ URL
        const imagePath = path.join(__dirname, '..', '..', '/public/uploads/images', imageUrl.split('/images/')[1]);

        console.log('first', imagePath)

        // Xóa tệp
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({ message: 'Failed to delete image' });
            }

            res.status(200).json({ message: 'Image deleted successfully' });
        });
    }
    catch (err) {
        res.sendStatus(400);
    }
});

router.post('/distributor/delete/', (req, res) => {
    // router.delete('/image/product/delete/:filename', authMiddleware.adminMiddleware, (req, res) => {
    console.log(req.body);
    try {
        const imageUrl = req.body.filename;

        console.log('path', imageUrl.split('/images/')[1])

        // Tách lấy đường dẫn từ URL
        const imagePath = path.join(__dirname, '..', '..', '/public/uploads/images', imageUrl.split('/images/')[1]);

        console.log('first', imagePath)

        // Xóa tệp
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(200).json({ message: 'Failed to delete image' });
            }

            res.status(200).json({ message: 'Image deleted successfully' });
        });
    }
    catch (err) {
        res.sendStatus(400);
    }
});

router.post('/product/delete', async (req, res) => {
    const imagePaths = req.body.imagePaths;

    if (!Array.isArray(imagePaths)) {
        return res.status(400).send('Invalid input');
    }

    // imagePaths.forEach((imagePath) => {
    //     // Chuyển đổi URL thành đường dẫn thực tế trên server
    //     const localPath = path.join(__dirname, '..', '..', '/public/uploads/images', imagePath.split('/images/')[1])

    //     fs.unlink(localPath, (err) => {
    //         if (err) {
    //             res.status(200).send({
    //                 status: 400,
    //                 mes: 'Delete image error'
    //             });
    //         } else {
    //             res.status(200).send({
    //                 status: 200,
    //                 mes: 'Delete image success'
    //             });
    //         }
    //     });
    // });






    try {
        // Sử dụng Promise.all để chờ tất cả các thao tác fs.unlink hoàn thành
        await Promise.all(imagePaths.map(imagePath => {
            // Chuyển đổi URL thành đường dẫn thực tế trên server
            const localPath = path.join(__dirname, '..', '..', '/public/uploads/images', imagePath.split('/images/')[1]);

            return new Promise((resolve, reject) => {
                fs.unlink(localPath, ()=>{
                    resolve()
                });
            });
        }));

        res.send('Images deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting images');
    }

});



















module.exports = router