const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Append extension
    }
});

const upload = multer({ storage: storage });

// @route   GET /api/users/mentors
// @desc    Get all potential mentors (faculty & industry)
// @access  Public
router.get('/mentors', async (req, res) => {
    try {
        const mentors = await User.find({ role: { $in: ['faculty', 'industry'] } })
            .select('-password')
            .sort({ createdAt: -1 });
        res.json(mentors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile & upload resume
// @access  Private
router.put('/profile', [auth, upload.single('resume')], async (req, res) => {
    try {
        const { name, college, cgpa, bio, skills } = req.body;

        // Build user object
        const profileFields = {};
        if (name) profileFields.name = name;
        if (college) profileFields.college = college;
        if (cgpa) profileFields.cgpa = cgpa;
        if (bio) profileFields.bio = bio;
        if (skills) {
            // Handle if skills is string or array
            profileFields.skills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
        }

        if (req.file) {
            profileFields.resume = req.file.path;
        }

        // console.log('Updating profile for user:', req.user.id);
        // console.log('Body:', req.body);
        // console.log('File:', req.file);

        let user = await User.findById(req.user.id);
        if (!user) {
            console.error('User not found in DB:', req.user.id);
            return res.status(404).json({ msg: 'User not found' });
        }

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error('Profile Update Error:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
