import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { User, Briefcase, GraduationCap, Mail, MessageSquare, Search, Filter, X, ChevronRight, Globe, Linkedin, Award, MapPin } from 'lucide-react';

const DUMMY_MENTORS = [
    {
        _id: 'm1',
        name: 'Dr. Sarah Chen',
        role: 'faculty',
        college: 'Stanford University',
        department: 'Computer Science',
        bio: 'Professor of Computer Science specializing in Artificial Intelligence and Machine Learning. With over 15 years of teaching experience and numerous citations in top-tier journals, Dr. Chen mentors students on thesis projects and research methodologies.',
        skills: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks', 'Python', 'Research Methods'],
        email: 'sarah.chen@example.edu',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Stanford, CA'
    },
    {
        _id: 'm2',
        name: 'James Rodriguez',
        role: 'industry',
        company: 'Google',
        position: 'Senior Software Engineer',
        bio: 'Backend specialist with a passion for scalable architecture. Currently leading a team at Google Cloud. James loves helping students bridge the gap between academic theory and real-world software engineering practices.',
        skills: ['System Design', 'Go', 'Kubernetes', 'Cloud Computing', 'Microservices'],
        email: 'james.r@google.com',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Mountain View, CA'
    },
    {
        _id: 'm3',
        name: 'Emily Watson',
        role: 'industry',
        company: 'Tesla',
        position: 'Product Manager',
        bio: 'Product leader focused on sustainable energy solutions. Emily has a background in engineering and business, making her an ideal mentor for students interested in product management and the intersection of tech and business.',
        skills: ['Product Management', 'Agile', 'Strategy', 'Data Analysis', 'UX Design'],
        email: 'emily.w@tesla.com',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Austin, TX'
    },
    {
        _id: 'm4',
        name: 'Prof. Michael Chang',
        role: 'faculty',
        college: 'MIT',
        department: 'Electrical Engineering',
        bio: 'Leading researcher in robotics and embedded systems. Prof. Chang encourages hands-on learning and often collaborates with industry partners to provide students with practical experience.',
        skills: ['Robotics', 'Embedded Systems', 'C++', 'Control Theory', 'IoT'],
        email: 'm.chang@mit.edu',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Cambridge, MA'
    },
    {
        _id: 'm5',
        name: 'Priya Patel',
        role: 'industry',
        company: 'Microsoft',
        position: 'UX Researcher',
        bio: 'Dedicated to creating accessible and inclusive user experiences. Priya mentors designers and developers on the importance of user-centric design principles.',
        skills: ['UX Research', 'Accessibility', 'Human-Computer Interaction', 'Figma', 'Prototyping'],
        email: 'priya.p@microsoft.com',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Seattle, WA'
    },
    {
        _id: 'm6',
        name: 'David Okonjo',
        role: 'industry',
        company: 'Amazon',
        position: 'DevOps Engineer',
        bio: 'Expert in CI/CD pipelines and infrastructure as code. David helps students understand the operational side of software development and modern deployment practices.',
        skills: ['AWS', 'Docker', 'Terraform', 'Jenkins', 'Linux'],
        email: 'david.o@amazon.com',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Seattle, WA'
    },
    {
        _id: 'm7',
        name: 'Anita Desai',
        role: 'industry',
        company: 'Netflix',
        position: 'Senior UI Engineer',
        bio: 'Specializing in high-performance frontend applications. Anita loves React, CSS architecture, and web performance optimization. She mentors developers looking to master the modern web stack.',
        skills: ['React', 'JavaScript', 'Performance', 'CSS', 'Web Design'],
        email: 'anita.d@netflix.com',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Los Gatos, CA'
    },
    {
        _id: 'm8',
        name: 'Robert Fox',
        role: 'industry',
        company: 'Adobe',
        position: 'Data Scientist',
        bio: 'Applying machine learning to creative tools. Robert has a deep background in statistics and computer vision and helps students enter the field of data science.',
        skills: ['Data Science', 'Python', 'Computer Vision', 'Statistics', 'PyTorch'],
        email: 'robert.f@adobe.com',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'San Jose, CA'
    },
    {
        _id: 'm9',
        name: 'Dr. Rajesh Kumar',
        role: 'faculty',
        college: 'IIT Bombay',
        department: 'Mechanical Engineering',
        bio: 'Expert in thermodynamics and fluid mechanics. Dr. Kumar has led numerous industrial collaborations and is keen on mentoring students interested in core engineering sectors.',
        skills: ['Thermodynamics', 'Fluid Mechanics', 'MATLAB', 'Research', 'Engineering'],
        email: 'r.kumar@iitb.ac.in',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Mumbai, India'
    },
    {
        _id: 'm10',
        name: 'Elena Rodriguez',
        role: 'industry',
        company: 'Meta',
        position: 'Product Designer',
        bio: 'Designing for the metaverse and social connection. Elena mentors aspiring designers on portfolio building and design thinking processes.',
        skills: ['Product Design', 'VR/AR', 'Interaction Design', 'Sketch', 'Prototyping'],
        email: 'elena.r@meta.com',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Menlo Park, CA'
    },
    {
        _id: 'm11',
        name: 'Prof. Lisa Wang',
        role: 'faculty',
        college: 'UC Berkeley',
        department: 'Economics',
        bio: 'Focusing on behavioral economics and public policy. Prof. Wang helps students understand the economic implications of technology and innovation.',
        skills: ['Economics', 'Public Policy', 'Data Analysis', 'Stata', 'Research'],
        email: 'l.wang@berkeley.edu',
        image: 'https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Berkeley, CA'
    },
    {
        _id: 'm12',
        name: 'Thomas Anderson',
        role: 'industry',
        company: 'Oracle',
        position: 'Database Architect',
        bio: 'Veteran database engineer with 20+ years of experience. Specializes in large-scale database systems and cloud migration strategies.',
        skills: ['SQL', 'Oracle DB', 'Cloud Migration', 'System Architecture', 'Java'],
        email: 'thomas.a@oracle.com',
        image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Redwood City, CA'
    },
    {
        _id: 'm13',
        name: 'Dr. Amit Shah',
        role: 'faculty',
        college: 'IISc Bangalore',
        department: 'Biotechnology',
        bio: 'Pioneering research in genetic engineering. Dr. Shah mentors students interested in the intersection of biology and technology.',
        skills: ['Biotechnology', 'Genetics', 'CRISPR', 'Research', 'Bioinformatics'],
        email: 'amit.s@iisc.ac.in',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Bangalore, India'
    },
    {
        _id: 'm14',
        name: 'Sophie Martin',
        role: 'industry',
        company: 'Spotify',
        position: 'iOS Developer',
        bio: 'Passionate about mobile development and audio technology. Sophie mentors students on Swift, mobile architecture, and app publishing.',
        skills: ['iOS', 'Swift', 'Mobile Dev', 'Audio Programming', 'Objective-C'],
        email: 'sophie.m@spotify.com',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'New York, NY'
    },
    {
        _id: 'm15',
        name: 'Marcus Johnson',
        role: 'industry',
        company: 'Apple',
        position: 'Hardware Engineer',
        bio: 'Designing the next generation of consumer electronics. Marcus helps students understand hardware-software integration and circuit design.',
        skills: ['Hardware Design', 'PCB', 'Embedded C', 'Electronics', 'Testing'],
        email: 'marcus.j@apple.com',
        image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Cupertino, CA'
    }
];

