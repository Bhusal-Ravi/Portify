const express= require('express');
const router= express.Router();

router.get('/health', (req, res) => {   
    console.log('Health check endpoint was called');
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

module.exports = router;