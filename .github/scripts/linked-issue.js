// Matches the issue keys of our Linear teams, in any case. The character classes
// hide the real keys because this repo is public, so do not spell them out.
const KEY = /\b(?:[KW][MPS]|[FINRSZ][AELMNP][FLQRSTWX]|[QR][ST][CG][HK])-\d+\b/i;

// A body line such as "No-Issue: typo fix" explains why the PR has no issue.
const NO_ISSUE = /^No-Issue:[ \t]*(\S.*)$/im;

// HTML comments, such as PR template hints, do not render. An unclosed one hides the rest.
const HTML_COMMENT = /<!--[\s\S]*?(?:-->|$)/g;

// join() turns a null body into an empty string.
function hasLinearKey(title, body, branch) {
  return KEY.test([title, body, branch].join('\n'));
}

// GitHub App bots (Dependabot, schema generators) open PRs with no issue.
// Only org admins can install apps, so a person cannot use this to skip.
function isBot(user) {
  return user.type === 'Bot';
}

// Returns the No-Issue reason from the body, or null if there is none.
function noIssueReason(body) {
  const match = NO_ISSUE.exec((body ?? '').replace(HTML_COMMENT, ''));
  return match ? match[1].trim() : null;
}

module.exports = { hasLinearKey, isBot, noIssueReason };
