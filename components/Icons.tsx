import React from 'react';
import {
  Database,
  Brain,
  User,
  FileText,
  Search,
  Server,
  Plug,
  Wrench,
  MessageSquare,
  Zap,
  ClipboardList,
  Share2,
  Layers,
  Globe,
  Github,
  Folder,
  Linkedin
} from 'lucide-react';

export const UserIcon = ({ className }: { className?: string }) => <User className={className} />;
export const BrainIcon = ({ className }: { className?: string }) => <Brain className={className} />;
export const DatabaseIcon = ({ className }: { className?: string }) => <Database className={className} />;
export const DocumentIcon = ({ className }: { className?: string }) => <FileText className={className} />;
export const SearchIcon = ({ className }: { className?: string }) => <Search className={className} />;
export const ServerIcon = ({ className }: { className?: string }) => <Server className={className} />;
export const PlugIcon = ({ className }: { className?: string }) => <Plug className={className} />;
export const ToolIcon = ({ className }: { className?: string }) => <Wrench className={className} />;
export const MessageIcon = ({ className }: { className?: string }) => <MessageSquare className={className} />;
export const ZapIcon = ({ className }: { className?: string }) => <Zap className={className} />;
export const ProtocolIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 84.8528L85.8822 16.9706C95.2548 7.59798 110.451 7.59798 119.823 16.9706V16.9706C129.196 26.3431 129.196 41.5391 119.823 50.9117L68.5581 102.177" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
    <path d="M69.2652 101.47L119.823 50.9117C129.196 41.5391 144.392 41.5391 153.765 50.9117L154.118 51.2652C163.491 60.6378 163.491 75.8338 154.118 85.2063L92.7248 146.6C89.6006 149.724 89.6006 154.789 92.7248 157.913L105.331 170.52" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
    <path d="M102.853 33.9411L52.6482 84.1457C43.2756 93.5183 43.2756 108.714 52.6482 118.087V118.087C62.0208 127.459 77.2167 127.459 86.5893 118.087L136.794 67.8822" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
  </svg>
);
export const NetworkIcon = ({ className }: { className?: string }) => <Share2 className={className} />;
export const LayersIcon = ({ className }: { className?: string }) => <Layers className={className} />;
export const GlobeIcon = ({ className }: { className?: string }) => <Globe className={className} />;
export const GithubIcon = ({ className }: { className?: string }) => <Github className={className} />;
export const FolderIcon = ({ className }: { className?: string }) => <Folder className={className} />;
export const FileTextIcon = ({ className }: { className?: string }) => <FileText className={className} />;
export const LinkedinIcon = ({ className }: { className?: string }) => <Linkedin className={className} />;