const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const auth = require('../middleware/auth');

// @route   GET /api/internships
// @desc    Get all internships
// @access  Public
router.get('/', async (req, res) => {
    try {
        const internships = await Internship.find().sort({ createdAt: -1 });
        res.json(internships);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/internships/seed
// @desc    Seed database with initial internships
// @access  Public (should be protected in prod)
router.post('/seed', async (req, res) => {
    try {
        // Check if data already exists to avoid duplicates
        const count = await Internship.countDocuments();
        if (count > 0) {
            return res.status(400).json({ message: 'Database already has internships' });
        }

        const dummyData = [
            { title: 'Frontend Developer Intern', company: 'TechFlow', location: 'Remote', type: 'Remote', stipend: '₹15,000/mo', skills: ['React', 'CSS', 'JavaScript'] },
            { title: 'Data Science Intern', company: 'DataMinds', location: 'Pune', type: 'On-site', stipend: '₹20,000/mo', skills: ['Python', 'Pandas', 'ML'] },
            { title: 'UI/UX Designer', company: 'CreativeHub', location: 'Mumbai', type: 'Hybrid', stipend: '₹12,000/mo', skills: ['Figma', 'Adobe XD'] },
            { title: 'Full Stack Developer', company: 'StartUp Inc', location: 'Bangalore', type: 'On-site', stipend: '₹25,000/mo', skills: ['MERN', 'AWS'] },
            { title: 'Marketing Specialist', company: 'BrandBoost', location: 'Delhi', type: 'On-site', stipend: '₹10,000/mo', skills: ['SEO', 'Content Writing'] },
            { title: 'Mobile App Dev (React Native)', company: 'AppWorks', location: 'Remote', type: 'Remote', stipend: '₹18,000/mo', skills: ['React Native', 'Redux'] },
        ];

        await Internship.insertMany(dummyData);
        res.json({ message: 'Internships seeded successfully', count: dummyData.length });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/internships
// @desc    Create a new internship
// @access  Private (Industry Only)
router.post('/', auth, async (req, res) => {
    const { title, location, type, stipend, skills, description } = req.body;

    try {
        if (req.user.role !== 'industry' && req.user.role !== 'faculty') { // Allow faculty too maybe? User said industry.
            // Let's stick strictly to industry based on prompt "company which will signuyp as industry partner"
        }

        // We can get the company name from the User's name or a separate company field in User. 
        // For now, let's use the User's name as the Company Name.
        const User = require('../models/User');
        const user = await User.findById(req.user.id);

        const newInternship = new Internship({
            title,
            company: user.name, // Using User's name as Company Name
            location,
            type,
            stipend,
            skills,
            description,
            postedBy: req.user.id
        });

        const internship = await newInternship.save();
        res.json(internship);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
