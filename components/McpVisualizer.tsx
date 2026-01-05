import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationProps } from '../types';
import { UserIcon, ProtocolIcon, DatabaseIcon, MessageIcon, ZapIcon, ToolIcon, GithubIcon, FolderIcon, FileTextIcon, GlobeIcon } from './Icons';

// --- Configuration ---
const POS = {
  USER: { x: 16, y: 50 }, // Moved further out
  HOST: { x: 50, y: 50 }, // Centered
  // Exploded Tools
  TOOL_1: { x: 84, y: 25 }, // Moved down to clear top-right label
  TOOL_2: { x: 84, y: 50 }, // Centered
  TOOL_3: { x: 84, y: 75 }, // Bottom
};

// --- Logs ---
const LOGS = {
  idle: "MCP Host connected to Log Search MCP Tool, DB MCP Tool, and Search Web Tool.",
  input: "User asks: 'Why is the login API failing?'",
  process_start: "Host analyzes request: Needs Error Details + DB Logs.",
  action: "Routing: Call Log Search (read_errors) & DB Tool (get_logs)...",
  return: "Received: 'AuthError: Invalid Token' and 'Timeout in DB'.",
  synthesis: "Synthesizing full diagnosis...",
  complete: "Response: 'Token invalid despite active session in DB.'"
};

