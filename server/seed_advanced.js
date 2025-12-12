const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Internship = require('./models/Internship');
const Application = require('./models/Application');
require('dotenv').config();

const users = [
    { name: 'Tesla Inc', email: 'careers@tesla.com', password: 'password123', role: 'industry', bio: 'Accelerating the world\'s transition to sustainable energy.' },
    { name: 'Google', email: 'careers@google.com', password: 'password123', role: 'industry', bio: 'Organizing the world\'s information.' },
    { name: 'Amazon', email: 'careers@amazon.com', password: 'password123', role: 'industry', bio: 'Earth\'s most customer-centric company.' },
    { name: 'Microsoft', email: 'careers@microsoft.com', password: 'password123', role: 'industry', bio: 'Empowering every person and organization.' },
    { name: 'Student One', email: 'student@test.com', password: 'password123', role: 'student', college: 'IIT Bombay', cgpa: '9.2' }
];

const internships = [
    { title: 'Autopilot Engineer', company: 'Tesla Inc', location: 'Palo Alto', type: 'On-site', stipend: '₹50,000/mo', postedByEmail: 'careers@tesla.com' },
    { title: 'Battery Research Intern', company: 'Tesla Inc', location: 'Remote', type: 'Remote', stipend: '₹30,000/mo', postedByEmail: 'careers@tesla.com' },
    { title: 'Frontend Engineer', company: 'Google', location: 'Bangalore', type: 'Hybrid', stipend: '₹60,000/mo', postedByEmail: 'careers@google.com' },
    { title: 'Cloud Architect Intern', company: 'Amazon', location: 'Hyderabad', type: 'On-site', stipend: '₹45,000/mo', postedByEmail: 'careers@amazon.com' },
    { title: 'AI Research Intern', company: 'Microsoft', location: 'Bangalore', type: 'Remote', stipend: '₹55,000/mo', postedByEmail: 'careers@microsoft.com' },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing data
        await User.deleteMany({});
        await Internship.deleteMany({});
        await Application.deleteMany({});
        console.log('Data Cleared');

        // Create Users
        const createdUsers = {}; // Map email to ID

        for (const u of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(u.password, salt);

            const newUser = new User({
                ...u,
                password: hashedPassword
            });

            const savedUser = await newUser.save();
            createdUsers[u.email] = savedUser._id;
            console.log(`Created User: ${u.name}`);
        }

        // Create Internships
        for (const i of internships) {
            const userId = createdUsers[i.postedByEmail];
            if (userId) {
                const newInternship = new Internship({
                    title: i.title,
                    company: i.company,
                    location: i.location,
                    type: i.type,
                    stipend: i.stipend,
                    postedBy: userId
                });
                await newInternship.save();
                console.log(`Created Internship: ${i.title} for ${i.company}`);
            }
        }

        console.log('Seeding Complete');
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
