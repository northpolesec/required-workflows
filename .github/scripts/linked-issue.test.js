const assert = require('node:assert/strict');
const { hasLinearKey, isBot } = require('./linked-issue.js');

assert.ok(hasLinearKey('Fix login', '', 'user/ws-42'), 'lowercase branch key');
assert.ok(hasLinearKey('Fix login', 'Fixes WS-123', 'user/fix-login'), 'key in body');
const url = 'https://linear.app/north-pole-security/issue/WS-1974';
assert.ok(hasLinearKey('Fix login', `Fixes [WS-1974](${url})`, 'user/fix-login'), 'Fixes link in body');
assert.ok(hasLinearKey('Fix login', `Related to [WS-1974](${url})`, 'user/fix-login'), 'Related to link in body');
assert.ok(hasLinearKey('Fix login', '', 'eric/ws-1974-skip-bot-prs'), 'Linear branch name');
assert.ok(!hasLinearKey('Fix login', null, 'user/fix-login'), 'empty body, no key');
assert.ok(!hasLinearKey('Fix login', '', 'user-patch-1'), 'GitHub web editor branch is not a key');
assert.ok(!hasLinearKey('XWS-1', '', 'main'), 'key must start a word');
for (const s of ['SHA-256', 'UTF-8', 'ISO-8601', 'CVE-2024-1234', 'RFC-9110', 'TLS-1', 'ABC-123']) {
  assert.ok(!hasLinearKey(s, '', 'main'), `${s} is not a key`);
}
assert.ok(isBot({ login: 'dependabot[bot]', type: 'Bot' }), 'Dependabot is a bot');
assert.ok(isBot({ login: 'nps-schema-doc-generator[bot]', type: 'Bot' }), 'app bot');
assert.ok(!isBot({ login: 'someone', type: 'User' }), 'a person is not a bot');
console.log('ok');
