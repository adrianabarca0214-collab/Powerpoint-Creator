import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// TypeScript declarations for libraries loaded from script tags
declare var PptxGenJS: any;

// --- GLOBAL CONSTANTS AND IONS ---
        
// Custom Lucide-React-style icons as inline SVG
const Eye = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
const Loader2 = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>);
const Download = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>);
const Music = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>);
const FileText = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>);
const XCircle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>);
const Edit = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5L2 22l1.5-5.5L17 3z"/></svg>);
const HandClick = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 11V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"/><path d="M14 11a2 2 0 1 1-4 0V5a2 2 0 1 1 4 0v6z"/><path d="M7 11V4a2 2 0 1 1 4 0v7"/><path d="M7 11a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 1 1-4 0v-4"/><path d="M10 20l4-4"/></svg>);
const Sun = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>);
const Hash = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>);
const Plus = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>);
const Minus = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>);
const ArrowUp = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>);
const ArrowDown = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>);
const ArrowLeft = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>);
const Trash2 = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>);
const Copy = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>);
const File = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>);
const ChevronUp = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>);
const ChevronDown = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>);
const ZoomIn = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>);
const ZoomOut = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>);
const Minimize2 = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/></svg>);
const Save = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>);
const FolderUp = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M12 10v6"/><path d="m15 13-3-3-3 3"/></svg>);
const CheckCircle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const Info = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>);
const Undo2 = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a8.5 8.5 0 1 1 0 17H11"/></svg>);
const Redo2 = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a8.5 8.5 0 1 0 0 17H13"/></svg>);
const AlertTriangle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>);
const Menu = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>);
const BookOpen = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>);
const Search = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>);
const ArrowRight = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>);
const AlignVerticalJustifyStart = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="6" x="5" y="6" rx="2"/><rect width="10" height="6" x="7" y="12" rx="2"/><path d="M2 2v2"/><path d="M22 2v2"/><path d="M2 20v2"/><path d="M22 20v2"/></svg>);
const AlignVerticalJustifyCenter = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="6" x="5" y="2" rx="2"/><rect width="10" height="6" x="7" y="16" rx="2"/><path d="M2 12h20"/></svg>);
const AlignVerticalJustifyEnd = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="6" x="5" y="12" rx="2"/><rect width="10" height="6" x="7" y="6" rx="2"/><path d="M2 2v2"/><path d="M22 2v2"/><path d="M2 20v2"/><path d="M22 20v2"/></svg>);


// Default colors
const DEFAULT_TEXT_COLOR = '#1A1A1A';
const DEFAULT_BG_COLOR = '#FFFFFF';
const DARK_TEXT_COLOR = '#FFFFFF';
const DARK_BG_COLOR = '#1A1A1A'; // Nearly black

// Font Size Tiers (in points)
const DEFAULT_FONT_SIZE = 54;

// Font Family Options
const FONT_FAMILY_OPTIONS = [
    { label: 'Verdana (Standard)', value: 'Verdana' },
    { label: 'Arial (Clean)', value: 'Arial' },
    { label: 'Tahoma (Classic)', value: 'Tahoma' },
    { label: 'Georgia (Serif)', value: 'Georgia' },
    { label: 'Impact (Bold)', value: 'Impact' },
    { label: 'Courier New (Monospace)', value: 'Courier New' },
    { label: 'Inter (Modern)', value: 'Inter' },
];


// Splitting Heuristics (Max limit to trigger a split)
const MAX_LINES_PER_SLIDE = 4;
const MAX_CHARS_PER_SLIDE = 130; 

// A ref to hold a counter for generating unique IDs.
const nextId = (() => {
    let counter = 0;
    return () => {
        counter += 1;
        return Date.now() + counter;
    };
})();

// Initial Song State
const initialSong = { 
    id: nextId(), 
    title: '', 
    lyrics: '',
    isCollapsed: false,
};

// --- Type Definitions for State ---
type SongChunk = { type: 'title' | 'lyric'; text: string; };
type SongWithChunks = typeof initialSong & { chunks?: SongChunk[] };
type SelectedChunk = { songId: number; chunkIndex: number };
type Feedback = { type: 'success' | 'error' | 'info'; message: string };
type LibrarySong = { title: string; lyrics: string };

type LyricVAlign = 'top' | 'middle' | 'bottom';

type AppSettings = {
    textColor: string;
    backgroundColor: string;
    theme: string;
    fontSizeInput: string | number;
    fontFamily: string;
    lyricVAlign: LyricVAlign;
    hasTextShadow: boolean;
};

type ConflictResolution = {
    action: 'update' | 'keep' | 'save_as_new' | 'cancel' | 'dont_save' | 'save_anyway';
    newTitle?: string;
};


// --- Core Logic Functions ---

const validateAndSetFontSize = (sizeInput: string | number): number => {
    const size = parseInt(String(sizeInput), 10);
    if (isNaN(size)) return DEFAULT_FONT_SIZE;
    return Math.max(10, Math.min(size, 100)); // Clamp between 10 and 100
};

// Maps over an array of songs, processes their lyrics, and returns them with generated slide chunks
const generateChunksForSongs = (songsToProcess: SongWithChunks[]): SongWithChunks[] => {
    return songsToProcess.map(song => {
        const sections = song.lyrics.split(/\n{2,}/).map(s => s.trim()).filter(s => s);
        const processedChunks: { text: string }[] = [];

        for (const section of sections) {
            const lines = section.split('\n').map(l => l.trim());
            let chunkLines: string[] = [];

            for (const line of lines) {
                if (line.length === 0) continue;

                const potentialLines = [...chunkLines, line];
                const potentialText = potentialLines.join('\n');
                if (chunkLines.length > 0 && (potentialLines.length > MAX_LINES_PER_SLIDE || potentialText.length > MAX_CHARS_PER_SLIDE)) {
                    processedChunks.push({ text: chunkLines.join('\n') });
                    chunkLines = [line];
                } else {
                    chunkLines.push(line);
                }
            }
            if (chunkLines.length > 0) {
                processedChunks.push({ text: chunkLines.join('\n') });
            }
        }

        const applyTransform = (text: string) => text.toUpperCase();

        const newChunks: SongChunk[] = [
            { type: 'title', text: applyTransform(song.title) },
            ...processedChunks.map(chunk => ({
                type: 'lyric' as 'lyric',
                text: applyTransform(chunk.text),
            })),
        ];

        return { ...song, chunks: newChunks };
    });
};


