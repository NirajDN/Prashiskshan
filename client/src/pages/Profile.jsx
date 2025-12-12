import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { User, Book, Calculator, FileText, Upload, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        college: '',
        cgpa: '',
        skills: '',
        bio: ''
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get('http://localhost:5001/api/users/me', {
                    headers: { 'x-auth-token': token }
                });
                setUser(res.data);
                setFormData({
                    name: res.data.name || '',
                    college: res.data.college || '',
                    cgpa: res.data.cgpa || '',
                    skills: res.data.skills ? res.data.skills.join(', ') : '',
                    bio: res.data.bio || ''
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = e => {
        setResumeFile(e.target.files[0]);
    };

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('name', formData.name);
            data.append('college', formData.college);
            data.append('cgpa', formData.cgpa);
            data.append('skills', formData.skills);
            data.append('bio', formData.bio);
            if (resumeFile) {
                data.append('resume', resumeFile);
            }

            const res = await axios.put('http://localhost:5001/api/users/profile', data, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUser(res.data);
            setMessage('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.msg || 'Error updating profile';
            setMessage(errMsg);

            if (err.response?.status === 401 || err.response?.status === 404) {
                setTimeout(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }, 2000);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
                    <div className="bg-indigo-600 px-6 py-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Your Profile</h1>
                            <p className="mt-2 text-indigo-100">Manage your academic and personal details.</p>
                        </div>
                    </div>

                    <form onSubmit={onSubmit} className="p-8 space-y-6">
                        {message && (
                            <div className={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                {message}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        <User className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={onChange}
                                        className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 py-2 border px-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Bio / About Me
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        name="bio"
                                        rows={3}
                                        value={formData.bio}
                                        onChange={onChange}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                                        placeholder="Brief introduction..."
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    College / University
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        <Book className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="text"
                                        name="college"
                                        value={formData.college}
                                        onChange={onChange}
                                        className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 py-2 border px-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    CGPA / Marks
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        <Calculator className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="text"
                                        name="cgpa"
                                        value={formData.cgpa}
                                        onChange={onChange}
                                        className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 py-2 border px-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Skills (Comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={onChange}
                                    placeholder="React, Java, Python,..."
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 border px-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                                />
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Resume
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-slate-600">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            PDF or Image up to 5MB
                                        </p>
                                        {resumeFile ? (
                                            <p className="text-sm text-green-600 font-medium">Selected: {resumeFile.name}</p>
                                        ) : user?.resume && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Current Resume:</p>
                                                <a href={`http://localhost:5001/${user.resume}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center justify-center gap-1">
                                                    <FileText className="h-4 w-4" /> View Resume
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
