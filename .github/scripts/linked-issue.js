// A Linear key is 2 to 5 letters, a dash, and a number. The pattern names no
// team keys because this file is public. It skips common non-issue tokens.
const KEY = /\b(?!(?:SHA|UTF|ISO|CVE|RFC|TLS)-)[A-Z]{2,5}-\d+\b/i;

// A body line such as "No-Issue: typo fix" explains why the PR has no issue.
const NO_ISSUE = /^No-Issue:[ \t]*(\S.*)$/im;

// join() turns a null body into an empty string.
function hasLinearKey(title, body, branch) {
  return KEY.test([title, body, branch].join('\n'));
}

// Returns the No-Issue reason from the body, or null if there is none.
function noIssueReason(body) {
  const match = NO_ISSUE.exec(body ?? '');
  return match ? match[1].trim() : null;
}

module.exports = { hasLinearKey, noIssueReason };
