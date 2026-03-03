#!/usr/bin/env node
/**
 * Runtime GitHub token check (safe logging, no token output).
 */

const API = 'https://api.github.com/user';

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN missing');
    process.exit(1);
  }

  const res = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'openclaw-token-check'
    }
  });

  if (!res.ok) {
    console.error(`GitHub token check failed: HTTP ${res.status}`);
    process.exit(1);
  }

  const data = await res.json();
  if (!data?.login) {
    console.error('GitHub token check failed: missing login');
    process.exit(1);
  }

  console.log(`GitHub token valid for user: ${data.login}`);
}

main().catch((err) => {
  console.error(`GitHub token check exception: ${err.message}`);
  process.exit(1);
});