const Mentorship = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedMentor, setSelectedMentor] = useState(null);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                // Keep the curated list visible
                setMentors(DUMMY_MENTORS);

                // Optionally mix in API data
                const host = window.location.hostname;
                const res = await axios.get(`http://${host}:5001/api/users/mentors`);
                if (res.data && res.data.length > 0) {
                    setMentors(prev => {
                        const existingIds = new Set(prev.map(m => m._id));
                        const uniqueApi = res.data.filter(m => !existingIds.has(m._id));
                        return [...prev, ...uniqueApi];
                    });
                }
            } catch (err) {
                console.error("Error fetching mentors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const filteredMentors = mentors.filter(mentor => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        const matchesSearch = normalizedSearch === '' ||
            (mentor.name && mentor.name.toLowerCase().includes(normalizedSearch)) ||
            (mentor.company && mentor.company.toLowerCase().includes(normalizedSearch)) ||
            (mentor.college && mentor.college.toLowerCase().includes(normalizedSearch)) ||
            (mentor.position && mentor.position.toLowerCase().includes(normalizedSearch)) ||
            (mentor.bio && mentor.bio.toLowerCase().includes(normalizedSearch)) ||
            (mentor.skills && mentor.skills.some(skill => skill.toLowerCase().includes(normalizedSearch)));

        const matchesRole = filterRole === 'all' || mentor.role === filterRole;
        return matchesSearch && matchesRole;
    });

    // Show only first 6 if no search/filter active
    const displayMentors = (searchTerm.trim() === '' && filterRole === 'all')
        ? filteredMentors.slice(0, 6)
        : filteredMentors;

    const openMentorModal = (mentor) => {
        setSelectedMentor(mentor);
        document.body.style.overflow = 'hidden';
    };

    const closeMentorModal = () => {
        setSelectedMentor(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900"></div>
                    <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-violet-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-300 bg-indigo-900/30 border border-indigo-500/30 animate-fade-in-up">
                            <Award className="w-4 h-4 mr-2 text-indigo-400" />
                            World-Class Mentorship
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight animate-fade-in-up animation-delay-100">
                            Master Your Craft with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Expert Guidance</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 mb-10 font-light leading-relaxed animate-fade-in-up animation-delay-200">
                            Connect with industry leaders and academic pioneers who can accelerate your growth and open doors to new opportunities.
                        </p>

                        {/* Search Bar */}
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative flex-grow group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-blue-200 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by name, company, or skill..."
                                        className="block w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-transparent focus:border-white/30 focus:bg-white/10 focus:ring-0 text-white placeholder-blue-200/70 transition-all font-medium"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="sm:w-48 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                        <Filter className="h-5 w-5 text-blue-200" />
                                    </div>
                                    <select
                                        className="block w-full pl-10 pr-8 py-3.5 rounded-xl bg-white/5 border border-transparent focus:border-white/30 focus:bg-white/10 focus:ring-0 text-white font-medium appearance-none cursor-pointer hover:bg-white/10 transition-all"
                                        value={filterRole}
                                        onChange={(e) => setFilterRole(e.target.value)}
                                    >
                                        <option value="all" className="text-gray-900">All Mentors</option>
                                        <option value="industry" className="text-gray-900">Industry Experts</option>
                                        <option value="faculty" className="text-gray-900">Faculty Members</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mentors Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : displayMentors.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayMentors.map((mentor) => (
                                <div key={mentor._id} className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full">
                                    <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600">
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30 flex items-center">
                                            {mentor.role === 'industry' ? (
                                                <>
                                                    <Briefcase className="w-3 h-3 mr-1.5" /> Industry
                                                </>
                                            ) : (
                                                <>
                                                    <GraduationCap className="w-3 h-3 mr-1.5" /> Faculty
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-6 pt-0 pb-6 flex-grow flex flex-col relative">
                                        <div className="relative -mt-12 mb-4">
                                            <img
                                                src={mentor.image || `https://ui-avatars.com/api/?name=${mentor.name}&background=random`}
                                                alt={mentor.name}
                                                className="h-24 w-24 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-lg"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors">
                                                {mentor.name}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center">
                                                {mentor.role === 'industry' ? mentor.position : mentor.department}
                                                <span className="mx-2 text-slate-300">•</span>
                                                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                                                    {mentor.company || mentor.college || "Freelance"}
                                                </span>
                                            </p>
                                        </div>

                                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-6 flex-grow">
                                            {mentor.bio}
                                        </p>

                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                {mentor.skills && mentor.skills.slice(0, 3).map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {mentor.skills && mentor.skills.length > 3 && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
                                                        +{mentor.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                                <button
                                                    onClick={() => openMentorModal(mentor)}
                                                    className="flex items-center justify-center px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                                >
                                                    Read More
                                                </button>
                                                <button
                                                    onClick={() => window.location.href = `mailto:${mentor.email}`}
                                                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:shadow-indigo-500/25"
                                                >
                                                    Contact
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {displayMentors.length < filteredMentors.length && (
                            <div className="mt-12 text-center">
                                <p className="text-slate-500 mb-4">Showing {displayMentors.length} of {filteredMentors.length} mentors</p>
                                <button
                                    onClick={() => setSearchTerm(' ')} // Simple hack to trigger "search mode" or just encourage user to search
                                    className="inline-flex items-center px-6 py-3 border border-slate-300 shadow-sm text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                                >
                                    Use search to find more...
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                        <User className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No mentors found</h3>
                        <p className="mt-1 text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                            We couldn't find any mentors matching your search.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setFilterRole('all'); }}
                            className="mt-6 inline-flex items-center px-6 py-2.5 rounded-full text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Mentor Details Modal */}
            {selectedMentor && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        {/* Background overlay */}
                        <div
                            className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity"
                            aria-hidden="true"
                            onClick={closeMentorModal}
                        ></div>

                        {/* Modal Panel */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            <div className="absolute top-4 right-4 z-10">
                                <button
                                    onClick={closeMentorModal}
                                    className="bg-white/50 dark:bg-black/20 rounded-full p-2 hover:bg-white dark:hover:bg-black/40 transition-colors"
                                >
                                    <X className="h-6 w-6 text-slate-500 dark:text-slate-300" />
                                </button>
                            </div>

                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-40 relative">
                                {/* Cover Image area */}
                            </div>

                            <div className="px-8 pb-8">
                                <div className="relative -mt-16 mb-6 flex justify-between items-end">
                                    <img
                                        src={selectedMentor.image || `https://ui-avatars.com/api/?name=${selectedMentor.name}&background=random`}
                                        alt={selectedMentor.name}
                                        className="h-32 w-32 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                                    />
                                    <div className="flex gap-3 mb-2">
                                        <button className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                            <Globe className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {selectedMentor.name}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                                        <span className="flex items-center">
                                            <Briefcase className="w-4 h-4 mr-1.5 text-indigo-500" />
                                            {selectedMentor.role === 'industry' ? selectedMentor.position : selectedMentor.department}
                                        </span>
                                        <span className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1.5 text-indigo-500" />
                                            {selectedMentor.location || (selectedMentor.company || selectedMentor.college)}
                                        </span>
                                        {selectedMentor.role === 'faculty' && (
                                            <span className="flex items-center">
                                                <GraduationCap className="w-4 h-4 mr-1.5 text-indigo-500" />
                                                {selectedMentor.college}
                                            </span>
                                        )}
                                    </div>

                                    <div className="prose dark:prose-invert max-w-none mb-8">
                                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                                            <User className="w-5 h-5 mr-2 text-indigo-600" />
                                            About
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {selectedMentor.bio}
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                                            <Award className="w-5 h-5 mr-2 text-indigo-600" />
                                            Areas of Expertise
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMentor.skills && selectedMentor.skills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                                        <button
                                            onClick={() => window.location.href = `mailto:${selectedMentor.email}`}
                                            className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all hover:scale-[1.02]"
                                        >
                                            <Mail className="w-5 h-5 mr-2" />
                                            Request Mentorship
                                        </button>
                                        <button className="flex-1 flex items-center justify-center px-6 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                            <MessageSquare className="w-5 h-5 mr-2" />
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mentorship;
