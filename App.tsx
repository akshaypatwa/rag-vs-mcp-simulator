import React, { useState, useEffect, useRef } from 'react';
import { RagVisualizer } from './components/RagVisualizer';
import { McpVisualizer } from './components/McpVisualizer';
import { SimulationStep } from './types';
import { Play, Pause, RefreshCw, Info } from 'lucide-react';
import { LinkedinIcon } from './components/Icons';

const STEPS: SimulationStep[] = [
    'idle',
    'input',
    'process_start',
    'action',
    'return',
    'synthesis',
    'complete'
];

const STEP_DURATIONS = {
    idle: 1000,
    input: 1500,
    process_start: 1000,
    action: 2500,
    return: 2000,
    synthesis: 2000,
    complete: 3000
};

export default function App() {
    const [isPlaying, setIsPlaying] = useState(true); // Auto-start
    const [stepIndex, setStepIndex] = useState(0);
    const [simulationSpeed] = useState(1.5); // Fixed speed
    const timerRef = useRef<number | null>(null);

    const currentStep = STEPS[stepIndex];

    useEffect(() => {
        if (isPlaying) {
            const duration = STEP_DURATIONS[currentStep] / simulationSpeed;
            timerRef.current = window.setTimeout(() => {
                setStepIndex((prev) => (prev + 1) % STEPS.length);
            }, duration);
        } else if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isPlaying, stepIndex, simulationSpeed, currentStep]);

    return (
        <div className="h-screen max-w-[627px] mx-auto bg-slate-300 text-slate-900 flex flex-col font-sans selection:bg-indigo-500/30 overflow-hidden border-x border-slate-400 shadow-2xl relative">

            {/* Global Professional Background - Mesh Gradient (Darker) */}
            <div className="absolute inset-0 z-0 bg-slate-300">
                {/* Mesh Gradient Blobs - Adjusted for darker base */}
                <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-blue-300/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-300/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse delay-1000"></div>
                <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[80px] mix-blend-multiply"></div>

                {/* Subtle Grid Pattern Overlay - Darker for visibility */}
                <div className="absolute inset-0 opacity-[0.4]" style={{
                    backgroundImage: `radial-gradient(#64748b 1.5px, transparent 1.5px)`,
                    backgroundSize: '24px 24px'
                }}></div>
            </div>

            {/* Compact Header - Professional Redesign */}
            <header className="px-6 py-5 border-b border-slate-300/80 bg-white/60 backdrop-blur-xl z-50 shrink-0 flex justify-between items-center relative shadow-sm">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase font-mono">
                        Scenario 01
                    </span>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                        System Diagnosis
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    {/* Live Indicator */}
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Live</span>
                    </div>

                    {/* Profile 3D Pill */}
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-300/50">
                        <div className="group relative flex items-center gap-3 bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-slate-200/60 hover:border-slate-300 rounded-full pr-3 pl-1 py-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="relative">
                                <img
                                    src="/profile.jpg"
                                    alt="Akshay Patwa"
                                    className="w-8 h-8 rounded-full object-cover border border-white shadow-sm ring-1 ring-slate-100"
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 bg-blue-600 rounded-full p-0.5 border border-white">
                                    <LinkedinIcon className="w-2.5 h-2.5 text-white" />
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors mr-1">
                                Akshay Patwa
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content - Flex Column 100% Height */}
            <main className="flex-1 w-full h-full p-4 md:p-6 flex flex-col gap-4 relative z-10">

                {/* Top: RAG */}
                <div className="flex-1 w-full flex items-center gap-6 mx-auto">
                    <div className="relative group flex-1 h-full">
                        {/* 3D Container - RAG */}
                        <div className="relative w-full h-full bg-gradient-to-br from-white to-blue-50/50 rounded-[1.5rem] border border-slate-300 border-b-[6px] border-b-slate-300/80 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">

                            {/* Subtle Grid Pattern for RAG */}
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
                                backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
                                backgroundSize: '24px 24px'
                            }}></div>

                            <RagVisualizer isPlaying={isPlaying} step={currentStep} speed={simulationSpeed} isCompact={true} />

                            {/* Floating Info Label */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-slate-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] px-3 py-1.5 rounded-full flex items-center gap-2 z-50">
                                <h3 className="text-blue-700 text-xs font-bold flex items-center gap-1.5">
                                    <Info className="w-3 h-3" /> RAG
                                </h3>
                                <span className="text-slate-500 text-[10px] border-l border-slate-200 pl-2 font-medium">Docs & Knowledge</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom: MCP */}
                <div className="flex-1 w-full flex items-center gap-6 mx-auto">
                    <div className="relative group flex-1 h-full">
                        {/* 3D Container - MCP */}
                        <div className="relative w-full h-full bg-gradient-to-br from-white to-orange-50/50 rounded-[1.5rem] border border-slate-300 border-b-[6px] border-b-slate-300/80 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">

                            {/* Subtle Dot Pattern for MCP */}
                            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
                                backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}></div>

                            <McpVisualizer isPlaying={isPlaying} step={currentStep} speed={simulationSpeed} isCompact={true} />

                            {/* Floating Info Label */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-slate-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] px-3 py-1.5 rounded-full flex items-center gap-2 z-50">
                                <h3 className="text-orange-700 text-xs font-bold flex items-center gap-1.5">
                                    <Info className="w-3 h-3" /> MCP
                                </h3>
                                <span className="text-slate-500 text-[10px] border-l border-slate-200 pl-2 font-medium">Active Systems</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