// --- POWERPOINT GENERATION FUNCTION (FOR DOWNLOAD) ---
const downloadPPTX = (songs: SongWithChunks[], settings: AppSettings, finalFontSize: number, customFilename: string): string => {
    if (typeof PptxGenJS === 'undefined') {
        throw new Error("PowerPoint generation library (PptxGenJS) is not loaded.");
    }
    
    let pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_4x3'; 

    const pptxTextColor = settings.textColor.replace('#', '');
    const pptxBackgroundColor = settings.backgroundColor.replace('#', '');
    
    const shadowOptions = settings.hasTextShadow 
        ? { shadow: { type: 'outer', color: '000000', blur: 2, offset: 2, angle: 45, opacity: 0.4 } }
        : {};

    const lyricTextStyle = {
        align: 'center', 
        valign: settings.lyricVAlign, 
        fontFace: settings.fontFamily, 
        fontSize: finalFontSize, 
        bold: true,
        color: pptxTextColor, 
        autoFit: false,
        breakLine: true,
        ...shadowOptions
    };
    
    const titleTextStyle = {
        x: 0, y: 2.75, w: '100%', h: 2.0, 
        align: 'center', 
        valign: 'middle',
        fontFace: 'Arial Black', 
        fontSize: 68,
        bold: true,
        color: pptxTextColor, 
        ...shadowOptions
    };
    
    const lyricBoxStyle = {
        x: 0, y: 1.25, w: '100%', h: 5,
    };

    songs.forEach(song => {
        if (song.chunks) {
            song.chunks.forEach(chunk => {
                let slide = pptx.addSlide();
                slide.background = { fill: pptxBackgroundColor }; 
                
                if (chunk.type === 'title') {
                    slide.addText(chunk.text, titleTextStyle);
                } else { // 'lyric'
                    slide.addText(chunk.text, { ...lyricBoxStyle, ...lyricTextStyle });
                }
            });
        }
    });

    pptx.writeFile({ fileName: customFilename });
    return customFilename;
};

