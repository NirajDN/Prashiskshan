import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, GraduationCap, Users } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 isolation-auto">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900"></div>
                {/* Animated Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-violet-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] bg-blue-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-[url('https://assets.codepen.io/1462889/grid-pattern.png')] opacity-10"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 flex flex-col md:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        New: AI-Powered Matches
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        <span className="block animate-fade-in-up animation-delay-100">Bridging the Gap</span>
                        <span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 animate-gradient-xy animate-fade-in-up animation-delay-200">
                            Classroom to Career
                        </span>
                    </h1>

                    <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto md:mx-0 mb-8 animate-fade-in-up animation-delay-300 leading-relaxed">
                        Prashikshan creates a seamless ecosystem where students, faculty, and industry leaders collide to build the future of technology.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up animation-delay-500">
                        <Link to="/internships" className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                            <span className="relative z-10 flex items-center">
                                Find Opportunities <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link to="/register" className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                            Join the Network
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-8 justify-center md:justify-start text-slate-400 text-sm font-medium animate-fade-in-up animation-delay-500 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <div className="flex -space-x-3">
                            {['Rahul', 'Priya', 'Amit', 'Sneha'].map((name, i) => (
                                <img key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff`} alt={name} title={name} />
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs text-white">
                                +2k
                            </div>
                        </div>
                        <p>Trusted by 5,000+ students</p>
                    </div>
                </div>
                <div className="flex-1 w-full max-w-lg md:max-w-xl relative perspective-[2000px] animate-fade-in-up animation-delay-300">
                    {/* Decorative Elements around graphics */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur-2xl opacity-20 animate-pulse"></div>

                    <div className="relative grid grid-cols-2 gap-4">
                        <div className="space-y-4 animate-float">
                            <div className="bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl transform rotate-[-2deg]">
                                <div className="h-10 w-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-3">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div className="h-2 w-24 bg-slate-700 rounded mb-2"></div>
                                <div className="h-2 w-16 bg-slate-700/50 rounded"></div>
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl transform translate-x-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500"></div>
                                    <div>
                                        <div className="h-2 w-20 bg-slate-700 rounded mb-1"></div>
                                        <div className="h-2 w-12 bg-slate-700/50 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-20 bg-slate-900/50 rounded-xl w-full"></div>
                            </div>
                        </div>
                        <div className="space-y-4 pt-12 animate-float animation-delay-2000">
                            <div className="bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl transform rotate-[2deg]">
                                <div className="h-10 w-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-3">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div className="h-2 w-24 bg-slate-700 rounded mb-2"></div>
                                <div className="h-2 w-20 bg-slate-700/50 rounded mb-2"></div>
                                <div className="flex gap-1 mt-3">
                                    <div className="h-6 w-12 bg-emerald-500/10 rounded-full"></div>
                                    <div className="h-6 w-12 bg-blue-500/10 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
