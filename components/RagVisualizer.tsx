import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationProps } from '../types';
import { UserIcon, BrainIcon, LayersIcon, FileTextIcon, SearchIcon, MessageIcon, DatabaseIcon } from './Icons';

// --- Configuration ---
// --- Configuration ---
const POS = {
  USER: { x: 16, y: 60 }, // Moved further out for spacing
  DOCS: { x: 50, y: 22 }, // Moved up for better visibility (was 28)
  DB: { x: 50, y: 60 }, // Centered
  LLM: { x: 84, y: 60 }, // Moved further out for spacing
};

// --- Logs per step ---
const LOGS = {
  idle: "System standing by...",
  input: "User asks: 'How do I reset the API key?'",
  process_start: "Converting query to vector embedding...",
  action: "Scanning Vector Database for semantic matches...",
  return: "Found relevant sections in 'Platform Docs v2.pdf'...",
  synthesis: "LLM reading retrieved context...",
  complete: "Generating answer based on documentation..."
};

export const RagVisualizer: React.FC<SimulationProps> = ({ step, isCompact = false }) => {
  const isAction = step === 'action';
  const isReturn = step === 'return';
  const isSynthesis = step === 'synthesis';
  const isComplete = step === 'complete';
  const isInput = step === 'input' || step === 'process_start';

  // Helper for node rendering
  const Node = ({ x, y, icon: Icon, label, subLabel, color, isActive, activeColor, description, size, tip, tipPos = 'top' }: any) => {
    // Determine size based on explicit prop or isCompact mode
    const finalSize = size || (isCompact ? "small" : "normal");

    const widthClass = finalSize === "small" ? "w-24 md:w-32" : "w-32 md:w-48";
    const iconSizeClass = finalSize === "small" ? "w-5 h-5 md:w-6 md:h-6" : "w-6 h-6 md:w-8 md:h-8";
    const titleClass = finalSize === "small" ? "text-[11px] md:text-xs" : "text-xs md:text-sm";
    const descClass = finalSize === "small" ? "text-[8px] md:text-[9px]" : "text-[9px] md:text-[10px]";
    const pPadding = finalSize === "small" ? "p-2.5" : "p-4";
    const iconPadding = finalSize === "small" ? "p-2" : "p-3";

    // Tip Positioning Logic
    let tipPositionClass = "";
    switch (tipPos) {
      case 'top': tipPositionClass = "-top-7 left-1/2 -translate-x-1/2"; break;
      case 'bottom': tipPositionClass = "-bottom-7 left-1/2 -translate-x-1/2"; break;
      case 'left': tipPositionClass = "top-1/2 -left-20 -translate-y-1/2"; break;
      case 'right': tipPositionClass = "top-1/2 -right-20 -translate-y-1/2"; break;
      case 'top-right': tipPositionClass = "-top-6 -right-10"; break;
      default: tipPositionClass = "-top-6 left-1/2 -translate-x-1/2";
    }

    return (
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 ${widthClass} transition-all duration-500`}
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        {/* Glow Effect */}
        {isActive && (
          <div className={`absolute inset-0 bg-${activeColor}-500/30 blur-[50px] rounded-full scale-125 animate-pulse`} />
        )}

        {/* Smart Tip Pill */}
        {tip && (
          <div className={`absolute ${tipPositionClass} z-40 whitespace-nowrap pointer-events-none`}>
            <div className={`bg-${color}-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-${color}-500/20 border border-white/10 flex items-center gap-1.5 transform transition-all duration-500`}>
              <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
              {tip}
            </div>
          </div>
        )}

        {/* Card Container - Filled on Highlight */}
        <div
          className={`
          relative flex flex-col items-center ${pPadding} rounded-2xl border transition-all duration-200 w-full group
          ${isActive
              ? `bg-white border-blue-400 border-b-4 border-b-blue-500 shadow-xl shadow-blue-500/20 scale-[1.02] z-30`
              : `bg-white border-blue-200 border-b-4 border-b-blue-300 shadow-sm z-10 hover:border-blue-300 hover:border-b-blue-400 hover:-translate-y-0.5`
            }
        `}
        >
          <div className={`${iconPadding} rounded-xl mb-1.5 transition-all duration-200 ${isActive ? `bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md transform scale-105` : `bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600`}`}>
            <Icon className={iconSizeClass} />
          </div>

          <div className="text-center w-full">
            <div className={`${titleClass} font-bold mb-0.5 tracking-wide ${isActive ? `text-slate-800` : 'text-slate-600'}`}>
              {label}
            </div>
            {!isCompact && (
              <div className={`${descClass} font-medium leading-relaxed px-1 line-clamp-2 ${isActive ? `text-blue-600` : 'text-slate-400'}`}>
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="w-full h-full relative font-sans text-slate-800 overflow-hidden bg-slate-50/50">
      <style>{`
        :root {
          --blue-rgb: 59, 130, 246;
          --indigo-rgb: 99, 102, 241;
          --green-rgb: 34, 197, 94;
          --slate-rgb: 100, 116, 139;
        }
      `}</style>

      {/* --- LARGE WATERMARK ICON --- */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.07] pointer-events-none z-0">
        <DatabaseIcon className="w-64 h-64 text-blue-900 transform -rotate-12" />
      </div>

      {/* Modern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* Header */}
      <div className="absolute top-4 left-6 z-30 pointer-events-none select-none">
        <div className="flex flex-col items-start gap-2">
          <div className="text-xs font-medium text-blue-600/80 uppercase tracking-widest pl-1">Retrieval-Augmented Generation</div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
              <DatabaseIcon className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-blue-700 tracking-tight drop-shadow-sm">RAG</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Diagram Area */}
      <div className="absolute inset-0 top-0">

        {/* --- Connections --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrow-blue" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 L0,0" fill="#2563EB" />
            </marker>
            <marker id="arrow-green" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 L0,0" fill="#16A34A" />
            </marker>
            <marker id="arrow-indigo" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 L0,0" fill="#4F46E5" />
            </marker>
            <marker id="arrow-slate" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 L0,0" fill="#94A3B8" />
            </marker>
            {/* Gradient Definitions for Lines */}
            <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>

          {/* Path 0: Docs -> DB (Indexing) - Flow Animation */}
          <path
            d={`M ${POS.DOCS.x} ${POS.DOCS.y + 12} L ${POS.DB.x} ${POS.DB.y - 12}`}
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
            markerEnd="url(#arrow-blue)"
            strokeDasharray="4 4"
            className="animate-[dash_20s_linear_infinite] opacity-60"
          />
          <style>{`
            @keyframes dash {
              to {
                stroke-dashoffset: -100;
              }
            }
          `}</style>

          {/* Path 1: User -> Retrieval */}
          <path
            d={`M ${POS.USER.x + 8} ${POS.USER.y} L ${POS.DB.x - 8} ${POS.DB.y}`}
            stroke={isInput || isAction ? "#2563EB" : "#CBD5E1"}
            strokeWidth={isInput || isAction ? "1.5" : "0.5"}
            fill="none"
            markerEnd={isInput || isAction ? "url(#arrow-blue)" : ""}
            className="transition-all duration-500 drop-shadow-sm"
          />

          {/* Path 2: Retrieval -> LLM */}
          <path
            d={`M ${POS.DB.x + 8} ${POS.DB.y} L ${POS.LLM.x - 8} ${POS.LLM.y}`}
            stroke={isReturn ? "#4F46E5" : "#CBD5E1"}
            strokeWidth={isReturn ? "1.5" : "0.5"}
            fill="none"
            markerEnd={isReturn ? "url(#arrow-indigo)" : ""}
            className="transition-all duration-500 drop-shadow-sm"
          />

          {/* Path 3: LLM -> User (Curved Return) */}
          <path
            d={`M ${POS.LLM.x} ${POS.LLM.y + 12} C ${POS.LLM.x} 90, ${POS.USER.x} 90, ${POS.USER.x} ${POS.USER.y + 12}`}
            stroke={isComplete ? "#16A34A" : "#CBD5E1"}
            strokeWidth={isComplete ? "1.5" : "0.5"}
            fill="none"
            markerEnd={isComplete ? "url(#arrow-green)" : ""}
            className="transition-all duration-500 drop-shadow-sm"
          />
        </svg>

        {/* --- Nodes --- */}

        {/* Indexing Badge (Matched Style) */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${POS.DOCS.x}%`, top: `${(POS.DOCS.y + POS.DB.y) / 2}%` }}
        >
          <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-full px-3 py-1 shadow-sm">
            <div className="text-[9px] md:text-[10px] font-bold text-slate-500 font-sans flex items-center gap-1.5 uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
              Indexing
            </div>
          </div>
        </div>

        <Node
          id="user"
          x={POS.USER.x} y={POS.USER.y}
          icon={UserIcon}
          label="User"
          subLabel="Prompt"
          color="slate"
          isActive={isInput || isComplete}
          activeColor={isComplete ? "green" : "blue"}
          description="Asks: 'How do I reset keys?'"
          tip="The Asker" tipPos="top"
        />

        {/* Static Docs Node */}
        <Node
          id="docs"
          x={POS.DOCS.x} y={POS.DOCS.y}
          icon={FileTextIcon}
          label="KB"
          subLabel="Source"
          color="slate"
          isActive={false}
          description="text, pdfs, manuals, etc"
          size="small"
          tip="Static Facts" tipPos="right"
        />

        <Node
          id="db"
          x={POS.DB.x} y={POS.DB.y}
          icon={LayersIcon}
          label="Vector DB"
          subLabel="Retrieval"
          color="indigo"
          isActive={isAction || isReturn}
          activeColor="indigo"
          description="Storage & Search"
          tip="Semantic Match" tipPos="bottom"
        />

        <Node
          id="llm"
          x={POS.LLM.x} y={POS.LLM.y}
          icon={BrainIcon}
          label="LLM"
          subLabel="Generation"
          color="blue"
          isActive={isSynthesis || isReturn}
          activeColor="blue"
          description="Reasoning Engine"
          tip="The Brain" tipPos="top"
        />

        {/* --- Moving Packets --- */}

        {/* 1. Query Packet */}
        <AnimatePresence>
          {(isInput || isAction) && (
            <motion.div
              className="absolute z-50 top-0 left-0"
              initial={{ left: `${POS.USER.x}%`, top: `${POS.USER.y}%` }}
              animate={{ left: `${POS.DB.x}%`, top: `${POS.DB.y}%` }}
              transition={{ duration: 1.5, ease: "linear" }}
              style={{ marginLeft: '-20px', marginTop: '-25px' }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                <SearchIcon className="w-3 h-3 text-white" />
                Query
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Context Packet */}
        <AnimatePresence>
          {isReturn && (
            <motion.div
              className="absolute z-50 top-0 left-0"
              initial={{ left: `${POS.DB.x}%`, top: `${POS.DB.y}%` }}
              animate={{ left: `${POS.LLM.x}%`, top: `${POS.LLM.y}%` }}
              transition={{ duration: 1.5, ease: "linear" }}
              style={{ marginLeft: '-20px', marginTop: '-25px' }}
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                <FileTextIcon className="w-3 h-3 text-white" />
                Context
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Response Packet */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="absolute z-50"
              initial={{ left: `${POS.LLM.x}%`, top: `${POS.LLM.y}%`, opacity: 1 }}
              animate={{
                left: [`${POS.LLM.x}%`, '50%', `${POS.USER.x}%`],
                top: [`${POS.LLM.y}%`, '85%', `${POS.USER.y}%`]
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ marginLeft: '-20px', marginTop: '-15px' }}
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                <MessageIcon className="w-3 h-3 text-white" />
                Answer
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Terminal / Log Footer */}
      <div className="absolute bottom-0 w-full bg-slate-50/90 backdrop-blur border-t border-slate-200 px-3 py-2 font-mono text-[10px] text-blue-900 flex items-center gap-3 shadow-sm z-40">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
        <span className="opacity-60 text-slate-500 shrink-0 font-bold">STATUS_</span>
        <span className="font-semibold tracking-wide truncate opacity-90">{LOGS[step] || "Idle"}</span>
      </div>
    </div>
  );
};