// --- Reusable Settings Component ---
const GlobalCustomizationSettings = ({
    textColor, setTextColor, backgroundColor, setBackgroundColor, theme, setTheme,
    fontSizeInput, setFontSizeInput, downloadFileName, setDownloadFileName,
    fontFamily, setFontFamily, lyricVAlign, setLyricVAlign, 
    hasTextShadow, setHasTextShadow,
    isLoading
}) => {
    
    const handleFontSizeBlur = () => {
        const validatedSize = validateAndSetFontSize(fontSizeInput);
        if (String(validatedSize) !== String(fontSizeInput)) {
            setFontSizeInput(validatedSize);
        }
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 shadow-inner space-y-4">
                <h3 className="text-base font-bold text-gray-700 dark:text-gray-200">Font & Structure</h3>
                <div className="pt-2">
                    <label htmlFor="file-name-input" className="text-sm font-bold text-gray-700 dark:text-gray-200 block mb-2">
                        <File className="w-4 h-4 inline mr-1 text-indigo-500"/>
                        File Name (e.g., My_Worship_Set)
                    </label>
                    <input
                        id="file-name-input"
                        type="text"
                        value={downloadFileName}
                        onChange={(e) => setDownloadFileName(e.target.value)}
                        disabled={isLoading}
                        placeholder="My_Presentation"
                        title="Enter the filename for saved projects and PPTX downloads"
                        className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150 shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Used for both saved projects and **.pptx** downloads.
                    </p>
                </div>
                <div>
                    <label htmlFor="font-family-select" className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-1">Font Family</label>
                    <div className="relative">
                        <select
                            id="font-family-select"
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            disabled={isLoading}
                            title="Select the font for the lyric slides"
                            className="w-full appearance-none bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 dark:text-white rounded-lg py-2.5 pl-3 pr-10 text-base focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                        >
                            {FONT_FAMILY_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-2">Lyric Position</label>
                    <div className="flex items-center space-x-2 rounded-lg bg-gray-200 dark:bg-gray-600 p-1">
                        {(['top', 'middle', 'bottom'] as const).map((pos) => (
                            <button
                                key={pos}
                                onClick={() => setLyricVAlign(pos)}
                                disabled={isLoading}
                                title={`Align lyrics to the ${pos}`}
                                className={`w-full py-2 px-3 rounded-md text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2
                                    ${lyricVAlign === pos
                                        ? 'bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-md'
                                        : 'text-gray-500 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-500/50'
                                    }
                                `}
                            >
                                {pos === 'top' && <AlignVerticalJustifyStart className="w-5 h-5" />}
                                {pos === 'middle' && <AlignVerticalJustifyCenter className="w-5 h-5" />}
                                {pos === 'bottom' && <AlignVerticalJustifyEnd className="w-5 h-5" />}
                                <span className="capitalize">{pos}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 shadow-inner space-y-4">
                <h3 className="text-base font-bold text-gray-700 dark:text-gray-200">Colors & Style</h3>
                <div className="flex justify-between items-center space-x-4">
                    <div className="text-center w-1/2">
                        <label htmlFor="text-color" className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-1">Text Color</label>
                        <div className="p-1 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-500 transition duration-150 h-12 w-12 mx-auto shadow-md">
                            <input 
                                type="color" 
                                id="text-color" 
                                value={textColor} 
                                onChange={(e) => { setTextColor(e.target.value); setTheme('light'); }}
                                disabled={isLoading}
                                title="Select the text color for all slides"
                                className="color-input-box"
                            />
                        </div>
                    </div>
                    <div className="text-center w-1/2">
                        <label htmlFor="bg-color" className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-1">Background Color</label>
                        <div className="p-1 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-500 transition duration-150 h-12 w-12 mx-auto shadow-md">
                            <input 
                                type="color" 
                                id="bg-color" 
                                value={backgroundColor} 
                                onChange={(e) => { setBackgroundColor(e.target.value); setTheme('light'); }}
                                disabled={isLoading}
                                title="Select the background color for all slides"
                                className="color-input-box"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                        <span className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Sun className="w-4 h-4 mr-2 text-yellow-500"/>
                            Dark Mode
                        </span>
                    <label htmlFor="dark-mode-toggle" title="Toggle high-contrast dark mode preset" className="flex items-center cursor-pointer checkbox-container">
                        <div className="relative">
                            <input 
                                id="dark-mode-toggle" 
                                type="checkbox" 
                                className="sr-only" 
                                checked={theme === 'dark'}
                                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                                disabled={isLoading}
                            />
                            <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full label-element transition duration-300 ease-in-out border-2 border-gray-300 dark:border-gray-500"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300 ease-in-out shadow-inner"></div>
                        </div>
                    </label>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Edit className="w-4 h-4 mr-2 text-indigo-500"/>
                        Text Shadow
                    </span>
                    <label htmlFor="text-shadow-toggle" title="Toggle a subtle shadow on the text" className="flex items-center cursor-pointer checkbox-container">
                        <div className="relative">
                            <input 
                                id="text-shadow-toggle" 
                                type="checkbox" 
                                className="sr-only" 
                                checked={hasTextShadow}
                                onChange={(e) => setHasTextShadow(e.target.checked)}
                                disabled={isLoading}
                            />
                            <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full label-element transition duration-300 ease-in-out border-2 border-gray-300 dark:border-gray-500"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300 ease-in-out shadow-inner"></div>
                        </div>
                    </label>
                </div>
                <div className="pt-2">
                    <label htmlFor="font-size-input" className="text-sm font-bold text-gray-700 dark:text-gray-200 block mb-2">
                        Custom Font Size (10pt - 100pt)
                    </label>
                    <input
                        id="font-size-input"
                        type="number"
                        value={fontSizeInput}
                        onChange={(e) => setFontSizeInput(e.target.value)}
                        onBlur={handleFontSizeBlur}
                        min="10"
                        max="100"
                        disabled={isLoading}
                        placeholder="e.g. 54"
                        title="Set a custom font size for all lyric slides"
                        className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150 shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                    />
                </div>
            </div>
        </div>
    );
};

const OverwriteProjectModal = ({ isOpen, collidingFilename, onClose, onOverwrite, onSaveAsNew }) => {
    const [newFilename, setNewFilename] = useState('');
    const [error, setError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setNewFilename(`${collidingFilename}_copy`);
            setError(null);
            
            const modalNode = modalRef.current;
            if (!modalNode) return;

            const focusableElements = modalNode.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            firstElement?.focus();

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key !== 'Tab') return;
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);

        }
    }, [isOpen, collidingFilename]);

    if (!isOpen) return null;

    const handleSaveAsNew = () => {
        const sanitizedNewFilename = newFilename.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
        if (!sanitizedNewFilename) {
            setError("New filename cannot be empty.");
            return;
        }
        const allProjects = JSON.parse(localStorage.getItem('multiSongProjects') || '{}');
        if (allProjects[sanitizedNewFilename]) {
            setError(`A project named "${sanitizedNewFilename}" also exists. Please choose another name.`);
            return;
        }
        onSaveAsNew(sanitizedNewFilename);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-4 border border-gray-300 dark:border-gray-600">
                <div className="flex items-start space-x-3">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 sm:mx-0 sm:h-10 sm:w-10">
                        <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-white">
                            Project Exists
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                            A project named <strong className="font-semibold text-indigo-600 dark:text-indigo-400">"{collidingFilename}"</strong> already exists. What would you like to do?
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 space-y-2">
                     <label htmlFor="new-filename-input" className="text-sm font-bold text-gray-700 dark:text-gray-200 block">
                        Save as a New Project
                    </label>
                    <input 
                        id="new-filename-input"
                        type="text"
                        value={newFilename}
                        onChange={(e) => setNewFilename(e.target.value)}
                        title="Enter a new, unique filename for this project"
                        className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150 shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                    />
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                     <button
                        onClick={handleSaveAsNew}
                        title="Save the current project with the new filename provided above"
                        className="w-full mt-2 py-2 px-4 rounded-lg text-white font-bold flex items-center justify-center space-x-2 transition duration-150 transform active:scale-95 shadow-md bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50"
                    >
                        <File className="w-5 h-5"/>
                        <span>Save with New Name</span>
                    </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                    <button
                        type="button"
                        title={`Replace the existing project '${collidingFilename}' with the current one`}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onOverwrite}
                    >
                        Overwrite
                    </button>
                    <button
                        type="button"
                        title="Close this dialog and cancel the save action"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Song Library Modal ---
const SongLibraryModal = ({ isOpen, onClose, onAddSongs }) => {
    const [library, setLibrary] = useState<LibrarySong[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            try {
                const storedLibrary = JSON.parse(localStorage.getItem('songLibrary') || '[]');
                if (Array.isArray(storedLibrary)) {
                    setLibrary(storedLibrary);
                }
            } catch {
                setLibrary([]);
            }
            const modalNode = modalRef.current;
            if (!modalNode) return;

            const focusableElements = modalNode.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            firstElement?.focus();

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key !== 'Tab') return;
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const toggleSelection = (title: string) => {
        const newSelection = new Set(selectedSongs);
        if (newSelection.has(title)) {
            newSelection.delete(title);
        } else {
            newSelection.add(title);
        }
        setSelectedSongs(newSelection);
    };

    const handleAddClick = () => {
        const songsToAdd = library.filter(song => selectedSongs.has(song.title));
        onAddSongs(songsToAdd);
        onClose();
    };

    const filteredLibrary = library.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col border border-gray-300 dark:border-gray-600">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Song Library</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select songs to add to your current project.</p>
                </div>

                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input 
                            type="text"
                            placeholder="Search songs by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredLibrary.length > 0 ? (
                        <ul>
                            {filteredLibrary.map(song => (
                                <li key={song.title} className="border-b border-gray-200 dark:border-gray-700">
                                    <label className="flex items-center p-4 space-x-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                        <input 
                                            type="checkbox"
                                            checked={selectedSongs.has(song.title)}
                                            onChange={() => toggleSelection(song.title)}
                                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{song.title}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-8 text-center text-gray-500 dark:text-gray-400">
                            {library.length === 0 ? "Your library is empty. Save a project to add songs here." : "No songs match your search."}
                        </p>
                    )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end space-x-4 rounded-b-xl">
                    <button onClick={onClose} className="py-2 px-4 rounded-lg font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition">Cancel</button>
                    <button 
                        onClick={handleAddClick} 
                        disabled={selectedSongs.size === 0}
                        className="py-2 px-4 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition shadow-md shadow-indigo-500/50"
                    >
                        Add {selectedSongs.size > 0 ? `${selectedSongs.size} ` : ''}Song(s)
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- NEW: Load Project Modal ---
const LoadProjectModal = ({ isOpen, onClose, projects, onLoad, onClearAll }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const modalNode = modalRef.current;
            if (!modalNode) return;

            const focusableElements = modalNode.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            firstElement?.focus();

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key !== 'Tab') return;
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg h-[60vh] flex flex-col border border-gray-300 dark:border-gray-600">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Load Project</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select a project to load into the editor.</p>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {projects.length > 0 ? (
                        <ul>
                            {projects.map(projectName => (
                                <li key={projectName} className="border-b border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => onLoad(projectName)}
                                        className="w-full flex items-center p-4 space-x-4 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition text-left"
                                    >
                                        <FolderUp className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{projectName}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No saved projects found.
                        </p>
                    )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center rounded-b-xl">
                     <button
                        onClick={onClearAll}
                        disabled={projects.length === 0}
                        title="Delete all saved projects from your browser. This cannot be undone."
                        className="py-2 px-4 rounded-lg font-bold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
                    >
                        <Trash2 className="w-4 h-4"/>
                        <span>Clear All</span>
                    </button>
                    <button onClick={onClose} className="py-2 px-4 rounded-lg font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Final Preview Modal ---
const FinalPreviewModal = ({ isOpen, onClose, onConfirmDownload, slides, settings, isLoading }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const activeThumbnailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setCurrentSlideIndex(0); // Reset to first slide on open
        }
    }, [isOpen]);
    
    useEffect(() => {
        // Scroll the active thumbnail into view
        activeThumbnailRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }, [currentSlideIndex]);

    if (!isOpen) return null;

    const currentSlide = slides[currentSlideIndex];
    
    const vAlignClass = {
        top: 'items-start',
        middle: 'items-center',
        bottom: 'items-end'
    }[settings.lyricVAlign];

    const handleNextSlide = () => {
        setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
    };
    
    const handlePrevSlide = () => {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
    };

    const textPreviewClasses = [
        settings.hasTextShadow ? 'preview-text-shadow' : '',
        'uppercase',
    ].join(' ');

    return (
        <div className="preview-modal-overlay" role="dialog" aria-modal="true">
            <div className="preview-modal-content">
                <header className="flex-shrink-0 p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold">Final Presentation Preview</h2>
                    <div className="flex items-center space-x-4">
                        <button onClick={onClose} title="Back to Edit" className="py-2 px-4 rounded-lg font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition flex items-center space-x-2">
                             <ArrowLeft className="w-5 h-5"/>
                             <span>Back to Edit</span>
                        </button>
                        <button
                            onClick={onConfirmDownload}
                            disabled={isLoading}
                            className="py-2 px-4 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300 dark:disabled:bg-green-800 transition shadow-md shadow-green-500/50 flex items-center space-x-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : <Download className="w-5 h-5"/>}
                            <span>{isLoading ? 'Downloading...' : 'Download .pptx'}</span>
                        </button>
                    </div>
                </header>

                <div className="preview-modal-layout">
                    <aside className="thumbnail-sidebar">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                ref={index === currentSlideIndex ? activeThumbnailRef : null}
                                className={`thumbnail-item ${index === currentSlideIndex ? 'active' : ''}`}
                                onClick={() => setCurrentSlideIndex(index)}
                                style={{ backgroundColor: settings.backgroundColor }}
                            >
                                <span className="thumbnail-index">{index + 1}</span>
                                <div className="thumbnail-content uppercase" style={{ color: settings.textColor }}>
                                    {slide.text}
                                </div>
                            </div>
                        ))}
                    </aside>

                    <main className="main-slide-viewer">
                        <div className="main-slide-container" style={{ backgroundColor: settings.backgroundColor }}>
                            {currentSlide.type === 'title' ? (
                                <div className="p-4 flex items-center justify-center h-full">
                                    <h1 className={textPreviewClasses} style={{
                                        color: settings.textColor,
                                        fontFamily: 'Arial Black',
                                        fontSize: '68px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}>
                                        {currentSlide.text}
                                    </h1>
                                </div>
                            ) : (
                                <div className={`main-slide-text-wrapper ${vAlignClass}`}>
                                    <p className={textPreviewClasses} style={{
                                        color: settings.textColor,
                                        fontFamily: settings.fontFamily,
                                        fontSize: `${settings.fontSizeInput}pt`,
                                        fontWeight: 'bold',
                                        whiteSpace: 'pre-wrap',
                                    }}>
                                        {currentSlide.text}
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
                
                <footer className="flex-shrink-0 p-2 flex justify-center items-center border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center space-x-4">
                        <button onClick={handlePrevSlide} disabled={currentSlideIndex === 0} className="p-2 rounded-full disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <ArrowLeft className="w-6 h-6"/>
                        </button>
                        <span className="font-mono text-sm">{currentSlideIndex + 1} / {slides.length}</span>
                        <button onClick={handleNextSlide} disabled={currentSlideIndex === slides.length - 1} className="p-2 rounded-full disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <ArrowRight className="w-6 h-6"/>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};


// --- Auto-Resizing Textarea Component ---
const AutoResizingTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { autoResize?: boolean }> = ({ value, autoResize = false, ...props }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (autoResize) {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = '0px'; 
                const scrollHeight = textarea.scrollHeight;
                textarea.style.height = `${scrollHeight}px`;
            }
        }
    }, [value, autoResize]); 

    return (
        <textarea
            ref={textareaRef}
            value={value}
            rows={autoResize ? 1 : undefined}
            {...props}
        />
    );
};


// --- String Similarity Helpers ---
const normalizeText = (text: string) => {
    if (!text) return '';
    return text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
};

const stringSimilarity = (str1: string, str2: string) => {
    const s1 = normalizeText(str1);
    const s2 = normalizeText(str2);

    if (s1 === s2) return 1;
    if (s1.length < 2 || s2.length < 2) return 0;

    const bigrams1 = new Map<string, number>();
    for (let i = 0; i < s1.length - 1; i++) {
        const bigram = s1.substring(i, i + 2);
        bigrams1.set(bigram, (bigrams1.get(bigram) || 0) + 1);
    }

    let intersectionSize = 0;
    for (let i = 0; i < s2.length - 1; i++) {
        const bigram = s2.substring(i, i + 2);
        const count = bigrams1.get(bigram) || 0;
        if (count > 0) {
            intersectionSize++;
            bigrams1.set(bigram, count - 1);
        }
    }

    return (2.0 * intersectionSize) / (s1.length + s2.length - 2);
};

// --- Conflict Resolution Modals ---
const VersionConflictModal = ({ isOpen, conflict, onResolve }) => {
    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setNewTitle(`${conflict.newSong.title} (Alternate)`);
            setError('');
        }
    }, [isOpen, conflict]);

    if (!isOpen) return null;

    const handleSaveAsNew = () => {
        const trimmedTitle = newTitle.trim();
        if (!trimmedTitle) {
            setError('New title cannot be empty.');
            return;
        }
        onResolve({ action: 'save_as_new', newTitle: trimmedTitle });
    };

    return (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-4 border border-gray-300 dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Version Conflict Detected</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    A song named <strong className="font-semibold text-indigo-600 dark:text-indigo-400">"{conflict.existingSong.title}"</strong> already exists in your library but with different lyrics.
                </p>
                <div className="flex justify-around items-center p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <button onClick={() => onResolve({ action: 'update' })} className="py-2 px-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition">Update Existing</button>
                    <button onClick={() => onResolve({ action: 'keep' })} className="py-2 px-4 rounded-lg font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Keep Existing</button>
                </div>
                 <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 space-y-2">
                     <label className="text-sm font-bold text-gray-700 dark:text-gray-200 block">Or, save as a new song with a different title:</label>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150 shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"/>
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                    <button onClick={handleSaveAsNew} className="w-full mt-2 py-2 px-4 rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 transition">Save As New Song</button>
                </div>
                <button onClick={() => onResolve({ action: 'cancel' })} className="w-full text-center text-sm text-gray-500 hover:underline">Cancel Save Process</button>
            </div>
        </div>
    );
};

