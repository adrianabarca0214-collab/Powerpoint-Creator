import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// TypeScript declarations for libraries loaded from script tags
declare var PptxGenJS: any;
declare var jspdf: any;
declare var html2canvas: any;

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
const FileDown = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m15 15-3 3-3-3"/></svg>);
const BookOpen = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>);
const Search = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>);


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
// FIX: Defined a specific type for conflict resolution to ensure type safety.
// This resolves errors where properties were being accessed on an 'unknown' type.
type ConflictResolution = {
    action: 'update' | 'keep' | 'save_as_new' | 'cancel' | 'dont_save' | 'save_anyway';
    newTitle?: string;
};


// --- Core Logic Functions ---

// BUG FIX: Improved font size validation to clamp values instead of resetting.
// This provides more intuitive feedback to the user.
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

        const newChunks: SongChunk[] = [
            { type: 'title', text: song.title.toUpperCase() },
            ...processedChunks.map(chunk => ({
                type: 'lyric' as 'lyric',
                text: chunk.text.toUpperCase(),
            })),
        ];

        return { ...song, chunks: newChunks };
    });
};


// --- POWERPOINT GENERATION FUNCTION (FOR DOWNLOAD) ---
const downloadPPTX = (songs: SongWithChunks[], textColor: string, backgroundColor: string, finalFontSize: number, finalFontFamily: string, includeSlideNumbers: boolean, customFilename: string): string => {
    if (typeof PptxGenJS === 'undefined') {
        throw new Error("PowerPoint generation library (PptxGenJS) is not loaded.");
    }
    
    let pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_4x3'; 

    const pptxTextColor = textColor.replace('#', '');
    const pptxBackgroundColor = backgroundColor.replace('#', '');
    
    if (includeSlideNumbers) {
        pptx.slideNumber = {
            x: 0.5, 
            y: '95%', 
            color: pptxTextColor, 
            fontFace: 'Arial',
            fontSize: 14,
        };
    } else {
        pptx.slideNumber = false; 
    }

    const lyricTextStyle = {
        align: 'center', 
        valign: 'middle', 
        fontFace: finalFontFamily, 
        fontSize: finalFontSize, 
        bold: true,
        color: pptxTextColor, 
        autoFit: false,
        breakLine: true,
    };
    
    const titleTextStyle = {
        x: 0, y: 2.75, w: '100%', h: 2.0, 
        align: 'center', 
        valign: 'middle',
        fontFace: 'Arial Black', 
        fontSize: 68,
        bold: true,
        color: pptxTextColor, 
        shadow: { type: 'outer', color: 'A0A0A0', blur: 5, offset: 3, angle: 45, opacity: 0.2 }, 
    };
    
    const lyricBoxStyle = {
        x: 0, y: 1.25, w: '100%', h: 5,
    };

    // NEW: Iterate over each song and its typed chunks to generate slides
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

    // Save the presentation with the custom filename
    pptx.writeFile({ fileName: customFilename });
    return customFilename;
};

// --- Reusable Settings Component ---
const GlobalCustomizationSettings = ({
    textColor, setTextColor, backgroundColor, setBackgroundColor, theme, setTheme,
    fontSizeInput, setFontSizeInput, downloadFileName, setDownloadFileName,
    fontFamily, setFontFamily, includeSlideNumbers, setIncludeSlideNumbers, isLoading
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
                <div className="flex items-center justify-between pt-2">
                        <span className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Hash className="w-4 h-4 mr-2 text-indigo-500"/>
                            Include Slide Numbers
                        </span>
                    <label htmlFor="slide-number-toggle" title="Toggle slide numbers on or off" className="flex items-center cursor-pointer checkbox-container">
                        <div className="relative">
                            <input 
                                id="slide-number-toggle" 
                                type="checkbox" 
                                className="sr-only" 
                                checked={includeSlideNumbers}
                                onChange={(e) => setIncludeSlideNumbers(e.target.checked)}
                                disabled={isLoading}
                            />
                            <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full label-element transition duration-300 ease-in-out border-2 border-gray-300 dark:border-gray-500"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300 ease-in-out shadow-inner"></div>
                        </div>
                    </label>
                </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 shadow-inner space-y-4">
                <h3 className="text-base font-bold text-gray-700 dark:text-gray-200">Colors & Contrast</h3>
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
            
            // ACCESSIBILITY: Focus trap logic
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

// --- NEW: Song Library Modal ---
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
             // ACCESSIBILITY: Focus trap logic
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

// --- NEW: Auto-Resizing Textarea Component ---
const AutoResizingTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ value, ...props }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // Reset height to recalculate the correct scrollHeight, especially when deleting text
            textarea.style.height = '0px'; 
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [value]); // Rerun this effect whenever the text value changes

    return (
        <textarea
            ref={textareaRef}
            value={value}
            rows={1} // Start with a single row, the effect will handle the rest
            {...props}
        />
    );
};

// --- NEW: String Similarity Helpers ---
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

