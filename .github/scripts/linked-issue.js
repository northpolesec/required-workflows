// Matches the issue keys of our Linear teams, in any case.
const KEY = /\b(?:[KW][MPS]|[FINRSZ][AELMNP][FLQRSTWX])-\d+\b/i;

// join() turns a null body into an empty string.
function hasLinearKey(title, body, branch) {
  return KEY.test([title, body, branch].join('\n'));
}

// GitHub App bots (Dependabot, schema generators) open PRs with no issue.
// Only org admins can install apps, so a person cannot use this to skip.
function isBot(user) {
  return user.type === 'Bot';
}

module.exports = { hasLinearKey, isBot };
