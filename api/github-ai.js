api/github-ai.js
export default async function handler(req, res) {
  try {
    const repoRes = await fetch(
      "https://api.github.com/search/repositories?q=artificial+intelligence&sort=stars&per_page=5"
    );

    const repoData = await repoRes.json();
    const repos = repoData.items;

    const results = await Promise.all(
      repos.map(async (repo) => {
        const detailRes = await fetch(repo.url);
        const detail = await detailRes.json();

        return {
          name: repo.full_name,
          url: repo.html_url,
          stars: repo.stargazers_count,
          issues: detail.open_issues_count,
          description: repo.description,
        };
      })
    );

    results.sort((a, b) => b.issues - a.issues);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
