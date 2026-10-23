// A Linear key is 2 to 5 letters, a dash, and a number. The pattern names no
// team keys because this file is public. It skips common non-issue tokens.
const KEY = /\b(?!(?:SHA|UTF|ISO|CVE|RFC|TLS)-)[A-Z]{2,5}-\d+\b/i;

// join() turns a null body into an empty string.
function hasLinearKey(title, body, branch) {
  return KEY.test([title, body, branch].join('\n'));
}

module.exports = { hasLinearKey };
