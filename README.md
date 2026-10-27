# required-workflows

Workflows that GitHub runs on pull requests in every North Pole Security repository. An organization ruleset makes each workflow a required check.

## Linked Issue Requirement

The `linked-issue` check fails when a pull request has no Linear issue key, for example `WS-123`. The check looks in the pull request title, the body, and the branch name. It ignores case.

Pull requests from GitHub App bots, such as Dependabot, pass.

If a pull request has no issue, add a line to the body that starts with `No-Issue:` and gives the reason, for example `No-Issue: fix a typo in the README`. The check passes and shows the reason as a notice. A `No-Issue:` line with no reason does not count.

If the check fails, add the key to the title or the body, or add a `No-Issue:` line to the body. Then push a commit or run the check again. GitHub does not run the check again when you only edit the title or the body.

## Test

```sh
node .github/scripts/linked-issue.test.js
```

## License

MIT. See [LICENSE](LICENSE).
