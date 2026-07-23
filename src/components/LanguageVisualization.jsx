import React, { useState } from 'react';

// Predefined color map for popular languages with a fallback
const LANGUAGE_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    React: '#61dafb',
    Java: '#b07219',
    'C++': '#f34b7d',
    Go: '#00ADD8',
    Rust: '#dea584',
};

const getColor = (name) => LANGUAGE_COLORS[name] || '#8b5cf6';

export default function LanguageVisualization({ languages = [] }) {
    const [activeLang, setActiveLang] = useState(null);

    if (!languages || languages.length === 0) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400 text-center">
                No language data available.
            </div>
        );
    }

    // SVG Radial Math Parameters
    const radius = 70;
    const strokeWidth = 18;
    const circumference = 2 * Math.PI * radius;
    let accumulatedPercentage = 0;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-slate-100">Language Breakdown</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Hand-built SVG Radial Visualization */}
                <div className="relative flex justify-center items-center">
                    <svg viewBox="0 0 200 200" className="w-56 h-56 transform -rotate-90">
                        {languages.map((lang) => {
                            // Calculate segment stroke length and offset
                            const strokeDasharray = `${(lang.percentage / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);

                            accumulatedPercentage += lang.percentage;

                            const isHovered = activeLang?.name === lang.name;

                            return (
                                <circle
                                    key={lang.name}
                                    cx="100"
                                    cy="100"
                                    r={radius}
                                    fill="transparent"
                                    stroke={getColor(lang.name)}
                                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all duration-300 ease-out cursor-pointer"
                                    onMouseEnter={() => setActiveLang(lang)}
                                    onMouseLeave={() => setActiveLang(null)}
                                    style={{
                                        filter: isHovered ? 'drop-shadow(0px 0px 8px rgba(255,255,255,0.3))' : 'none'
                                    }}
                                />
                            );
                        })}
                    </svg>

                    {/* Dynamic Center Text Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                        {activeLang ? (
                            <>
                                <span className="text-sm font-medium text-slate-400">{activeLang.name}</span>
                                <span className="text-3xl font-extrabold text-white">{activeLang.percentage}%</span>
                            </>
                        ) : (
                            <>
                                <span className="text-3xl font-bold text-white">{languages.length}</span>
                                <span className="text-xs text-slate-400 font-medium">Languages</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Legend List */}
                <div className="space-y-3">
                    {languages.map((lang) => {
                        const isHovered = activeLang?.name === lang.name;
                        return (
                            <div
                                key={lang.name}
                                className={`flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${isHovered ? 'bg-slate-800 scale-[1.02]' : 'hover:bg-slate-800/50'
                                    }`}
                                onMouseEnter={() => setActiveLang(lang)}
                                onMouseLeave={() => setActiveLang(null)}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-3.5 h-3.5 rounded-full shadow-sm"
                                        style={{ backgroundColor: getColor(lang.name) }}
                                    />
                                    <span className="text-sm font-semibold">{lang.name}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-400">{lang.percentage}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}