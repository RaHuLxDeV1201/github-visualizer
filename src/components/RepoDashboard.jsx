import React from 'react';
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

export function LanguageDistribution({ rawJson }) {
  let languages = [];
  try {
    languages = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
  } catch (e) {
    return <p className="text-red-400 text-sm">No language data available</p>;
  }

  return (
    <div className="bg-[#0f172a]/60 border border-slate-800/80 rounded-xl p-6 backdrop-blur-sm mb-8 w-full max-w-4xl mx-auto shadow-xl">
      <h3 className="text-base font-semibold text-slate-200 mb-4 tracking-wide">Language Distribution</h3>
      
      <div className="w-full h-3 flex rounded-full overflow-hidden bg-slate-800 mb-6">
        {languages.map((lang) => (
          <div
            key={lang.name}
            style={{ 
              width: `${lang.percentage}%`, 
              backgroundColor: LANGUAGE_COLORS[lang.name] || '#64748b' 
            }}
            title={`${lang.name}: ${lang.percentage}%`}
            className="h-full transition-all duration-350 hover:opacity-80 cursor-pointer"
          />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {languages.map((lang) => {
          const color = LANGUAGE_COLORS[lang.name] || '#64748b';
          return (
            <div key={lang.name} className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-sm font-medium text-slate-300 truncate">{lang.name}</span>
              <span className="text-xs text-slate-500 font-mono">{lang.percentage}%</span>
            </div>
          );
        })}
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