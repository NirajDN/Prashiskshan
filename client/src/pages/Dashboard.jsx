import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Plus, X, Check, XCircle, Eye, Download } from 'lucide-react';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPostModal, setShowPostModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null); // For viewing applicant details

    // Form for new internship
    const [newInternship, setNewInternship] = useState({
        title: '',
        location: '',
        stipend: '',
        type: 'Remote',
        description: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(storedUser));
        fetchData(JSON.parse(storedUser), token);
    }, [navigate]);

    const fetchData = async (currentUser, token) => {
        try {
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };

            let endpoint = '';
            if (currentUser.role === 'student') endpoint = 'http://localhost:5001/api/applications/student';
            else if (currentUser.role === 'industry') endpoint = 'http://localhost:5001/api/applications/industry';
            else if (currentUser.role === 'faculty') endpoint = 'http://localhost:5001/api/applications/all';

            if (endpoint) {
                const res = await axios.get(endpoint, config);
                setApplications(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePostInternship = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                }
            };

            await axios.post('http://localhost:5001/api/internships', newInternship, config);

            setShowPostModal(false);
            setNewInternship({ title: '', location: '', stipend: '', type: 'Remote', description: '' });
            alert('Internship posted successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to post internship');
        }
    };

    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5001/api/applications/${appId}/status`,
                { status: newStatus },
                {
                    headers: { 'x-auth-token': token }
                }
            );

            // Update local state
            setApplications(applications.map(app =>
                app._id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.msg || 'Failed to update status';
            alert(errMsg);

            // Force Logout if unauthorized (fixes stale token issues)
            if (err.response?.status === 401 || err.response?.status === 404) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
    };

    const openApplicantModal = (applicant) => {
        setSelectedApplicant(applicant);
    }

    if (loading) return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <LayoutDashboard className="h-8 w-8 text-indigo-600" />
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome back, {user.name}!</p>
                    </div>
                    {user.role === 'industry' && (
                        <button
                            onClick={() => setShowPostModal(true)}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                        >
                            <Plus className="h-5 w-5" />
                            Post Internship
                        </button>
                    )}
                </div>

                {/* Dashboard Stats / Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    {user.role === 'industry' ? 'Total Applicants' : 'Total Applications'}
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{applications.length}</p>
                            </div>
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600">
                                <FileText className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {user.role === 'student' ? 'My Applications' : 'Recent Applications'}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                            <thead className="bg-gray-50 dark:bg-slate-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Internship</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                                    {user.role !== 'student' && (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                                    )}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Applied</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    {user.role !== 'student' && (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                {applications.length > 0 ? (
                                    applications.map((app) => (
                                        <tr key={app._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{app.internship?.title || 'Unknown Internship'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{app.internship?.company || 'Unknown Company'}</div>
                                            </td>
                                            {user.role !== 'student' && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition" onClick={() => openApplicantModal(app.student)}>
                                                        <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                            {app.student?.name?.charAt(0) || 'U'}
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">{app.student?.name}</div>
                                                            <div className="text-xs text-gray-500">{app.student?.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(app.appliedAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            {user.role !== 'student' && (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex gap-2">
                                                        {app.status !== 'accepted' && (
                                                            <button onClick={() => handleStatusUpdate(app._id, 'accepted')} className="text-green-600 hover:text-green-900 bg-green-50 p-1 rounded" title="Accept">
                                                                <Check className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                        {app.status !== 'rejected' && (
                                                            <button onClick={() => handleStatusUpdate(app._id, 'rejected')} className="text-red-600 hover:text-red-900 bg-red-50 p-1 rounded" title="Reject">
                                                                <XCircle className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                        <button onClick={() => openApplicantModal(app.student)} className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1 rounded" title="View Profile">
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={user.role === 'student' ? 5 : 6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No applications found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Post Internship Modal */}
            {showPostModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowPostModal(false)}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                                        Post New Internship
                                    </h3>
                                    <button onClick={() => setShowPostModal(false)} className="text-gray-400 hover:text-gray-500">
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <form onSubmit={handlePostInternship} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
                                            <input
                                                type="text"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white sm:text-sm py-2 px-3 border"
                                                value={newInternship.title}
                                                onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                                            <input
                                                type="text"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white sm:text-sm py-2 px-3 border"
                                                value={newInternship.location}
                                                onChange={(e) => setNewInternship({ ...newInternship, location: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stipend</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. ₹15,000/mo"
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white sm:text-sm py-2 px-3 border"
                                                value={newInternship.stipend}
                                                onChange={(e) => setNewInternship({ ...newInternship, stipend: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                                            <select
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white sm:text-sm py-2 px-3 border"
                                                value={newInternship.type}
                                                onChange={(e) => setNewInternship({ ...newInternship, type: e.target.value })}
                                            >
                                                <option>Remote</option>
                                                <option>On-site</option>
                                                <option>Hybrid</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                                Post Opportunity
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Applicant Profile Modal */}
            {selectedApplicant && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedApplicant(null)}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center mb-4 border-b pb-2 dark:border-slate-700">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Applicant Profile</h3>
                                    <button onClick={() => setSelectedApplicant(null)} className="text-gray-400 hover:text-gray-500">
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl">
                                            {selectedApplicant.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedApplicant.name}</h4>
                                            <p className="text-gray-500 dark:text-gray-400">{selectedApplicant.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">College</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{selectedApplicant.college || 'Not visible'}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">CGPA/Marks</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{selectedApplicant.cgpa || 'Not visible'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedApplicant.skills && selectedApplicant.skills.length > 0 ? (
                                                selectedApplicant.skills.map((skill, index) => (
                                                    <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full dark:bg-indigo-900/30 dark:text-indigo-300">
                                                        {skill}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-500 text-sm">No skills listed</span>
                                            )}
                                        </div>
                                    </div>

                                    {selectedApplicant.bio && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">About</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">{selectedApplicant.bio}</p>
                                        </div>
                                    )}

                                    {selectedApplicant.resume ? (
                                        <div className="pt-2">
                                            <a
                                                href={`http://localhost:5001/${selectedApplicant.resume}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                                            >
                                                <Download className="h-4 w-4" /> Download Resume
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="pt-2 text-center text-sm text-gray-500 italic">
                                            No resume uploaded
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
