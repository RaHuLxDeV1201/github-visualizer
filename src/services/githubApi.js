export const fetchGitHubData = async (username) => {
  const BASE_URL = "https://api.github.com";
  
  // 1. Fetch User Base Profile Details
  const userResponse = await fetch(`${BASE_URL}/users/${username}`);
  
  if (userResponse.status === 404) {
    throw new Error("This developer profile does not exist in the GitHub registry.");
  }
  
  if (userResponse.status === 403 || userResponse.headers.get("x-ratelimit-remaining") === "0") {
    throw new Error("GitHub API rate limit exceeded. Please authenticate or try again later.");
  }
  
  if (!userResponse.ok) {
    throw new Error("Network latency or GitHub server exception. Please retry.");
  }
  
  const profile = await userResponse.json();

  // 2. Fetch User Repositories (Up to 100 items for accurate data maps)
  const reposResponse = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`);
  if (!reposResponse.ok) throw new Error("Failed to compile user repository metrics.");
  const repos = await reposResponse.json();

  // 3. Mathematical Accumulation for Custom Language Data Visualization
  const languageCounts = {};
  let totalReposWithLanguages = 0;

  repos.forEach(repo => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      totalReposWithLanguages++;
    }
  });

  // Transform object data into a sorted array of percentages
  const languages = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalReposWithLanguages) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  // Filter top repositories sorted by star traction
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return { profile, languages, topRepos, hasNoRepos: repos.length === 0 };
};