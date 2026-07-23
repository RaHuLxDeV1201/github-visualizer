import React, { useState } from 'react';
import { Star, GitFork } from 'lucide-react';

const LANGUAGE_COLORS = {
  'C++': '#f34b7d',
  HTML: '#e34c26',
  Python: '#3572A5',
  TypeScript: '#3178c6',
  'Jupyter Notebook': '#DA5B0B',
  Java: '#b07219',
  CSS: '#563d7c',
  JavaScript: '#f1e05a',
};

const getColor = (name) => LANGUAGE_COLORS[name] || '#8b5cf6';

export function LanguageDistribution({ rawJson }) {
  const [activeLang, setActiveLang] = useState(null);

  let languages = [];
  try {
    languages = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
  } catch (e) {
    return <p className="text-red-400 text-sm">No language data available</p>;
  }

  if (!languages || languages.length === 0) {
    return (
      <div className="bg-[#0f172a]/60 border border-slate-800/80 rounded-xl p-6 text-slate-400 text-center backdrop-blur-sm mb-8 w-full max-w-4xl mx-auto shadow-xl">
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
    <div className="bg-[#0f172a]/60 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm mb-8 w-full max-w-4xl mx-auto shadow-xl">
      <h3 className="text-base font-semibold text-slate-200 mb-6 tracking-wide">Language Distribution</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Hand-built SVG Radial Visualization */}
        <div className="relative flex justify-center items-center">
          <svg viewBox="0 0 200 200" className="w-56 h-56 transform -rotate-90">
            {languages.map((lang) => {
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

        {/* Interactive Legend List */}
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
                  <span className="text-sm font-semibold text-slate-300">{lang.name}</span>
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

export function RepositoryCard({ name, description, language, stars, forks }) {
  return (
    <div className="group bg-[#0f172a]/40 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,182,212,0.06)]">
      <div>
        <h4 className="text-base font-bold text-slate-100 truncate mb-2 group-hover:text-cyan-400 transition-colors" title={name}>
          {name}
        </h4>
        <p className="text-slate-400 text-xs mt-2 line-clamp-2 min-h-[2.5rem] leading-relaxed font-normal">
          {description || "A quiet repository left to communicate completely through its compilation data."}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mt-4 pt-3 border-t border-white/5">
        {language && (
          <span className="text-slate-300 bg-slate-800/50 px-2 py-0.5 rounded text-[10px] font-mono border border-white/5">
            {language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
          <span className="font-mono">{stars || 0}</span>
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono">{forks || 0}</span>
        </span>
      </div>
    </div>
  );
}