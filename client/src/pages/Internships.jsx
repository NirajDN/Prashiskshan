import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { MapPin, Building, Banknote } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleApply = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const host = window.location.hostname;
            await axios.post(`http://${host}:5001/api/applications`,
                { internshipId: id },
                { headers: { 'x-auth-token': token } }
            );
            alert('Application submitted successfully!');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Error applying for internship');
        }
    };

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const host = window.location.hostname;
                const res = await axios.get(`http://${host}:5001/api/internships`);
                setInternships(res.data);
            } catch (err) {
                console.error("Error fetching internships:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 opacity-90"></div>
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight animate-fade-in-up">
                        Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Career</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 animate-fade-in-up animation-delay-200">
                        Discover internships that match your skills and aspirations.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-20 relative z-20">
                {loading ? (
                    <div className="flex justify-center items-center h-64 bg-white dark:bg-slate-800 rounded-3xl shadow-xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {internships.map((internship, index) => (
                            <div
                                key={internship._id || internship.id}
                                className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl shadow-sm">
                                            {internship.company.charAt(0)}
                                        </div>
                                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wide bg-indigo-50 text-indigo-600 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                            {internship.type}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                                        {internship.title}
                                    </h3>

                                    <div className="flex items-center text-slate-500 dark:text-slate-400 mb-6 font-medium">
                                        <Building className="h-4 w-4 mr-2 text-indigo-400" />
                                        <span>{internship.company}</span>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                                            <MapPin className="h-4 w-4 mr-3 text-slate-400" />
                                            {internship.location}
                                        </div>
                                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                                            <Banknote className="h-4 w-4 mr-3 text-green-500" />
                                            {internship.stipend}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleApply(internship._id)}
                                        className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Internships;
