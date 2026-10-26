const assert = require('node:assert/strict');
const { hasLinearKey, noIssueReason } = require('./linked-issue.js');

assert.ok(hasLinearKey('Fix login', '', 'user/abc-42'), 'lowercase branch key');
assert.ok(hasLinearKey('Fix login', 'Fixes ABC-123', 'user/fix-login'), 'key in body');
assert.ok(!hasLinearKey('Use SHA-256 for digests', '', 'user/sha'), 'SHA-256 is not a key');
assert.ok(!hasLinearKey('Fix login', null, 'user/fix-login'), 'empty body, no key');
for (const s of ['UTF-8', 'ISO-8601', 'CVE-2024-1234', 'RFC-9110', 'TLS-1']) {
  assert.ok(!hasLinearKey(s, '', 'main'), `${s} is not a key`);
}

assert.equal(noIssueReason('Summary\n\nNo-Issue: typo fix\r\n'), 'typo fix', 'reason on its own line');
assert.equal(noIssueReason('no-issue:   bump CI cache  '), 'bump CI cache', 'case and spaces');
assert.equal(noIssueReason('No-Issue:'), null, 'empty reason');
assert.equal(noIssueReason('No-Issue:   \nnext line'), null, 'blank reason does not span lines');
assert.equal(noIssueReason('See No-Issue: below'), null, 'must start a line');
assert.equal(noIssueReason('<!-- No-Issue: reason -->'), null, 'template comment');
assert.equal(noIssueReason('<!--\nNo-Issue: reason\n-->'), null, 'multiline template comment');
assert.equal(noIssueReason('<!--\nNo-Issue: reason'), null, 'unclosed template comment');
assert.equal(noIssueReason('<!-- hint -->\nNo-Issue: real reason'), 'real reason', 'reason after a comment');
assert.equal(noIssueReason(null), null, 'null body');
console.log('ok');