export const McpVisualizer: React.FC<SimulationProps> = ({ step, isCompact = false }) => {
  const isAction = step === 'action';
  const isReturn = step === 'return';
  const isSynthesis = step === 'synthesis';
  const isComplete = step === 'complete';
  const isInput = step === 'input';
  const isProcessing = step === 'process_start';

  // Helper for node rendering
  const Node = ({ x, y, icon: Icon, label, subLabel, color, isActive, activeColor, description }: any) => {
    const widthClass = isCompact ? "w-24 md:w-32" : "w-32 md:w-48";
    const iconSizeClass = isCompact ? "w-5 h-5 md:w-6 md:h-6" : "w-6 h-6 md:w-8 md:h-8";
    const titleClass = isCompact ? "text-[11px] md:text-xs" : "text-xs md:text-sm";
    const descClass = isCompact ? "text-[8px] md:text-[9px]" : "text-[9px] md:text-[10px]";
    const pPadding = isCompact ? "p-2.5" : "p-4";
    const iconPadding = isCompact ? "p-2" : "p-3";

    return (
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 ${widthClass} transition-all duration-500`}
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        {/* Glow Effect */}
        {isActive && (
          <div className={`absolute inset-0 bg-${activeColor}-500/30 blur-[50px] rounded-full scale-125 animate-pulse`} />
        )}

        {/* Card Container - 3D Glass Effect */}
        <div
          className={`
          relative flex flex-col items-center ${pPadding} rounded-2xl border transition-all duration-200 w-full group
          ${isActive
              ? `bg-white border-orange-400 border-b-4 border-b-orange-500 shadow-xl shadow-orange-500/20 scale-[1.02] z-30`
              : `bg-white border-orange-200 border-b-4 border-b-orange-300 shadow-sm z-10 hover:border-orange-300 hover:border-b-orange-400 hover:-translate-y-0.5`
            }
        `}
        >
          <div className={`${iconPadding} rounded-xl mb-1.5 transition-all duration-200 ${isActive ? `bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md transform scale-105` : `bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600`}`}>
            <Icon className={iconSizeClass} />
          </div>

          <div className="text-center w-full">
            <div className={`${titleClass} font-bold mb-0.5 tracking-wide ${isActive ? `text-slate-800` : 'text-slate-600'}`}>
              {label}
            </div>
            {!isCompact && (
              <div className={`${descClass} font-medium leading-relaxed px-1 line-clamp-2 ${isActive ? `text-orange-600` : 'text-slate-400'}`}>
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  };

  // Small Satellite Node for tools
  const ToolNode = ({ x, y, icon: Icon, label, color, isActive, description }: any) => {
    const widthClass = isCompact ? "w-24 md:w-32" : "w-32 md:w-48";
    const iconSizeClass = isCompact ? "w-3.5 h-3.5" : "w-4 h-4";
    const titleClass = isCompact ? "text-[10px] md:text-[11px]" : "text-[11px] md:text-xs";
    const descClass = isCompact ? "text-[8px] md:text-[9px]" : "text-[9px] md:text-[10px]";
    const pPadding = isCompact ? "p-2" : "p-2.5";

    return (
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-start gap-1 ${pPadding} rounded-xl border transition-all duration-200 z-10 ${widthClass} group
       ${isActive
            ? `bg-white border-${color}-400 border-b-4 border-b-${color}-500 shadow-xl shadow-${color}-500/20 scale-[1.02]`
            : 'bg-white border-slate-200 border-b-4 border-b-slate-100 shadow-sm hover:border-slate-300 hover:border-b-slate-200 hover:-translate-y-0.5'
          }`}
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        <div className="flex items-center gap-2 w-full">
          <div className={`p-1.5 rounded-lg transition-colors duration-200 ${isActive ? `bg-gradient-to-br from-${color}-500 to-${color}-600 text-white shadow-md` : `bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-${color}-500`}`}>
            <Icon className={iconSizeClass} />
          </div>
          <div className={`${titleClass} font-bold leading-tight ${isActive ? `text-slate-800` : 'text-slate-700'}`}>{label}</div>
        </div>
        {!isCompact && (
          <div className={`${descClass} leading-tight pl-0.5 mt-0.5 line-clamp-1 ${isActive ? `text-${color}-600` : 'text-slate-400'}`}>{description}</div>
        )}
      </div>
    )
  };

  return (
    <div className="w-full h-full relative font-sans text-slate-800 overflow-hidden bg-slate-50/50">
      <style>{`
        :root {
          --orange-rgb: 249, 115, 22;
          --emerald-rgb: 16, 185, 129;
          --blue-rgb: 59, 130, 246;
          --slate-rgb: 100, 116, 139;
        }
      `}</style>

      {/* --- LARGE WATERMARK ICON --- */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.07] pointer-events-none z-0">
        <ProtocolIcon className="w-64 h-64 text-orange-900 transform -rotate-12" />
      </div>

      {/* Modern Background - Different tone for MCP */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />


      {/* Header */}
      <div className="absolute top-4 left-6 z-30 pointer-events-none select-none">
        <div className="flex flex-col items-start gap-2">
          <div className="text-xs font-medium text-orange-600/80 uppercase tracking-widest pl-1">Model Context Protocol</div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm">
              <ProtocolIcon className="w-8 h-8 text-orange-600 animate-pulse" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-orange-700 tracking-tight drop-shadow-sm">MCP</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 top-0">

        {/* --- Connections --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrow-orange" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 L0,0" fill="#EA580C" />
            </marker>
            <marker id="arrow-emerald" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 L0,0" fill="#059669" />
            </marker>
            <marker id="arrow-blue-mcp" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 L0,0" fill="#2563EB" />
            </marker>
          </defs>

          {/* Path 1: User -> Protocol */}
          <path
            d={`M ${POS.USER.x + 8} ${POS.USER.y} L ${POS.HOST.x - 8} ${POS.HOST.y}`}
            stroke={isInput || isComplete ? "#EA580C" : "#E2E8F0"}
            strokeWidth={isInput || isComplete ? "1.5" : "0.5"}
            fill="none"
            markerEnd={isInput || isComplete ? "url(#arrow-orange)" : ""}
            className="transition-all duration-500 drop-shadow-sm"
          />

          {/* Path 2: Host <-> Error Logs (Active) */}
          <path
            d={`M ${POS.HOST.x + 8} ${POS.HOST.y} C ${POS.HOST.x + 20} ${POS.HOST.y}, ${POS.TOOL_1.x - 20} ${POS.TOOL_1.y}, ${POS.TOOL_1.x - 10} ${POS.TOOL_1.y}`}
            stroke={isAction || isReturn ? "#059669" : "#CBD5E1"}
            strokeWidth={isAction || isReturn ? "1.2" : "0.4"}
            fill="none"
            markerEnd={isAction ? "url(#arrow-emerald)" : ""}
            strokeDasharray={isAction || isReturn ? "0" : "4 4"}
            className="transition-all duration-500 drop-shadow-sm"
          />

          {/* Path 3: Host <-> DB (Active) */}
          <path
            d={`M ${POS.HOST.x + 8} ${POS.HOST.y} L ${POS.TOOL_2.x - 10} ${POS.TOOL_2.y}`}
            stroke={isAction || isReturn ? "#2563EB" : "#CBD5E1"}
            strokeWidth={isAction || isReturn ? "1.2" : "0.4"}
            fill="none"
            markerEnd={isAction ? "url(#arrow-blue-mcp)" : ""}
            strokeDasharray={isAction || isReturn ? "0" : "4 4"}
            className="transition-all duration-500 drop-shadow-sm"
          />

          {/* Path 4: Host <-> Files (Inactive) */}
          <path
            d={`M ${POS.HOST.x + 8} ${POS.HOST.y} C ${POS.HOST.x + 20} ${POS.HOST.y}, ${POS.TOOL_3.x - 20} ${POS.TOOL_3.y}, ${POS.TOOL_3.x - 10} ${POS.TOOL_3.y}`}
            stroke="#CBD5E1"
            strokeWidth="0.4"
            strokeDasharray="4 4"
            fill="none"
          />
        </svg>

        {/* --- Nodes --- */}

        <Node
          x={POS.USER.x} y={POS.USER.y}
          icon={UserIcon} label="User + Client" subLabel="Initiator" color="slate"
          isActive={isInput || isComplete} activeColor="orange"
          description="Asks: 'Why login failing?'"
        />

        <Node
          x={POS.HOST.x} y={POS.HOST.y}
          icon={ProtocolIcon} label="MCP Host" subLabel="Coordinator" color="orange"
          isActive={isProcessing || isSynthesis || isInput || isComplete} activeColor="orange"
          description="Connects to tools."
        />

        {/* Exploded Tools */}
        <ToolNode
          x={POS.TOOL_1.x} y={POS.TOOL_1.y}
          icon={FileTextIcon} label="Log Search MCP Tool" color="emerald"
          isActive={isAction || isReturn}
          description="Recent system errors"
        />
        <ToolNode
          x={POS.TOOL_2.x} y={POS.TOOL_2.y}
          icon={DatabaseIcon} label="DB MCP Tool" color="blue"
          isActive={isAction || isReturn}
          description="Reads system_logs"
        />
        <ToolNode
          x={POS.TOOL_3.x} y={POS.TOOL_3.y}
          icon={GlobeIcon} label="Search Web MCP Tool" color="indigo"
          isActive={false}
          description="Live internet data"
        />


        {/* --- Moving Packets --- */}

        {/* 1. Prompt Packet (User -> Host) */}
        <AnimatePresence>
          {isInput && (
            <motion.div
              className="absolute z-50 top-0 left-0"
              initial={{ left: `${POS.USER.x}%`, top: `${POS.USER.y}%` }}
              animate={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
              transition={{ duration: 1.5, ease: "linear" }}
              style={{ marginLeft: '-20px', marginTop: '-25px' }}
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                <MessageIcon className="w-3 h-3 text-white" />
                Prompt
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Tool Calls (Host -> Error Logs & DB) */}
        <AnimatePresence>
          {isAction && (
            <>
              {/* To Error Logs */}
              <motion.div
                className="absolute z-50 top-0 left-0"
                initial={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                animate={{ left: `${POS.TOOL_1.x}%`, top: `${POS.TOOL_1.y}%` }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ marginLeft: '-20px', marginTop: '-25px' }}
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                  <ZapIcon className="w-3 h-3 text-white" />
                  Read Errors
                </div>
              </motion.div>
              {/* To DB */}
              <motion.div
                className="absolute z-50 top-0 left-0"
                initial={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                animate={{ left: `${POS.TOOL_2.x}%`, top: `${POS.TOOL_2.y}%` }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ marginLeft: '-20px', marginTop: '-15px' }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                  <ZapIcon className="w-3 h-3 text-white" />
                  Check Logs
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 3. Result (Error Logs -> Host) */}
        <AnimatePresence>
          {isReturn && (
            <>
              <motion.div
                className="absolute z-50 top-0 left-0"
                initial={{ left: `${POS.TOOL_1.x}%`, top: `${POS.TOOL_1.y}%` }}
                animate={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ marginLeft: '-20px', marginTop: '-25px' }}
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                  <ToolIcon className="w-3 h-3 text-white" />
                  Log Results
                </div>
              </motion.div>
              <motion.div
                className="absolute z-50 top-0 left-0"
                initial={{ left: `${POS.TOOL_2.x}%`, top: `${POS.TOOL_2.y}%` }}
                animate={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ marginLeft: '-20px', marginTop: '-25px' }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                  <ToolIcon className="w-3 h-3 text-white" />
                  Log Rows
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 4. Final Answer (Host -> User) */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="absolute z-50 top-0 left-0"
              initial={{ left: `${POS.HOST.x}%`, top: `${POS.HOST.y}%` }}
              animate={{ left: `${POS.USER.x}%`, top: `${POS.USER.y}%` }}
              transition={{ duration: 1.5, ease: "linear" }}
              style={{ marginLeft: '-20px', marginTop: '-25px' }}
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                <MessageIcon className="w-3 h-3 text-white" />
                Diagnosis
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal / Log Footer */}
      <div className="absolute bottom-0 w-full bg-slate-50/90 backdrop-blur border-t border-slate-200 px-3 py-2 font-mono text-[10px] text-orange-900 flex items-center gap-3 shadow-sm z-40">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
        <span className="opacity-60 text-slate-500 shrink-0 font-bold">STATUS_</span>
        <span className="font-semibold tracking-wide truncate opacity-90">{LOGS[step] || "Idle"}</span>
      </div>
    </div>
  );
};