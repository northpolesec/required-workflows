# required-workflows

Workflows that GitHub runs on pull requests in every North Pole Security repository. An organization ruleset makes each workflow a required check.

## linked-issue

The `linked-issue` check fails when a pull request has no Linear issue key. A key is 2 to 5 letters, a dash, and a number, for example `ABC-123`. The check looks in the pull request title, the body, and the branch name. It ignores case.

The check does not count common tokens such as `SHA-256`, `UTF-8`, and `CVE-2024-1234` as keys. Pull requests from Dependabot pass.

If the check fails, add the key to the title or the body. Then push a commit or run the check again. GitHub does not run the check again when you only edit the title or the body.

## Test

```sh
node .github/scripts/linked-issue.test.js
```

## License

MIT. See [LICENSE](LICENSE).