// --- NEW: Conflict Resolution Modals ---
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
    
    // Preview-specific state for isolated editing
    const [previewSongs, setPreviewSongs] = useState<SongWithChunks[] | null>(null);
    
    // UI State
    const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);
    const [backgroundColor, setBackgroundColor] = useState(DEFAULT_BG_COLOR);
    const [theme, setTheme] = useState('light');
    const [includeSlideNumbers, setIncludeSlideNumbers] = useState(false);
    
    // Font and Size State
    const [fontSizeInput, setFontSizeInput] = useState<string | number>(DEFAULT_FONT_SIZE); 
    const [fontFamily, setFontFamily] = useState('Verdana'); 
    
    // Filename state
    const [downloadFileName, setDownloadFileName] = useState('Worship_Set'); 
    
    // Output State
    const [pptxFontSize, setPptxFontSize] = useState(DEFAULT_FONT_SIZE);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // BUG FIX: Renamed 'downloadFilename' to 'lastDownloadedFile' for clarity.
    const [lastDownloadedFile, setLastDownloadedFile] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    // Multi-slide selection and move mode
    const [selectedChunks, setSelectedChunks] = useState<SelectedChunk[]>([]);
    const [moveMode, setMoveMode] = useState('idle'); // 'idle' | 'selecting_target'
    
    // Undo/Redo History State
    const [history, setHistory] = useState<SongWithChunks[][]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Zoom Level State
    const [zoomLevel, setZoomLevel] = useState(1.0);
    
    // Settings visibility state
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
    const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

    // Load Project Dropdown State
    const [isLoadDropdownOpen, setIsLoadDropdownOpen] = useState(false);
    const [savedProjects, setSavedProjects] = useState<string[]>([]);
    const loadDropdownRef = useRef(null);
    const exportDropdownRef = useRef(null);
    
    // Overwrite Modal State
    const [overwriteModal, setOverwriteModal] = useState<{ isOpen: boolean; filename: string | null }>({ isOpen: false, filename: null });
    
    // Drag and Drop State
    const [draggedItem, setDraggedItem] = useState<SelectedChunk | null>(null);
    const [dragOverInfo, setDragOverInfo] = useState<{ songId: number; chunkIndex: number; position: 'before' | 'after' } | null>(null);

    // Library State
    const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
    const [versionConflict, setVersionConflict] = useState<any>(null);
    const [similarityConflict, setSimilarityConflict] = useState<any>(null);
    // FIX: Updated the conflictResolver ref to use the strongly-typed ConflictResolution type.
    const conflictResolver = useRef<(resolution: ConflictResolution) => void | null>(null);

    
    // --- DERIVED STATE & MEMOIZED VALUES ---
    const isInPreviewMode = !!previewSongs;
    const isDirty = isInPreviewMode && history.length > 0 && historyIndex > -1 && JSON.stringify(previewSongs) !== JSON.stringify(history[0]);

    
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
        const handleClickOutside = (event) => {
            if (loadDropdownRef.current && !loadDropdownRef.current.contains(event.target)) {
                setIsLoadDropdownOpen(false);
            }
            if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
                setIsExportDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [loadDropdownRef, exportDropdownRef]);

    useEffect(() => {
        if (lastDownloadedFile) {
            const timer = setTimeout(() => {
                setLastDownloadedFile(null);
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [lastDownloadedFile]);

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
            const songsToSave = previewSongs || songs;
            const projectData = {
                songs: songsToSave,
                textColor,
                backgroundColor,
                theme,
                includeSlideNumbers,
                fontSizeInput,
                fontFamily,
            };

            allProjects[filename] = projectData;
            localStorage.setItem('multiSongProjects', JSON.stringify(allProjects));
            
            // NEW: Update the song library with conflict resolution
            await updateSongLibrary(songsToSave);

            setDownloadFileName(filename); // Ensure UI is in sync with saved name
            setFeedback({ type: 'success', message: `Project "${filename}" saved successfully!` });
            setTimeout(() => setFeedback(null), 3000);

            if (previewSongs) {
                const currentPreviewState = JSON.parse(JSON.stringify(previewSongs));
                setSongs(currentPreviewState);
                if(history.length > 0) { // Only update history if it has been initialized
                    setHistory([currentPreviewState]); // Reset history to this saved state
                    setHistoryIndex(0);
                }
            }
        } catch (err) {
            if (err.message !== 'Conflict resolution cancelled by user.') {
                console.error("Failed to save project:", err);
                setFeedback({ type: 'error', message: 'Failed to save project.' });
                setTimeout(() => setFeedback(null), 3000);
            }
        }
    }, [previewSongs, songs, textColor, backgroundColor, theme, includeSlideNumbers, fontSizeInput, fontFamily, history.length]);

    // --- NEW: Smart Library Update Logic ---
    const updateSongLibrary = useCallback(async (songsToUpdate: SongWithChunks[]) => {
        const SIMILARITY_THRESHOLD = 0.85;
        let library: LibrarySong[] = JSON.parse(localStorage.getItem('songLibrary') || '[]');
        
        // FIX: Added a return type annotation to ensure this function returns a strongly-typed promise.
        // This makes the 'await' result have the correct type, fixing downstream errors.
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
            
            // Pass 1: Check for version conflicts (same title)
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
                    // Check if the *new* new title conflicts
                    const titleExists = library.some(s => normalizeText(s.title) === normalizeText(resolution.newTitle));
                    if(titleExists) {
                         setFeedback({ type: 'error', message: `A song with the title "${resolution.newTitle}" already exists. Save cancelled.` });
                         setTimeout(() => setFeedback(null), 4000);
                    } else {
                         library.push({ title: resolution.newTitle, lyrics: newSong.lyrics });
                    }
                } else if (resolution.action === 'cancel') {
                    throw new Error('Conflict resolution cancelled by user.');
                }
                continue; // Move to next song
            }
            if (existingVersion) continue; // Exact duplicate, skip.

            // Pass 2: Check for similarity conflicts (different title, similar lyrics)
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

            // No conflicts, add to library
            library.push(newSong);
        }

        localStorage.setItem('songLibrary', JSON.stringify(library));
    }, []);
    
    const handleSaveProject = useCallback(async () => {
        const baseName = downloadFileName.trim() || 'Untitled_Project';
        const sanitizedFilename = baseName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');

        const allProjects = JSON.parse(localStorage.getItem('multiSongProjects') || '{}');
        
        // Always save if there are changes
        if (isDirty) {
             await saveProjectToFile(sanitizedFilename);
        } else if (allProjects[sanitizedFilename]) { // If not dirty, but name exists, ask to overwrite
            setOverwriteModal({ isOpen: true, filename: sanitizedFilename });
        }
        else { // Not dirty and name is new, just save.
            await saveProjectToFile(sanitizedFilename);
        }
    }, [downloadFileName, isDirty, saveProjectToFile]);

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
        if (isDirty && !window.confirm("Loading a project will overwrite any unsaved changes. Are you sure you want to continue?")) {
            return;
        }
        try {
            const allProjects = JSON.parse(localStorage.getItem('multiSongProjects') || '{}');
            const projectData = allProjects[filenameToLoad];

            if (projectData) {
                const loadedSongs: SongWithChunks[] = (projectData.songs || [initialSong]).map(s => ({
                    ...initialSong, // Start with defaults
                    ...s,
                    id: s.id || nextId(),
                    isCollapsed: !!s.isCollapsed,
                }));
                
                setSongs(loadedSongs);
                setTextColor(projectData.textColor || DEFAULT_TEXT_COLOR);
                setBackgroundColor(projectData.backgroundColor || DEFAULT_BG_COLOR);
                setTheme(projectData.theme || 'light');
                setIncludeSlideNumbers(projectData.includeSlideNumbers || false);
                setFontSizeInput(projectData.fontSizeInput || DEFAULT_FONT_SIZE);
                setFontFamily(projectData.fontFamily || 'Verdana');
                setDownloadFileName(filenameToLoad);
                
                const hasChunks = loadedSongs.some(s => s.chunks && s.chunks.length > 0);
                if (hasChunks) {
                    const loadedState = JSON.parse(JSON.stringify(loadedSongs));
                    setPreviewSongs(loadedState);
                    setHistory([loadedState]);
                    setHistoryIndex(0);
                } else {
                    setPreviewSongs(null);
                    setHistory([]);
                    setHistoryIndex(-1);
                }
                
                setFeedback({ type: 'success', message: `Project "${filenameToLoad}" loaded successfully!` });
                setTimeout(() => setFeedback(null), 3000);
                setIsLoadDropdownOpen(false);
            } else {
                 setFeedback({ type: 'error', message: `Project "${filenameToLoad}" not found.` });
                 setTimeout(() => setFeedback(null), 3000);
            }
        } catch (err) {
            console.error("Failed to load project:", err);
            setFeedback({ type: 'error', message: 'Failed to load project. The saved data might be corrupted.' });
            setTimeout(() => setFeedback(null), 3000);
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

    const toggleLoadDropdown = () => {
        if (!isLoadDropdownOpen) {
            fetchSavedProjects(); // Refresh list on open
        }
        setIsLoadDropdownOpen(prev => !prev);
    };

    const handleClearAllProjects = () => {
        if (window.confirm("Are you sure you want to delete ALL saved projects? This action cannot be undone.")) {
            localStorage.removeItem('multiSongProjects');
            setSavedProjects([]);
            setIsLoadDropdownOpen(false);
            setFeedback({ type: 'info', message: 'All saved projects have been cleared.' });
            setTimeout(() => setFeedback(null), 3000);
        }
    };

    // --- Zoom Handlers ---
    const handleZoomIn = useCallback(() => setZoomLevel(prev => Math.min(prev + 0.1, 2.0)), []);
    const handleZoomOut = useCallback(() => setZoomLevel(prev => Math.max(prev - 0.1, 0.5)), []);
    const handleResetZoom = useCallback(() => setZoomLevel(1.0), []);
    
    // --- PREVIEW-MODE EDITING & HISTORY HANDLERS ---
    
    // Central function to update preview state and manage history
    const updatePreviewState = useCallback((newState: SongWithChunks[]) => {
        const newStateCopy = JSON.parse(JSON.stringify(newState)); // Deep copy for history
        const newHistory = history.slice(0, historyIndex + 1); // Truncate future
        newHistory.push(newStateCopy);
        
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setPreviewSongs(newStateCopy);
    }, [history, historyIndex]);
    
    const handleChunkEdit = (songId: number, chunkIndex: number, newText: string) => {
        let text = newText.toUpperCase();
        const newState = previewSongs.map(song => {
            if (song.id !== songId) return song;
            const updatedChunks = [...song.chunks];
            updatedChunks[chunkIndex] = { ...updatedChunks[chunkIndex], text: text };
            return { ...song, chunks: updatedChunks };
        });
        updatePreviewState(newState);
    };

    const handleDuplicateChunk = (songId: number, chunkIndex: number) => {
        const newState = previewSongs.map(song => {
            if (song.id !== songId) return song;
            const chunkToDuplicate = song.chunks[chunkIndex];
            const newChunks = [
                ...song.chunks.slice(0, chunkIndex + 1),
                chunkToDuplicate,
                ...song.chunks.slice(chunkIndex + 1)
            ];
            return { ...song, chunks: newChunks };
        });
        updatePreviewState(newState);
    };

    const handleDeleteChunk = (songId: number, chunkIndex: number) => {
        const newState = previewSongs.map(song => {
            if (song.id !== songId) return song;
            if (song.chunks.length <= 1) return song; // Prevent deleting last slide of a song
            const newChunks = song.chunks.filter((_, index) => index !== chunkIndex);
            return { ...song, chunks: newChunks };
        });
        updatePreviewState(newState);
    };

    const handleInsertEmptySlide = (songId: number, insertIndex: number) => {
        const newState = previewSongs.map(song => {
            if (song.id !== songId) return song;
            const newChunks = [
                ...song.chunks.slice(0, insertIndex + 1),
                { type: 'lyric' as 'lyric', text: 'NEW SLIDE - EDIT TEXT' },
                ...song.chunks.slice(insertIndex + 1)
            ];
            return { ...song, chunks: newChunks };
        });
        updatePreviewState(newState);
    };

    // --- Drag and Drop Handlers ---
    const handleDragStart = (e: React.DragEvent, songId: number, chunkIndex: number) => {
        const isAlreadySelected = selectedChunks.some(s => s.songId === songId && s.chunkIndex === chunkIndex);
        
        let currentSelection = selectedChunks;
        if (!isAlreadySelected) {
            const newSelection = [{ songId, chunkIndex }];
            setSelectedChunks(newSelection);
            currentSelection = newSelection;
        }

        setDraggedItem({ songId, chunkIndex });
        e.dataTransfer.effectAllowed = 'move';
        document.body.classList.add('is-dragging');

        // Create a custom, styled drag ghost for single or multiple items
        const ghost = document.createElement('div');
        ghost.style.position = 'absolute';
        ghost.style.top = '-9999px';
        ghost.style.padding = '8px 12px';
        ghost.style.backgroundColor = '#4f46e5';
        ghost.style.color = 'white';
        ghost.style.borderRadius = '8px';
        ghost.style.display = 'flex';
        ghost.style.alignItems = 'center';
        ghost.style.gap = '8px';
        ghost.style.fontWeight = 'bold';
        ghost.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
        ghost.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> <span>Moving ${currentSelection.length} slide${currentSelection.length > 1 ? 's' : ''}</span>`;
        
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);

        setTimeout(() => document.body.removeChild(ghost), 0);
    };

    const handleDragOver = (e: React.DragEvent, targetSongId: number, targetChunkIndex: number) => {
        e.preventDefault();
        if (!draggedItem) return;

        const isTargetInSelection = selectedChunks.some(s => s.songId === targetSongId && s.chunkIndex === targetChunkIndex);
        if (isTargetInSelection) {
            setDragOverInfo(null);
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const isAfter = e.clientY > rect.top + rect.height / 2;
        setDragOverInfo({ songId: targetSongId, chunkIndex: targetChunkIndex, position: isAfter ? 'after' : 'before' });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (selectedChunks.length === 0 || !dragOverInfo || !previewSongs) {
            setDraggedItem(null);
            setDragOverInfo(null);
            return;
        }

        let chunksToMove: SongChunk[] = [];
        let updatedSongs: SongWithChunks[] = JSON.parse(JSON.stringify(previewSongs));
        const selectedIds = new Set(selectedChunks.map(s => `${s.songId}-${s.chunkIndex}`));

        updatedSongs = updatedSongs.map(song => {
            const newChunks: SongChunk[] = [];
            song.chunks.forEach((chunk, index) => {
                if (selectedIds.has(`${song.id}-${index}`)) {
                    chunksToMove.push(chunk);
                } else {
                    newChunks.push(chunk);
                }
            });
            return { ...song, chunks: newChunks };
        });

        const targetSongIndex = updatedSongs.findIndex(s => s.id === dragOverInfo.songId);
        if (targetSongIndex === -1) return;

        let targetSong = updatedSongs[targetSongIndex];
        let insertionIndex = dragOverInfo.position === 'after' ? dragOverInfo.chunkIndex + 1 : dragOverInfo.chunkIndex;
        
        const removedBeforeInTargetSong = selectedChunks.filter(s => s.songId === dragOverInfo.songId && s.chunkIndex < dragOverInfo.chunkIndex).length;
        insertionIndex -= removedBeforeInTargetSong;

        let updatedTargetChunks = [
            ...targetSong.chunks.slice(0, insertionIndex),
            ...chunksToMove,
            ...targetSong.chunks.slice(insertionIndex)
        ];
        updatedSongs[targetSongIndex] = { ...targetSong, chunks: updatedTargetChunks };
        
        updatedSongs = updatedSongs.filter(song => song.chunks.length > 0);

        updatePreviewState(updatedSongs);
        
        setDraggedItem(null);
        setDragOverInfo(null);
        setSelectedChunks([]);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setDragOverInfo(null);
        document.body.classList.remove('is-dragging');
    };

    // --- Bulk Actions (Selection & Move) ---
    const toggleChunkSelection = (songId: number, chunkIndex: number) => {
        if (moveMode === 'selecting_target') return;
        const isSelected = selectedChunks.some(s => s.songId === songId && s.chunkIndex === chunkIndex);
        if (isSelected) {
            setSelectedChunks(prev => prev.filter(s => !(s.songId === songId && s.chunkIndex === chunkIndex)));
        } else {
            setSelectedChunks(prev => [...prev, { songId, chunkIndex }]);
        }
    };
    
    const clearSelection = useCallback(() => {
        setSelectedChunks([]);
        setMoveMode('idle');
    }, []);
    
    const isChunkSelected = (songId: number, chunkIndex: number) => {
        return selectedChunks.some(s => s.songId === songId && s.chunkIndex === chunkIndex);
    };

    const handleDuplicateSelectedChunks = useCallback(() => {
        if (selectedChunks.length === 0 || !previewSongs) return;

        const selectionsBySong = selectedChunks.reduce<Record<string, number[]>>((acc, { songId, chunkIndex }) => {
            if (!acc[songId]) acc[songId] = [];
            acc[songId].push(chunkIndex);
            return acc;
        }, {});

        let updatedSongs = [...previewSongs];

        Object.keys(selectionsBySong).forEach(songIdStr => {
            const songId = parseInt(songIdStr, 10);
            const songIndex = updatedSongs.findIndex(s => s.id === songId);
            if (songIndex === -1) return;

            const songToUpdate = { ...updatedSongs[songIndex] };
            const selectedIndices = selectionsBySong[songId].sort((a, b) => a - b);
            const chunksToDuplicate = selectedIndices.map(index => songToUpdate.chunks[index]);
            const lastSelectedIndex = Math.max(...selectedIndices);
            songToUpdate.chunks.splice(lastSelectedIndex + 1, 0, ...chunksToDuplicate);
            updatedSongs[songIndex] = songToUpdate;
        });

        updatePreviewState(updatedSongs);
        clearSelection();
    }, [selectedChunks, previewSongs, updatePreviewState, clearSelection]);

    const handleDeleteSelectedChunks = useCallback(() => {
        if (selectedChunks.length === 0 || !previewSongs) return;
        
        if (!window.confirm(`Are you sure you want to delete ${selectedChunks.length} slide(s)? This action can be undone.`)) {
            return;
        }

        const selectedIds = new Set(selectedChunks.map(s => `${s.songId}-${s.chunkIndex}`));

        let updatedSongs = previewSongs
            .map(song => {
                const newChunks = song.chunks.filter((_, index) => !selectedIds.has(`${song.id}-${index}`));
                return { ...song, chunks: newChunks };
            })
            .filter(song => song.chunks.length > 0);

        updatePreviewState(updatedSongs);
        clearSelection();
    }, [selectedChunks, previewSongs, updatePreviewState, clearSelection]);
    
    const handleSelectAll = useCallback(() => {
        if (!previewSongs) return;
        const allChunks: SelectedChunk[] = [];
        previewSongs.forEach(song => {
            song.chunks.forEach((_, chunkIndex) => {
                allChunks.push({ songId: song.id, chunkIndex });
            });
        });
        setSelectedChunks(allChunks);
    }, [previewSongs]);

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    const handleUndo = useCallback(() => {
        if (canUndo) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setPreviewSongs(history[newIndex]);
        }
    }, [canUndo, historyIndex, history]);

    const handleRedo = useCallback(() => {
        if (canRedo) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setPreviewSongs(history[newIndex]);
        }
    }, [canRedo, historyIndex, history]);
    
    // NEW: Library Integration
    const handleAddSongsFromLibrary = (songsToAdd: LibrarySong[]) => {
        const newSongObjects = songsToAdd.map(libSong => ({
            ...initialSong,
            id: nextId(), // Ensure unique ID
            title: libSong.title,
            lyrics: libSong.lyrics,
        }));

        setSongs(prevSongs => {
            // If current list is just one empty song, replace it
            if (prevSongs.length === 1 && !prevSongs[0].title.trim() && !prevSongs[0].lyrics.trim()) {
                return newSongObjects.length > 0 ? newSongObjects : prevSongs;
            }
            // Otherwise, append
            return [...prevSongs, ...newSongObjects];
        });
        setIsLibraryModalOpen(false);
    };

    // --- UI Mode & Major Action Handlers ---
    const handleEdit = async () => {
        if (isDirty) {
             await saveProjectToFile(downloadFileName); // Auto-save changes
             setFeedback({ type: 'info', message: `Changes to "${downloadFileName}" were automatically saved.` });
             setTimeout(() => setFeedback(null), 4000);
        }
        
        // BUG FIX: Clear chunks from the master 'songs' state to ensure a clean return to the form
        setSongs(prevSongs => prevSongs.map(song => {
            const { chunks, ...rest } = song;
            return rest;
        }));

        setLastDownloadedFile(null);
        setError(null);
        clearSelection();
        setZoomLevel(1.0);
        setPreviewSongs(null);
        setHistory([]);
        setHistoryIndex(-1);
    };

    const handleGenerate = useCallback(async () => {
        const isValid = songs.every(s => s.title.trim() && s.lyrics.trim());
        if (!isValid) {
            setError("Please ensure all songs have a Title and Lyrics entered.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setLastDownloadedFile(null);
        try {
            const updatedSongs = generateChunksForSongs(songs);
            
            const totalSlideCount = updatedSongs.reduce((acc, s) => acc + (s.chunks ? s.chunks.length : 0), 0);

            if (totalSlideCount === 0) {
                 setError("Please enter valid lyrics in at least one song to generate slides.");
            } else {
                const initialState = JSON.parse(JSON.stringify(updatedSongs));
                setSongs(initialState);
                setPreviewSongs(initialState);
                setHistory([initialState]);
                setHistoryIndex(0);
                setZoomLevel(1.0);
                setIsSettingsExpanded(false); // Collapse settings on generate
            }
        } catch (err) {
            console.error("Processing error:", err);
            setError("An unexpected error occurred during lyric processing.");
        } finally {
            setIsLoading(false);
        }
    }, [songs]); 

    const handleDownload = useCallback(async () => {
        const songsToDownload = previewSongs || songs; // Use previewSongs if available
        const hasChunks = songsToDownload.some(s => s.chunks && s.chunks.length > 0);
        if (!hasChunks) return; 
        
        setIsLoading(true);
        setError(null);
        setLastDownloadedFile(null);
        try {
            const baseName = downloadFileName.trim() || 'Multi_Song_Presentation';
            const sanitizedBaseName = baseName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
            const finalFilename = `${sanitizedBaseName}.pptx`;
            
            const generatedFilename = downloadPPTX(songsToDownload, textColor, backgroundColor, pptxFontSize, fontFamily, includeSlideNumbers, finalFilename);
            setLastDownloadedFile(generatedFilename);

            if (isDirty) {
                await handleSaveProject(); // Save the project if downloading with changes
            }
        } catch (err) {
            console.error("Download error:", err);
            setError("An error occurred while creating the presentation file.");
        } finally {
            setIsLoading(false);
        }
    }, [previewSongs, songs, downloadFileName, textColor, backgroundColor, pptxFontSize, fontFamily, includeSlideNumbers, isDirty, handleSaveProject]);
    
     // --- NEW EXPORT HANDLERS ---
    const handleExportPDF = async () => {
        if (!isInPreviewMode || !previewSongs) return;
        setIsLoading(true);
        setFeedback({ type: 'info', message: 'Generating PDF, this may take a moment...' });

        const { jsPDF } = jspdf;
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [800, 600] });

        try {
            const slideNodes = document.querySelectorAll('.exportable-slide');
            for (let i = 0; i < slideNodes.length; i++) {
                const node = slideNodes[i] as HTMLElement;
                const canvas = await html2canvas(node, { scale: 2, backgroundColor: backgroundColor });
                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, 0, 800, 600);
            }

            const baseName = downloadFileName.trim() || 'Presentation';
            const sanitizedBaseName = baseName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
            pdf.save(`${sanitizedBaseName}.pdf`);
            setFeedback({ type: 'success', message: 'PDF export successful!' });
        } catch (err) {
            console.error("PDF Export error:", err);
            setError("An error occurred while creating the PDF file.");
            setFeedback(null);
        } finally {
            setIsLoading(false);
            setTimeout(() => setFeedback(null), 3000);
            setIsExportDropdownOpen(false);
        }
    };

    const handleExportTXT = () => {
        if (!isInPreviewMode || !previewSongs) return;
        
        const textContent = previewSongs.map(song => {
            const title = song.title.toUpperCase();
            const lyrics = song.chunks.filter(c => c.type === 'lyric').map(c => c.text).join('\n\n');
            return `${title}\n--------------------\n${lyrics}`;
        }).join('\n\n\n');

        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        const baseName = downloadFileName.trim() || 'Lyrics';
        const sanitizedBaseName = baseName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
        a.download = `${sanitizedBaseName}_lyrics.txt`;
        
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsExportDropdownOpen(false);
    };

    const handleGenerateAndDownload = async () => {
        const isValid = songs.every(s => s.title.trim() && s.lyrics.trim());
        if (!isValid) {
            setError("Please ensure all songs have a Title and Lyrics entered.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setLastDownloadedFile(null);
        try {
            const songsWithChunks = generateChunksForSongs(songs);
            
            const totalSlideCount = songsWithChunks.reduce((acc, s) => acc + (s.chunks ? s.chunks.length : 0), 0);
            if (totalSlideCount === 0) {
                 setError("Please enter valid lyrics to generate slides.");
                 setIsLoading(false);
                 return;
            }

            const baseName = downloadFileName.trim() || 'Multi_Song_Presentation';
            const sanitizedBaseName = baseName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
            const finalFilename = `${sanitizedBaseName}.pptx`;
            
            const generatedFilename = downloadPPTX(songsWithChunks, textColor, backgroundColor, pptxFontSize, fontFamily, includeSlideNumbers, finalFilename);
            setLastDownloadedFile(generatedFilename);

        } catch (err) {
            console.error("Generate & Download error:", err);
            setError("An error occurred while creating the presentation file.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const totalSlideCount = isInPreviewMode && previewSongs ? previewSongs.reduce((acc, s) => acc + (s.chunks ? s.chunks.length : 0), 0) : 0;
    
    const customizationProps = {
        textColor, setTextColor, backgroundColor, setBackgroundColor, theme, setTheme,
        fontSizeInput, setFontSizeInput, downloadFileName, setDownloadFileName,
        fontFamily, setFontFamily, includeSlideNumbers, setIncludeSlideNumbers, isLoading,
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
                            {/* BUG FIX: Added label for accessibility */}
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
                             {/* BUG FIX: Added htmlFor for accessibility */}
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
                                className="lyrics-textarea w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition duration-150 shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderForm = () => (
        <>
            <div className="text-center mb-8">
                <Music className={`w-10 h-10 mx-auto text-indigo-600 mb-3`} /> 
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Multi-Song Slide Generator
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Create a single presentation containing multiple songs, each with its own title slide.
                </p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">Project Management</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleSaveProject}
                        disabled={isLoading}
                        title="Save the current project state (songs, lyrics, and settings) to your browser's local storage"
                        className="flex-1 py-3 px-4 rounded-xl text-blue-600 font-bold flex items-center justify-center space-x-2 transition duration-300 transform active:scale-95 shadow-md border-2 border-blue-500 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-5 h-5"/>
                        <span>Save Project</span>
                    </button>
                    <div className="relative flex-1" ref={loadDropdownRef}>
                        <button
                            onClick={toggleLoadDropdown}
                            disabled={isLoading}
                            title="Load a previously saved project from your browser"
                            className="w-full py-3 px-4 rounded-xl text-gray-600 font-bold flex items-center justify-center space-x-2 transition duration-300 transform active:scale-95 shadow-md border-2 border-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-700/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FolderUp className="w-5 h-5"/>
                            <span>Load Project</span>
                        </button>
                        {isLoadDropdownOpen && (
                            <div className="absolute bottom-full mb-2 w-full bg-white dark:bg-gray-700 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-600 z-10 max-h-60 overflow-y-auto">
                                {savedProjects.length > 0 ? (
                                    <ul>
                                        {savedProjects.map(projectName => (
                                            <li key={projectName}>
                                                <button 
                                                    onClick={() => handleLoadProject(projectName)}
                                                    title={`Load the project '${projectName}'`}
                                                    className="w-full text-left px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 dark:text-gray-200 transition"
                                                >
                                                    {projectName}
                                                </button>
                                            </li>
                                        ))}
                                        <li><hr className="border-gray-200 dark:border-gray-600 my-1" /></li>
                                        <li>
                                            <button 
                                                onClick={handleClearAllProjects}
                                                title="Delete all saved projects from your browser. This cannot be undone."
                                                className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/50 transition"
                                            >
                                                <Trash2 className="w-4 h-4 inline mr-2"/>
                                                Clear All Projects
                                            </button>
                                        </li>
                                    </ul>
                                ) : (
                                    <p className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">No saved projects found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Your work is saved in your browser's local storage. It is not uploaded anywhere.
                </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                 <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">Global Customization</h2>
                <GlobalCustomizationSettings {...customizationProps} />
            </div>
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
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
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    onClick={handleGenerateAndDownload}
                    disabled={isLoading || songs.some(s => !s.title.trim() || !s.lyrics.trim())}
                    title="Generate and immediately download the PPTX file without entering the preview mode"
                    className={`w-full py-4 px-4 rounded-xl text-white font-bold text-lg flex items-center justify-center space-x-2 transition duration-300 transform active:scale-95 shadow-lg 
                        ${isLoading || songs.some(s => !s.title.trim() || !s.lyrics.trim())
                            ? 'bg-green-300 dark:bg-green-800 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 shadow-green-500/50'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Download className="w-6 h-6" />
                            <span>Download PPT</span>
                        </>
                    )}
                </button>
                
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || songs.some(s => !s.title.trim() || !s.lyrics.trim())}
                    title="Process lyrics and go to the preview screen to edit slides before downloading"
                    className={`w-full py-4 px-4 rounded-xl text-white font-bold text-lg flex items-center justify-center space-x-2 transition duration-300 transform active:scale-95 shadow-lg 
                        ${isLoading || songs.some(s => !s.title.trim() || !s.lyrics.trim())
                            ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/50'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Eye className="w-6 h-6" />
                            <span>Preview</span>
                        </>
                    )}
                </button>
            </div>
        </>
    );

    const renderPreview = () => {
        // --- WYSIWYG Font Size Calculation ---
        const BASE_PREVIEW_FONT_SIZE_PX = 24; // Visual baseline in pixels for the default 54pt size.
        const TITLE_PPTX_FONT_SIZE = 68; // As defined in downloadPPTX function.
        
        const lyricPreviewFontSize = (pptxFontSize / DEFAULT_FONT_SIZE) * BASE_PREVIEW_FONT_SIZE_PX;
        const titlePreviewFontSize = (TITLE_PPTX_FONT_SIZE / DEFAULT_FONT_SIZE) * BASE_PREVIEW_FONT_SIZE_PX;

        return (
            <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Presentation Preview</h2> 
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 relative">
                    <div className="text-center md:text-left p-2 border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg w-full md:w-auto">
                        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                            Font Size: **{pptxFontSize}pt** | Total Slides: **{totalSlideCount}**
                        </p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 flex items-center justify-center md:justify-start">
                            <HandClick className="w-3 h-3 mr-1"/>
                            **Click checkbox to select slides. Drag slides to re-order.**
                        </p>
                    </div>

                    <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 ml-auto">
                        <button onClick={handleUndo} title="Undo last action" disabled={!canUndo} className="p-2 rounded-full text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"><Undo2 className="w-5 h-5"/></button>
                        <button onClick={handleRedo} title="Redo last action" disabled={!canRedo} className="p-2 rounded-full text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"><Redo2 className="w-5 h-5"/></button>
                        <button onClick={handleZoomOut} title="Zoom Out" disabled={zoomLevel <= 0.5} className="p-2 rounded-full text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"><ZoomOut className="w-5 h-5"/></button>
                        <button onClick={handleResetZoom} title={`Reset Zoom - Current: ${Math.round(zoomLevel * 100)}%`} className="p-2 rounded-full text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 shadow-md text-sm font-bold w-12"><span className="text-xs">{Math.round(zoomLevel * 100)}%</span></button>
                        <button onClick={handleZoomIn} title="Zoom In" disabled={zoomLevel >= 2.0} className="p-2 rounded-full text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"><ZoomIn className="w-5 h-5"/></button>
                    </div>
                </div>

                <div className="flex justify-center flex-wrap gap-4">
                    <button onClick={handleEdit} title="Go back to the song list to edit lyrics or add/remove songs" className="py-3 px-6 rounded-xl bg-gray-200 text-gray-800 font-semibold flex items-center space-x-2 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 transition duration-150 shadow-md">
                        <Edit className="w-5 h-5"/>
                        <span>Edit Song List</span>
                    </button>
                    
                    <button onClick={handleSaveProject} title="Save the current state of your slides" disabled={!isDirty || isLoading} className="py-3 px-6 rounded-xl text-white font-bold flex items-center space-x-2 transition duration-150 transform active:scale-95 shadow-md bg-blue-600 hover:bg-blue-700 shadow-blue-500/50 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed">
                       {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin"/><span>Saving...</span></>) : (<><Save className="w-5 h-5"/><span>{isDirty ? 'Save Changes' : 'Project Saved'}</span></>)}
                    </button>
                    
                     <div className="relative" ref={exportDropdownRef}>
                        <button onClick={() => setIsExportDropdownOpen(p => !p)} disabled={isLoading} title="Download or export the presentation" className={`py-3 px-6 rounded-xl text-white font-bold flex items-center space-x-2 transition duration-150 transform active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${isLoading ? 'bg-green-300 cursor-wait' : 'bg-green-600 hover:bg-green-700 shadow-green-500/50'}`}>
                            {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin"/><span>Exporting...</span></>) : (<><FileDown className="w-5 h-5"/><span>Download / Export</span><ChevronDown className={`w-5 h-5 transition-transform ${isExportDropdownOpen ? 'rotate-180' : ''}`} /></>)}
                        </button>
                        {isExportDropdownOpen && (
                             <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-700 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-600 z-20 overflow-hidden">
                                <button onClick={handleDownload} className="w-full text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 dark:text-gray-200 transition flex items-center space-x-2"><Download className="w-5 h-5 text-green-500"/><span>Download **.pptx**</span></button>
                                <button onClick={handleExportPDF} className="w-full text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 dark:text-gray-200 transition flex items-center space-x-2"><File className="w-5 h-5 text-red-500"/><span>Export as **.pdf**</span></button>
                                <button onClick={handleExportTXT} className="w-full text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 dark:text-gray-200 transition flex items-center space-x-2"><FileText className="w-5 h-5 text-gray-500"/><span>Export as **.txt**</span></button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                    <button
                        onClick={() => setIsSettingsExpanded(p => !p)}
                        className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        aria-expanded={isSettingsExpanded}
                        title="Show or hide the global appearance and settings panel"
                    >
                        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
                            Customize Appearance & Settings
                        </h3>
                        {isSettingsExpanded ? <ChevronUp className="w-6 h-6 text-gray-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
                    </button>
                    {isSettingsExpanded && (
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                            <GlobalCustomizationSettings {...customizationProps} />
                        </div>
                    )}
                </div>
                
                <div className="space-y-8 max-h-[70vh] overflow-y-auto p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-900/70" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                    <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.3s ease-in-out', width: `calc(100% / ${zoomLevel})`, paddingBottom: `${100 * (zoomLevel - 1)}px` }}>
                        {previewSongs && previewSongs.map((song) => (
                            <div key={song.id} className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 border-b border-indigo-300 dark:border-indigo-700 pb-2 mb-4">
                                    {song.title}
                                </h3>

                                <div className="space-y-2">
                                    {song.chunks && song.chunks.map((chunk, index) => {
                                        const isSelected = isChunkSelected(song.id, index);
                                        const isTitleSlide = chunk.type === 'title';
                                        const uniqueKey = `${song.id}-${index}`;
                                        const isDragged = draggedItem && draggedItem.songId === song.id && draggedItem.chunkIndex === index;
                                        const isPartOfDrag = !!draggedItem && isSelected && !isDragged;
                                        const isDragOverTop = dragOverInfo && dragOverInfo.songId === song.id && dragOverInfo.chunkIndex === index && dragOverInfo.position === 'before';
                                        const isDragOverBottom = dragOverInfo && dragOverInfo.songId === song.id && dragOverInfo.chunkIndex === index && dragOverInfo.position === 'after';

                                        return (
                                            <div key={uniqueKey} className="w-full max-w-sm mx-auto relative group">
                                                <div className={`drop-indicator ${isDragOverTop ? 'visible' : ''}`}></div>
                                                <div 
                                                    id={`slide-${uniqueKey}`}
                                                    onDragOver={(e) => handleDragOver(e, song.id, index)}
                                                    onDragEnd={handleDragEnd}
                                                    className={`exportable-slide w-full shadow-xl rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 relative transition-all duration-200
                                                        ${isSelected ? 'slide-selected' : ''} ${isDragged ? 'dragging' : ''} ${isPartOfDrag ? 'part-of-drag' : ''}`
                                                    }
                                                    style={{ backgroundColor: backgroundColor }}
                                                >
                                                    <div
                                                        className="drag-handle-area"
                                                        draggable="true"
                                                        onDragStart={(e) => handleDragStart(e, song.id, index)}
                                                    >
                                                        <Menu className="drag-handle-icon w-6 h-6" />
                                                    </div>
                                                    <label htmlFor={`select-chunk-${uniqueKey}`} className="absolute top-2 right-2 z-10 p-1 cursor-pointer" title="Select/Deselect this slide for bulk actions">
                                                        <input id={`select-chunk-${uniqueKey}`} type="checkbox" checked={isSelected} onChange={() => toggleChunkSelection(song.id, index)} className="sr-only peer" disabled={moveMode === 'selecting_target'} />
                                                        <div className="w-6 h-6 rounded-md border-2 border-white/50 bg-black/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 peer-checked:bg-indigo-600 peer-checked:border-indigo-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                        </div>
                                                    </label>
                                                    
                                                    <div className="preview-actions">
                                                        <button onClick={() => handleDuplicateChunk(song.id, index)} title="Duplicate Slide" disabled={moveMode === 'selecting_target'} className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-200 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"><Copy className="w-4 h-4"/></button>
                                                        {song.chunks.length > 1 && (
                                                            <button onClick={() => handleDeleteChunk(song.id, index)} title="Delete Slide" disabled={moveMode === 'selecting_target'} className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-200 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"><Trash2 className="w-4 h-4"/></button>
                                                        )}
                                                    </div>
                                                    
                                                    {isTitleSlide && <p className="absolute top-1 left-2 text-xs font-semibold text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition duration-300">TITLE</p>}

                                                    <div className="preview-slide" style={{ backgroundColor: backgroundColor }}>
                                                        <div 
                                                            contentEditable="true" 
                                                            suppressContentEditableWarning={true} 
                                                            onBlur={(e) => handleChunkEdit(song.id, index, e.currentTarget.textContent)} 
                                                            className={`preview-slide-editable`} 
                                                            title="Click to edit the text directly on this slide"
                                                            style={{ 
                                                                color: textColor, 
                                                                fontFamily: isTitleSlide ? 'Arial Black' : fontFamily,
                                                                fontSize: `${isTitleSlide ? titlePreviewFontSize : lyricPreviewFontSize}px`,
                                                                lineHeight: 1.2,
                                                            }}
                                                        >
                                                            {chunk.text}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`drop-indicator ${isDragOverBottom ? 'visible' : ''}`}></div>

                                                <div className="relative h-6 group w-full max-w-sm mx-auto">
                                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                        <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                                                    </div>
                                                    <div className="relative flex justify-center">
                                                        <button
                                                            onClick={() => handleInsertEmptySlide(song.id, index)}
                                                            title="Insert a new blank slide after this one"
                                                            className="px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 flex items-center space-x-1 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                                                        >
                                                            <Plus className="w-4 h-4"/>
                                                            <span>Add Slide</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {selectedChunks.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-indigo-800 text-white p-4 shadow-2xl z-30 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <span className="font-semibold text-lg"><span className="bg-white text-indigo-800 py-1 px-2 rounded-md mr-1">{selectedChunks.length}</span> slide(s) selected.</span>
                        <button onClick={handleDuplicateSelectedChunks} title="Create a copy of the selected slides and insert them after the last selected slide" className="py-2 px-4 rounded-lg font-bold transition duration-150 shadow-lg w-full sm:w-auto bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-[1.02]"><Copy className="w-5 h-5 inline mr-2"/>Duplicate</button>
                        <button onClick={handleDeleteSelectedChunks} title="Delete the selected slides" className="py-2 px-4 rounded-lg font-bold transition duration-150 shadow-lg w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 hover:scale-[1.02]"><Trash2 className="w-5 h-5 inline mr-2"/>Delete</button>
                        <button onClick={clearSelection} title="Deselect all slides" className="py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 transition duration-150 w-full sm:w-auto"><XCircle className="w-5 h-5 inline mr-2"/>Clear Selection</button>
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 transition-all duration-300">
                
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

                    {feedback && (
                        <div className={`
                            ${feedback.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-300' : ''}
                            ${feedback.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300' : ''}
                            ${feedback.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 dark:border-blue-500/50 text-blue-700 dark:text-blue-300' : ''}
                            px-4 py-3 rounded-lg flex items-center space-x-2 transition-opacity duration-300
                        `}>
                            {feedback.type === 'success' && <CheckCircle className="w-5 h-5" />}
                            {feedback.type === 'error' && <XCircle className="w-5 h-5" />}
                            {feedback.type === 'info' && <Info className="w-5 h-5" />}
                            <p className="font-medium">{feedback.message}</p>
                        </div>
                    )}
                </div>
                {isInPreviewMode ? renderPreview() : renderForm()}
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
        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}