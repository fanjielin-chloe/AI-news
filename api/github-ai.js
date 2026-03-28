export default async function handler(req, res) {
  try {
    const repoRes = await fetch(
      "https://api.github.com/search/repositories?q=artificial+intelligence&sort=stars&per_page=5"
    );

    const repoData = await repoRes.json();

    const results = repoData.items.map(repo => ({
      name: repo.full_name,
      url: repo.html_url,
      stars: repo.stargazers_count,
      issues: repo.open_issues_count,
      description: repo.description,
    }));

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
