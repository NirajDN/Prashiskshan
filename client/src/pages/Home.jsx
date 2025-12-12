import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { BookOpen, Users, Briefcase, Award, ArrowRight, CheckCircle, TrendingUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-x-hidden">
            <Navbar />

            <Hero />

            {/* Stats Section - Floating over the divide */}
            <div className="relative z-20 -mt-16 sm:-mt-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-700 overflow-hidden">
                        <div className="p-8 text-center group hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-default">
                            <div className="text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">5k+</div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">Active Students</div>
                        </div>
                        <div className="p-8 text-center group hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-default">
                            <div className="text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">1.2k+</div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">Internships</div>
                        </div>
                        <div className="p-8 text-center group hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-default">
                            <div className="text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">500+</div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">Partners</div>
                        </div>
                        <div className="p-8 text-center group hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-default">
                            <div className="text-4xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform">95%</div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">Placement Rate</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:bg-indigo-900/20"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:bg-blue-900/20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
                            Why Choose Us
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                            Bridging the Gap Between <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Academia and Industry</span>
                        </h2>
                        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                            Our platform provides a seamless ecosystem for students to learn, faculty to guide, and industry to hire.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Student Card */}
                        <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent dark:from-slate-700/50 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <BookOpen className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Students</h3>
                                <ul className="space-y-4 text-gray-600 dark:text-gray-400 mb-8">
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Access premium internships</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Build a verified skill profile</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Get mentorship from experts</span>
                                    </li>
                                </ul>
                                <Link to="/register" className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-500 transition-colors group-hover:translate-x-2 duration-300">
                                    Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Industry Card */}
                        <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-slate-700/50 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <Briefcase className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Industry</h3>
                                <ul className="space-y-4 text-gray-600 dark:text-gray-400 mb-8">
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Hire top-tier academic talent</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Post internships & projects</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Collaborate on R&D</span>
                                    </li>
                                </ul>
                                <Link to="/register" className="inline-flex items-center text-purple-600 font-bold hover:text-purple-500 transition-colors group-hover:translate-x-2 duration-300">
                                    Hire Talent <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Faculty Card */}
                        <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent dark:from-slate-700/50 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="h-16 w-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Faculty</h3>
                                <ul className="space-y-4 text-gray-600 dark:text-gray-400 mb-8">
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Track student progress</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Connect with industry</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="mr-3 bg-green-100 dark:bg-green-900/30 rounded-full p-1"><CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /></div>
                                        <span>Curriculum alignment</span>
                                    </li>
                                </ul>
                                <Link to="/register" className="inline-flex items-center text-pink-600 font-bold hover:text-pink-500 transition-colors group-hover:translate-x-2 duration-300">
                                    Join Now <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-24 bg-white dark:bg-slate-800 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">How It Works</h2>
                        <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">Your journey to success in 3 simple steps</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[20%] left-[16%] w-[68%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 -z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            <div className="group relative text-center">
                                <div className="h-24 w-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-indigo-50 dark:border-slate-700 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                    <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-2xl">1</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create Profile</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed px-4">Sign up and build your comprehensive digital resume with verified skills to stand out.</p>
                            </div>

                            <div className="group relative text-center">
                                <div className="h-24 w-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-purple-50 dark:border-slate-700 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                    <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-2xl">2</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Apply for Jobs</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed px-4">Browse thousands of internships and projects matched to your profile from top companies.</p>
                            </div>

                            <div className="group relative text-center">
                                <div className="h-24 w-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-pink-50 dark:border-slate-700 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                    <div className="h-16 w-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold text-2xl">3</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Get Hired</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed px-4">Ace the interview, get placed, and kickstart your professional career with confidence.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block text-indigo-200">Start your free trial today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                                Get started
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link to="/internships" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Explore Jobs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="h-8 w-8 text-indigo-500" />
                            <span className="font-bold text-2xl">Prashikshan</span>
                        </div>
                        <p className="text-gray-400 max-w-sm">
                            Empowering the next generation of professionals by connecting them with world-class opportunities.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Platform</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/internships" className="hover:text-white transition">Internships</Link></li>
                            <li><Link to="/mentorship" className="hover:text-white transition">Mentorship</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
                    &copy; 2025 Prashikshan. All rights reserved.
                </div>
            </footer>

        </div>
    );
};

export default Home;
