const assert = require('node:assert/strict');
const { hasLinearKey } = require('./linked-issue.js');

assert.ok(hasLinearKey('Fix login', '', 'user/abc-42'), 'lowercase branch key');
assert.ok(hasLinearKey('Fix login', 'Fixes ABC-123', 'user/fix-login'), 'key in body');
assert.ok(!hasLinearKey('Use SHA-256 for digests', '', 'user/sha'), 'SHA-256 is not a key');
assert.ok(!hasLinearKey('Fix login', null, 'user/fix-login'), 'empty body, no key');
for (const s of ['UTF-8', 'ISO-8601', 'CVE-2024-1234', 'RFC-9110', 'TLS-1']) {
  assert.ok(!hasLinearKey(s, '', 'main'), `${s} is not a key`);
}
console.log('ok');
