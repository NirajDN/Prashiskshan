const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Internship = require('../models/Internship');
const User = require('../models/User');

// @route   PUT /api/applications/:id/status
// @desc    Update application status (accept/reject)
// @access  Private (Industry/Faculty)
router.put('/:id/status', auth, async (req, res) => {
    console.log('HIT UPDATE STATUS ROUTE. ID:', req.params.id);
    try {
        const { status } = req.body;

        let application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ msg: 'Application not found' });

        // Ensure user owns the internship
        const internship = await Internship.findById(application.internship);

        if (!internship) {
            return res.status(404).json({ msg: 'Internship not found associated with this application' });
        }

        const postedById = internship.postedBy ? internship.postedBy.toString() : null;
        const userId = req.user.id;

        console.log(`Checking Auth: PostedBy=${postedById}, UserID=${userId}`);

        if (postedById !== userId && req.user.role !== 'faculty') {
            return res.status(401).json({ msg: `Not authorized. Owner: ${postedById}, You: ${userId}` });
        }

        application.status = status;
        await application.save();

        res.json(application);
    } catch (err) {
        console.error('Error in Status Update:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/applications
// @desc    Apply for an internship
// @access  Private (Student)
router.post('/', auth, async (req, res) => {
    const { internshipId } = req.body;

    try {
        // Check if already applied
        const existingApplication = await Application.findOne({
            student: req.user.id,
            internship: internshipId
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this internship' });
        }

        const application = new Application({
            student: req.user.id,
            internship: internshipId
        });

        await application.save();
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/applications/student
// @desc    Get all applications for the logged in student
// @access  Private
router.get('/student', auth, async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user.id })
            .populate('internship')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/applications/industry
// @desc    Get applications for industry view (Filtered by postedBy)
// @access  Private
router.get('/industry', auth, async (req, res) => {
    try {
        // 1. Find all internships posted by this user
        const myInternships = await Internship.find({ postedBy: req.user.id });
        const myInternshipIds = myInternships.map(i => i._id);

        // 2. Find applications where the internship is in the list of myInternshipIds
        const applications = await Application.find({ internship: { $in: myInternshipIds } })
            .populate('internship')
            .populate('student') // Populate all fields
            .sort({ appliedAt: -1 });

        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/applications/all
// @desc    Get all applications (Faculty View)
// @access  Private
router.get('/all', auth, async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('internship')
            .populate('student')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
