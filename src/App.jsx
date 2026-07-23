import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldAlert, Users, UserPlus, BookOpen, X, ArrowUp } from 'lucide-react';
import { fetchGitHubData } from './services/githubApi';
import { LanguageDistribution, RepositoryCard } from "./components/RepoDashboard";

export default function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const result = await fetchGitHubData(username.trim());
      setData(result);
    } catch (err) {
      if (err.message.includes('403') || err.message.toLowerCase().includes('rate limit')) {
        setError('GitHub API Rate Limit Exceeded (60 req/hr). Please try again later.');
      } else if (err.message.includes('404')) {
        setError('Developer identity not found. Please verify the username.');
      } else {
        setError(err.message || 'An unexpected network degradation occurred.');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUsername('');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center py-12 px-4 selection:bg-cyan-500 selection:text-slate-950 font-sans relative">
      <div className="w-full max-w-4xl">

        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-tight py-1">
            DevIdentity Visualizer
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium tracking-wide">
            A visually rich, animated interpretation of developer identity
          </p>
        </header>

        <form onSubmit={handleSearch} className="flex gap-3 mb-12 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Enter GitHub developer username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm placeholder-slate-500 text-white transition-all shadow-inner"
            />

            {username && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button type="submit" className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/10 active:scale-98 cursor-pointer">
            Analyze Profile
          </button>
        </form>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 text-sm font-mono tracking-wider animate-pulse">COMPILING DATABASE REGISTERS...</p>
            </motion.div>
          )}

          {error && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 max-w-md mx-auto text-center backdrop-blur-md shadow-xl">
              <ShieldAlert className="w-8 h-8 text-rose-400 mx-auto mb-3" />
              <p className="text-sm font-mono text-rose-300 font-semibold">{error}</p>
            </motion.div>
          )}

          {data && !loading && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-8">

              <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-2xl">
                <img src={data.profile.avatar_url} alt={data.profile.name} className="w-24 h-24 rounded-2xl border border-white/10 object-cover shadow-xl" />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">{data.profile.name || data.profile.login}</h2>
                  <p className="text-cyan-400 text-sm font-mono mt-0.5">@{data.profile.login}</p>
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed max-w-2xl font-normal">
                    {data.profile.bio || "This developer prefers to let their source code do the talking. (No biography provided)"}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-5 text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-white/5 shadow-sm">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> Followers: <span className="font-mono text-cyan-400 font-bold">{data.profile.followers}</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-white/5 shadow-sm">
                      <UserPlus className="w-3.5 h-3.5 text-slate-400" /> Following: <span className="font-mono text-cyan-400 font-bold">{data.profile.following || 0}</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-white/5 shadow-sm">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" /> Public Repos: <span className="font-mono text-cyan-400 font-bold">{data.profile.public_repos}</span>
                    </span>
                  </div>
                </div>
              </div>

              {data.hasNoRepos ? (
                <div className="p-10 text-center bg-slate-900/20 rounded-2xl border border-slate-800/60 border-dashed text-slate-400 text-sm font-medium">
                  This user possesses an empty repository footprint. No core metrics are available to render.
                </div>
              ) : (
                <>
                  <LanguageDistribution rawJson={data.languages} />
                  <div>
                    <h3 className="text-lg font-bold text-slate-200 mb-4 tracking-tight pl-1">Top Repository Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.topRepos.map((repo) => (
                        <RepositoryCard
                          key={repo.id}
                          name={repo.name}
                          description={repo.description}
                          language={repo.language}
                          stars={repo.stargazers_count}
                          forks={repo.forks_count}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-cyan-500 text-slate-950 rounded-full shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 active:scale-90 transition-transform duration-200 z-50 cursor-pointer border border-cyan-400/30"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}