const SimilarityConflictModal = ({ isOpen, conflict, onResolve }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-4 border border-gray-300 dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Potential Duplicate Found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    Your new song <strong className="text-indigo-600 dark:text-indigo-400">"{conflict.newSong.title}"</strong> has lyrics that are very similar to <strong className="text-indigo-600 dark:text-indigo-400">"{conflict.existingSong.title}"</strong> which is already in your library.
                </p>
                <div className="flex justify-end items-center space-x-4 pt-4">
                    <button onClick={() => onResolve({ action: 'dont_save' })} className="py-2 px-4 rounded-lg font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Don't Save New Song</button>
                    <button onClick={() => onResolve({ action: 'save_anyway' })} className="py-2 px-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition">Save Anyway</button>
                </div>
                 <button onClick={() => onResolve({ action: 'cancel' })} className="w-full text-center text-sm text-gray-500 hover:underline pt-2">Cancel Save Process</button>
            </div>
        </div>
    );
};


// --- REACT COMPONENT ---
const App = () => {
    // Master state for the "saved" or "clean" song data
    const [songs, setSongs] = useState<SongWithChunks[]>([initialSong]); 
        
    // UI State
    const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);
    const [backgroundColor, setBackgroundColor] = useState(DEFAULT_BG_COLOR);
    const [theme, setTheme] = useState('light');
    
    // Font and Size State
    const [fontSizeInput, setFontSizeInput] = useState<string | number>(DEFAULT_FONT_SIZE); 
    const [fontFamily, setFontFamily] = useState('Verdana'); 
    
    // Vertical Alignment State
    const [lyricVAlign, setLyricVAlign] = useState<LyricVAlign>('middle');

    // New Text Style State
    const [hasTextShadow, setHasTextShadow] = useState(false);

    // Filename state
    const [downloadFileName, setDownloadFileName] = useState('Worship_Set'); 
    
    // Output State
    const [pptxFontSize, setPptxFontSize] = useState(DEFAULT_FONT_SIZE);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastDownloadedFile, setLastDownloadedFile] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    // Settings visibility state
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

    // Load Project Modal State
    const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
    const [savedProjects, setSavedProjects] = useState<string[]>([]);
    
    // Overwrite Modal State
    const [overwriteModal, setOverwriteModal] = useState<{ isOpen: boolean; filename: string | null }>({ isOpen: false, filename: null });
    
    // Library State
    const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
    const [versionConflict, setVersionConflict] = useState<any>(null);
    const [similarityConflict, setSimilarityConflict] = useState<any>(null);
    const conflictResolver = useRef<(resolution: ConflictResolution) => void | null>(null);

    // Preview Modal State
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [slidesForPreview, setSlidesForPreview] = useState<SongChunk[]>([]);
    const [songsForDownload, setSongsForDownload] = useState<SongWithChunks[]>([]);

    
    // --- Effects to Manage State Sync ---

    useEffect(() => {
        if (theme === 'dark') {
            setTextColor(DARK_TEXT_COLOR);
            setBackgroundColor(DARK_BG_COLOR);
        } else {
            setTextColor(DEFAULT_TEXT_COLOR);
            setBackgroundColor(DEFAULT_BG_COLOR);
        }
    }, [theme]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    
    useEffect(() => {
        const validatedSize = validateAndSetFontSize(fontSizeInput);
        setPptxFontSize(validatedSize);
    }, [fontSizeInput]);

    useEffect(() => {
        if (lastDownloadedFile) {
            const timer = setTimeout(() => {
                setLastDownloadedFile(null);
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [lastDownloadedFile]);

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => {
                setFeedback(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    const applySettings = useCallback((settings: AppSettings) => {
        setTextColor(settings.textColor);
        setBackgroundColor(settings.backgroundColor);
        setTheme(settings.theme);
        setFontSizeInput(settings.fontSizeInput);
        setFontFamily(settings.fontFamily);
        setLyricVAlign(settings.lyricVAlign || 'middle');
        setHasTextShadow(settings.hasTextShadow || false);
    }, []);

    // --- Song Management Handlers ---
    const handleAddSong = () => {
        setSongs(prevSongs => [
            ...prevSongs, 
            { ...initialSong, id: nextId() }
        ]);
    };

    const handleRemoveSong = (id: number) => {
        if (songs.length === 1) {
            setError("You must have at least one song.");
            return;
        }
        setSongs(prevSongs => prevSongs.filter(song => song.id !== id));
        setLastDownloadedFile(null);
    };

    const handleSongChange = (id: number, field: string, value: string) => {
        setSongs(prevSongs => prevSongs.map(song => 
            song.id === id ? { ...song, [field]: value } : song
        ));
    };

    const handleToggleCollapse = (id: number) => {
        setSongs(prevSongs => prevSongs.map(song => 
            song.id === id ? { ...song, isCollapsed: !song.isCollapsed } : song
        ));
    };

    const handleMoveSong = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === songs.length - 1)) {
            return;
        }
        const newSongs = [...songs];
        const item = newSongs.splice(index, 1)[0];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        newSongs.splice(newIndex, 0, item);
        setSongs(newSongs);
    };
    
    // --- Project Save/Load Handlers ---
    const saveProjectToFile = useCallback(async (filename: string) => {
        try {
            const allProjects = JSON.parse(localStorage.getItem('multiSongProjects') || '{}');
            const projectData = {
                songs: songs.map(({ chunks, ...rest }) => rest), // Always save without chunks
                settings: {
                    textColor,
                    backgroundColor,
                    theme,
                    fontSizeInput,
                    fontFamily,
                    lyricVAlign,
                    hasTextShadow,
                }
            };

            allProjects[filename] = projectData;
            localStorage.setItem('multiSongProjects', JSON.stringify(allProjects));
            
            await updateSongLibrary(songs);

            setDownloadFileName(filename);
            setFeedback({ type: 'success', message: `Project "${filename}" saved successfully!` });
        } catch (err) {
            if (err.message !== 'Conflict resolution cancelled by user.') {
                console.error("Failed to save project:", err);
                setFeedback({ type: 'error', message: 'Failed to save project.' });
            }
        }
    }, [songs, textColor, backgroundColor, theme, fontSizeInput, fontFamily, lyricVAlign, hasTextShadow]);

    const updateSongLibrary = useCallback(async (songsToUpdate: SongWithChunks[]) => {
        const SIMILARITY_THRESHOLD = 0.85;
        let library: LibrarySong[] = JSON.parse(localStorage.getItem('songLibrary') || '[]');
        
        const processConflict = (conflictPromise: Promise<any>): Promise<ConflictResolution> => {
            return new Promise((resolve) => {
                conflictResolver.current = resolve;
                conflictPromise.catch(() => resolve({ action: 'cancel' }));
            });
        };

        for (const song of songsToUpdate) {
            if (!song.title.trim() || !song.lyrics.trim()) continue;

            const newSong: LibrarySong = { title: song.title, lyrics: song.lyrics };
            const normalizedNewTitle = normalizeText(newSong.title);
            const normalizedNewLyrics = normalizeText(newSong.lyrics);
            
            const existingVersion = library.find(libSong => normalizeText(libSong.title) === normalizedNewTitle);
            if (existingVersion && normalizeText(existingVersion.lyrics) !== normalizedNewLyrics) {
                const resolution = await processConflict(new Promise((_, reject) => {
                    setVersionConflict({
                        newSong,
                        existingSong: existingVersion,
                        reject,
                    });
                }));
                setVersionConflict(null);
                
                if (resolution.action === 'update') {
                    library = library.map(s => s.title === existingVersion.title ? newSong : s);
                } else if (resolution.action === 'save_as_new') {
                    const titleExists = library.some(s => normalizeText(s.title) === normalizeText(resolution.newTitle));
                    if(titleExists) {
                         setFeedback({ type: 'error', message: `A song with the title "${resolution.newTitle}" already exists. Save cancelled.` });
                    } else {
                         library.push({ title: resolution.newTitle, lyrics: newSong.lyrics });
                    }
                } else if (resolution.action === 'cancel') {
                    throw new Error('Conflict resolution cancelled by user.');
                }
                continue;
            }
            if (existingVersion) continue;

            const similarSong = library.find(libSong => stringSimilarity(libSong.lyrics, newSong.lyrics) > SIMILARITY_THRESHOLD);
            if (similarSong) {
                const resolution = await processConflict(new Promise((_, reject) => {
                    setSimilarityConflict({
                        newSong,
                        existingSong: similarSong,
                        reject,
                    });
                }));
                setSimilarityConflict(null);

                if (resolution.action === 'save_anyway') {
                    library.push(newSong);
                } else if (resolution.action === 'cancel') {
                    throw new Error('Conflict resolution cancelled by user.');
                }
                continue;
            }

            library.push(newSong);
        }

        localStorage.setItem('songLibrary', JSON.stringify(library));
    }, []);
    
    const handleSaveProject = useCallback(async () => {
        const hasContent = songs.some(s => s.title.trim() || s.lyrics.trim());

        if (!hasContent) {
            setFeedback({ type: 'error', message: "Your project is empty. Add a song before saving." });
            return;
        }

        const baseName = downloadFileName.trim() || 'Untitled_Project';
        const sanitizedFilename = baseName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');

        const allProjects = JSON.parse(localStorage.getItem('multiSongProjects') || '{}');
        
        if (allProjects[sanitizedFilename]) {
            setOverwriteModal({ isOpen: true, filename: sanitizedFilename });
        }
        else {
            await saveProjectToFile(sanitizedFilename);
        }
    }, [downloadFileName, saveProjectToFile, songs]);

    const handleModalClose = () => {
        setOverwriteModal({ isOpen: false, filename: null });
    };

    const handleModalOverwrite = async () => {
        if (overwriteModal.filename) {
            await saveProjectToFile(overwriteModal.filename);
        }
        handleModalClose();
    };

    const handleModalSaveAsNew = async (newFilename: string) => {
        await saveProjectToFile(newFilename);
        handleModalClose();
    };
    
    const handleLoadProject = (filenameToLoad: string) => {
        try {
            const allProjects = JSON.parse(localStorage.getItem('multiSongProjects') || '{}');
            const projectData = allProjects[filenameToLoad];

            if (projectData) {
                const loadedSongs: SongWithChunks[] = (projectData.songs || [initialSong]).map(s => ({
                    ...initialSong,
                    ...s,
                    id: s.id || nextId(),
                    isCollapsed: !!s.isCollapsed,
                }));
                
                setSongs(loadedSongs);
                if (projectData.settings) {
                    applySettings(projectData.settings);
                } else {
                    // Legacy support for projects saved without settings object
                    setTextColor(projectData.textColor || DEFAULT_TEXT_COLOR);
                    setBackgroundColor(projectData.backgroundColor || DEFAULT_BG_COLOR);
                    setTheme(projectData.theme || 'light');
                    setFontSizeInput(projectData.fontSizeInput || DEFAULT_FONT_SIZE);
                    setFontFamily(projectData.fontFamily || 'Verdana');
                    setLyricVAlign(projectData.lyricVAlign || 'middle');
                    setHasTextShadow(false); // Default for legacy
                }

                setDownloadFileName(filenameToLoad);
                
                setFeedback({ type: 'success', message: `Project "${filenameToLoad}" loaded successfully!` });
                setIsLoadModalOpen(false);
            } else {
                 setFeedback({ type: 'error', message: `Project "${filenameToLoad}" not found.` });
            }
        } catch (err) {
            console.error("Failed to load project:", err);
            setFeedback({ type: 'error', message: 'Failed to load project. The saved data might be corrupted.' });
        }
    };

    const fetchSavedProjects = () => {
        try {
            const allProjects = JSON.parse(localStorage.getItem('multiSongProjects') || '{}');
            setSavedProjects(Object.keys(allProjects));
        } catch {
            setSavedProjects([]);
        }
    };

    const handleOpenLoadModal = () => {
        fetchSavedProjects();
        setIsLoadModalOpen(true);
    };

    const handleClearAllProjects = () => {
        if (window.confirm("Are you sure you want to delete ALL saved projects AND your entire song library? This action cannot be undone.")) {
            localStorage.removeItem('multiSongProjects');
            localStorage.removeItem('songLibrary');
            setSavedProjects([]);
            setIsLoadModalOpen(false);
            setFeedback({ type: 'info', message: 'All saved projects and the song library have been cleared.' });
        }
    };

    const handleSaveSingleSongToLibrary = useCallback(async (songId: number) => {
        const songToSave = songs.find(s => s.id === songId);
        if (!songToSave || !songToSave.title.trim() || !songToSave.lyrics.trim()) {
            setFeedback({ type: 'error', message: 'Song must have a title and lyrics to be saved.' });
            return;
        }

        try {
            await updateSongLibrary([songToSave]);
            setFeedback({ type: 'success', message: `"${songToSave.title}" saved to library!` });
        } catch (err) {
            if (err.message !== 'Conflict resolution cancelled by user.') {
                console.error("Failed to save song to library:", err);
                setFeedback({ type: 'error', message: 'Failed to save song to library.' });
            }
        }
    }, [songs, updateSongLibrary]);

    const handleAddSongsFromLibrary = (songsToAdd: LibrarySong[]) => {
        const newSongObjects = songsToAdd.map(libSong => ({
            ...initialSong,
            id: nextId(),
            title: libSong.title,
            lyrics: libSong.lyrics,
        }));

        setSongs(prevSongs => {
            if (prevSongs.length === 1 && !prevSongs[0].title.trim() && !prevSongs[0].lyrics.trim()) {
                return newSongObjects.length > 0 ? newSongObjects : prevSongs;
            }
            return [...prevSongs, ...newSongObjects];
        });
        setIsLibraryModalOpen(false);
    };

    // --- UI Mode & Major Action Handlers ---
    const handlePreview = () => {
        const isValid = songs.every(s => s.title.trim() && s.lyrics.trim());
        if (!isValid) {
            setError("Please ensure all songs have a Title and Lyrics entered.");
            return;
        }
        setError(null);
        setLastDownloadedFile(null);
    
        const songsWithChunks = generateChunksForSongs(songs);
        const allChunks = songsWithChunks.flatMap(s => s.chunks || []);
    
        if (allChunks.length === 0) {
            setError("Please enter valid lyrics in at least one song to generate slides.");
            return;
        }
    
        setSlidesForPreview(allChunks);
        setSongsForDownload(songsWithChunks);
        setIsPreviewModalOpen(true);
    };
    
    const handleConfirmDownload = async () => {
        setIsLoading(true);
        try {
            const baseName = downloadFileName.trim() || 'Multi_Song_Presentation';
            const sanitizedBaseName = baseName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
            const finalFilename = `${sanitizedBaseName}.pptx`;
    
            const allSettings = {
                textColor, backgroundColor, theme, fontSizeInput, fontFamily, lyricVAlign, hasTextShadow
            };
            const generatedFilename = downloadPPTX(songsForDownload, allSettings, pptxFontSize, finalFilename);
            setLastDownloadedFile(generatedFilename);
    
        } catch (err) {
            console.error("Processing or Download error:", err);
            setError("An unexpected error occurred during presentation generation.");
        } finally {
            setIsLoading(false);
            setIsPreviewModalOpen(false);
        }
    };
    
    const customizationProps = {
        textColor, setTextColor, backgroundColor, setBackgroundColor, theme, setTheme,
        fontSizeInput, setFontSizeInput, downloadFileName, setDownloadFileName,
        fontFamily, setFontFamily, lyricVAlign, setLyricVAlign, 
        hasTextShadow, setHasTextShadow,
        isLoading,
    };

    // --- RENDER FUNCTIONS ---
    
    const renderSongCard = (song, index) => {
        const isFirst = index === 0;
        const isLast = index === songs.length - 1;

        return (
            <div 
                key={song.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700/60 shadow-lg group transition-all duration-300"
            >
                <div className="p-5 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate pr-2">
                        Song #{index + 1}
                        {song.title && <span className="text-gray-500 dark:text-gray-400 font-normal"> - {song.title}</span>}
                    </h3>
                    <div className="flex items-center space-x-1.5">
                        {songs.length > 1 && (
                            <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-gray-600 pr-1.5 mr-1.5">
                                <button
                                    onClick={() => handleMoveSong(index, 'up')}
                                    disabled={isFirst}
                                    title="Move Song Up"
                                    className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    <ArrowUp className="w-5 h-5"/>
                                </button>
                                <button
                                    onClick={() => handleMoveSong(index, 'down')}
                                    disabled={isLast}
                                    title="Move Song Down"
                                    className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    <ArrowDown className="w-5 h-5"/>
                                </button>
                            </div>
                        )}
                        {songs.length > 1 && (
                            <button
                                onClick={() => handleToggleCollapse(song.id)}
                                title={song.isCollapsed ? "Expand Song Form" : "Collapse Song Form"}
                                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 transition"
                            >
                                {song.isCollapsed ? <Plus className="w-5 h-5"/> : <Minus className="w-5 h-5" />}
                            </button>
                        )}
                        <button
                            onClick={() => handleSaveSingleSongToLibrary(song.id)}
                            disabled={!song.title.trim() || !song.lyrics.trim()}
                            title="Save this song to library"
                            className="p-2 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            <Save className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleRemoveSong(song.id)}
                            disabled={songs.length <= 1}
                            title="Remove Song"
                            className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {!song.isCollapsed && (
                    <div className="px-5 pb-5 pt-0 border-t border-gray-200 dark:border-gray-600 space-y-4">
                        <div className="relative pt-4">
                            <label htmlFor={`song-title-${song.id}`} className="sr-only">Song Title</label>
                            <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            <input
                                id={`song-title-${song.id}`}
                                type="text"
                                placeholder="Song Title (Required)"
                                value={song.title}
                                onChange={(e) => handleSongChange(song.id, 'title', e.target.value)}
                                disabled={isLoading}
                                title={`Enter the title for Song #${index + 1}`}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor={`lyrics-textarea-${song.id}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center mb-1">
                                <FileText className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400"/>
                                Full Lyrics
                            </label>
                            <AutoResizingTextarea
                                id={`lyrics-textarea-${song.id}`}
                                placeholder="Paste lyrics here. Use a double-enter for a forced slide break."
                                value={song.lyrics}
                                onChange={(e) => handleSongChange(song.id, 'lyrics', e.target.value)}
                                disabled={isLoading}
                                title={`Enter the lyrics for Song #${index + 1}`}
                                autoResize={true}
                                className="lyrics-textarea w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150 shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <div className={`min-h-screen flex flex-col items-center py-10 px-4 bg-gray-50 dark:bg-gray-900`}>
                <div className={`w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8`}>
                    
                    <div className="mb-4 space-y-2">
                        {error && (
                            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center space-x-2">
                                <XCircle className="w-5 h-5" />
                                <p className="font-medium">{error}</p>
                            </div>
                        )}
                        
                        {lastDownloadedFile && (
                            <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center justify-between space-x-2">
                                <p className="font-medium">
                                    Success! Presentation **"{lastDownloadedFile}"** is ready.
                                </p>
                                <Download className="w-5 h-5" />
                            </div>
                        )}
                    </div>

                    <div className="text-center mb-8">
                        <Music className={`w-10 h-10 mx-auto text-indigo-600 mb-3`} /> 
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Worship Presentation Creator
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                           Build your setlist, customize the appearance, and download a ready-to-use PowerPoint file.
                        </p>
                    </div>
                    
                    <div className="mt-8 pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Song List</h2>
                            <button
                                onClick={() => setIsLibraryModalOpen(true)}
                                disabled={isLoading}
                                title="Add songs from your saved library"
                                className="py-2 px-4 rounded-lg text-indigo-600 font-bold flex items-center justify-center space-x-2 transition duration-300 transform active:scale-95 shadow-sm border border-indigo-500 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-500 dark:hover:bg-indigo-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <BookOpen className="w-5 h-5"/>
                                <span>Add from Library</span>
                            </button>
                        </div>
                        <div className="space-y-8">
                            {songs.map(renderSongCard)}
                        </div>
                        <button
                            onClick={handleAddSong}
                            disabled={isLoading}
                            title="Add a new, empty song card to the list"
                            className={`mt-6 w-full py-3 px-4 rounded-xl text-indigo-600 font-bold text-lg flex items-center justify-center space-x-2 transition duration-300 transform active:scale-95 shadow-md border-2 border-indigo-600 border-dashed hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-500 dark:hover:bg-indigo-900/40
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-700'}`}
                        >
                            <Plus className="w-6 h-6" />
                            <span>Add Another Song</span>
                        </button>
                    </div>

                    <div className="my-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                            <button
                                onClick={() => setIsSettingsExpanded(p => !p)}
                                className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                aria-expanded={isSettingsExpanded}
                                title="Show or hide the project and appearance settings panel"
                            >
                                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
                                    Project & Appearance Settings
                                </h3>
                                {isSettingsExpanded ? <ChevronUp className="w-6 h-6 text-gray-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
                            </button>
                            {isSettingsExpanded && (
                                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="mb-6 space-y-3">
                                        <h3 className="text-base font-bold text-gray-700 dark:text-gray-200">Project Management</h3>
                                        <button onClick={handleSaveProject} title="Save the current project to your browser" disabled={isLoading} className="w-full py-2.5 px-4 rounded-lg text-white font-bold flex items-center justify-center space-x-2 transition duration-150 transform active:scale-95 shadow-md bg-blue-600 hover:bg-blue-700 shadow-blue-500/50 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed">
                                        {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin"/><span>Saving...</span></>) : (<><Save className="w-5 h-5"/><span>Save Project</span></>)}
                                        </button>
                                        <button
                                            onClick={handleOpenLoadModal}
                                            disabled={isLoading}
                                            title="Load a previously saved project from your browser"
                                            className="w-full py-2.5 px-4 rounded-lg text-gray-600 font-bold flex items-center justify-center space-x-2 transition duration-300 transform active:scale-95 shadow-sm border border-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-700/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FolderUp className="w-5 h-5"/>
                                            <span>Load Project</span>
                                        </button>
                                    </div>
                                    <GlobalCustomizationSettings {...customizationProps} />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={handlePreview}
                            disabled={isLoading || songs.some(s => !s.title.trim() || !s.lyrics.trim())}
                            title="Preview the final presentation before downloading"
                            className={`w-full py-4 px-4 rounded-xl text-white font-bold text-lg flex items-center justify-center space-x-2 transition duration-300 transform active:scale-95 shadow-lg 
                                ${isLoading || songs.some(s => !s.title.trim() || !s.lyrics.trim())
                                    ? 'bg-indigo-300 dark:bg-indigo-800 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50'
                                }`}
                        >
                           <Eye className="w-6 h-6" />
                           <span>Preview Presentation</span>
                        </button>
                    </div>
                </div>
            </div>

            <div 
                aria-live="assertive"
                className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-in-out transform ${feedback ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            >
                {feedback && (
                    <div className={`
                        shadow-2xl rounded-lg flex items-center space-x-4 p-4 max-w-md border-l-4
                        ${feedback.type === 'success' ? 'bg-white dark:bg-gray-800 border-green-500' : ''}
                        ${feedback.type === 'error' ? 'bg-white dark:bg-gray-800 border-red-500' : ''}
                        ${feedback.type === 'info' ? 'bg-white dark:bg-gray-800 border-blue-500' : ''}
                    `}>
                        <div className={`flex-shrink-0
                            ${feedback.type === 'success' ? 'text-green-500' : ''}
                            ${feedback.type === 'error' ? 'text-red-500' : ''}
                            ${feedback.type === 'info' ? 'text-blue-500' : ''}
                        `}>
                            {feedback.type === 'success' && <CheckCircle className="w-6 h-6" />}
                            {feedback.type === 'error' && <AlertTriangle className="w-6 h-6" />}
                            {feedback.type === 'info' && <Info className="w-6 h-6" />}
                        </div>
                        <p className="font-bold text-gray-800 dark:text-gray-100 flex-grow">{feedback.message}</p>
                        <button onClick={() => setFeedback(null)} className="ml-auto p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 flex-shrink-0">
                            <span className="sr-only">Close</span>
                            <XCircle className="w-5 h-5"/>
                        </button>
                    </div>
                )}
            </div>
            
            <OverwriteProjectModal 
                isOpen={overwriteModal.isOpen}
                collidingFilename={overwriteModal.filename}
                onClose={handleModalClose}
                onOverwrite={handleModalOverwrite}
                onSaveAsNew={handleModalSaveAsNew}
            />
             <SongLibraryModal
                isOpen={isLibraryModalOpen}
                onClose={() => setIsLibraryModalOpen(false)}
                onAddSongs={handleAddSongsFromLibrary}
            />
             <LoadProjectModal
                isOpen={isLoadModalOpen}
                onClose={() => setIsLoadModalOpen(false)}
                projects={savedProjects}
                onLoad={handleLoadProject}
                onClearAll={handleClearAllProjects}
            />
            <VersionConflictModal
                isOpen={!!versionConflict}
                conflict={versionConflict}
                onResolve={(resolution) => {
                    if (conflictResolver.current) {
                        conflictResolver.current(resolution);
                    }
                }}
            />
            <SimilarityConflictModal
                isOpen={!!similarityConflict}
                conflict={similarityConflict}
                onResolve={(resolution) => {
                    if (conflictResolver.current) {
                        conflictResolver.current(resolution);
                    }
                }}
            />
            <FinalPreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                onConfirmDownload={handleConfirmDownload}
                slides={slidesForPreview}
                settings={{...customizationProps, fontSizeInput, lyricVAlign, hasTextShadow}}
                isLoading={isLoading}
            />
        </>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}