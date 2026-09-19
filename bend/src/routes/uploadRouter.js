const dotenv = require('dotenv').config();
const { uploadProductImg, uploadDistributorImg, uploadToCloudinary, cloudinary } = require('../utils/multerImg');

const router = require('express').Router();

const extractPublicIdFromUrl = (imageUrl) => {
    if (!imageUrl) return null;

    try {
        const url = new URL(imageUrl);
        const segments = url.pathname.split('/').filter(Boolean);
        const uploadIndex = segments.findIndex((segment) => segment === 'upload');

        if (uploadIndex === -1) {
            return null;
        }

        const afterUpload = segments.slice(uploadIndex + 1);
        const cleanedSegments = afterUpload.filter((segment) => !/^v\d+$/.test(segment));

        if (!cleanedSegments.length) {
            return null;
        }

        const publicIdWithExtension = cleanedSegments.join('/');
        return decodeURIComponent(publicIdWithExtension.replace(/\.[^/.]+$/, ''));
    } catch (error) {
        return null;
    }
};

router.post('/image/product', uploadProductImg.array('files', 6), async (req, res) => {
    try {
        const uploadedFiles = req.files || [];

        const results = await Promise.all(
            uploadedFiles.map((file) => uploadToCloudinary(file, 'products'))
        );

        res.send({
            status: 'successd',
            files: results.map((item) => item.secure_url || item.url),
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message || 'Upload failed',
        });
    }
});

router.post('/image/distributor', uploadDistributorImg.array('files', 6), async (req, res) => {
    try {
        const uploadedFiles = req.files || [];

        const results = await Promise.all(
            uploadedFiles.map((file) => uploadToCloudinary(file, 'distributors'))
        );

        res.send({
            status: 'successd',
            files: results.map((item) => item.secure_url || item.url),
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message || 'Upload failed',
        });
    }
});

router.post('/image/delete', async (req, res) => {
    try {
        const imageUrl = req.body.filename || req.body.imageUrl;
        const publicId = extractPublicIdFromUrl(imageUrl);

        if (!publicId) {
            return res.status(400).json({ message: 'Invalid image URL' });
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            return res.status(200).json({ message: 'Image deleted successfully' });
        }

        return res.status(400).json({ message: 'Failed to delete image' });
    } catch (err) {
        return res.status(400).json({ message: err.message || 'Delete failed' });
    }
});

router.post('/distributor/delete/', async (req, res) => {
    try {
        const imageUrl = req.body.filename || req.body.imageUrl;
        const publicId = extractPublicIdFromUrl(imageUrl);

        if (!publicId) {
            return res.status(400).json({ message: 'Invalid image URL' });
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            return res.status(200).json({ message: 'Image deleted successfully' });
        }

        return res.status(400).json({ message: 'Failed to delete image' });
    } catch (err) {
        return res.status(400).json({ message: err.message || 'Delete failed' });
    }
});

router.post('/product/delete', async (req, res) => {
    try {
        const imagePaths = req.body.imagePaths || [];

        if (!Array.isArray(imagePaths)) {
            return res.status(400).send('Invalid input');
        }

        const results = await Promise.all(
            imagePaths.map(async (imagePath) => {
                const publicId = extractPublicIdFromUrl(imagePath);
                if (!publicId) {
                    return { result: 'not_found' };
                }
                return cloudinary.uploader.destroy(publicId);
            })
        );

        return res.send({
            status: 'successd',
            results,
        });
    } catch (error) {
        return res.status(500).send('Error deleting images');
    }
});

module.exports = router;
