# pr-helper

A [GitHub Action](https://github.com/features/actions) to help with managing PRs through automation of common tasks. Currently supports the following functionality:

- Welcome message on new PR
- Automatic Label assignment and removal
  - Based on Review criteria (required/provided)
  - If PRs qualify for automatic merge (___in preview___)
- Welcome message on new PR
- PR Comment automation
  - Welcome message with instructions on new PRs
  - Assign a label indicating if the PR is ready or on hold based on key words
- Pull Request Merge
  - Automatically merge when criteria is met
  - Respect requested reviews (_i.e. CODEOWNERS_)
  - Respect a minimal review count (_for now configured by input param, repo setting on roadmap_)

## Inputs

Set the following inputs in the workflow file

### `configuration-path`

**Required** The path to the configuration file e.g. `.github/prhelper.yml`.

### `repo-token`

**Required** The token to use for github authentication. Recommend using `${{ secrets.GITHUB_TOKEN }}`. If additional access is required use a PAT/Secret and set it as a secret. More info see [here](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token).

> If you have enabled Branch Protection rules then a PAT/Secret will need to be configured.

### `enable-prmerge-automation`

**Required** Set to true to enable the auto merge capabilities

### `enable-prcomment-automation`

**Required** Set to true to enable the PR/Issue comment automation

### `enable-prlabel-automation`

**Required** Set to true to enable the PR label automation

### `enable-welcomemessage`

**Required** Set to true to automatically send a welcome message to new contributors

### `welcome-message`

The custom welcome message to send to new contributors

### `prmerge-requireallchecks`

Set to true if all checks need to complete before auto merging

### `prmerge-requirereviewcount`

Should match the setting in your GitHub repo. Set it to -1 to disable.

### `permerge-method`

The method to use when merging the PRs

### `prlabel-default`

The initial label to set on PRs when first created

### `prlabel-ready`

The label to use when the PR has been signed off and ready for merge

### `prlabel-onhold`

The label to use when the PR is on hold

### `prlabel-reviewrequired`

The label to use when the PR requires reviews

### `prlabel-automerge`

The label to set on PRs when it qualifies for automatic merge by this action

## Outputs

None

## Example usage

Create the following file within your repo as `.github/workflows/pullrequest.yml` to configure an action.

```yml
name: PR Helper

on: [pull_request, pull_request_review, issue_comment]

jobs:
  prhelper_job:
    runs-on: ubuntu-latest
    steps:
    - name: Run PR Helper
      id: runprhelper
      uses: Matticusau/pr-helper@v1
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
```

> Note: The `uses` syntax includes tag/branch specification. For the latest release see [tags](https://github.com/Matticusau/pr-helper/tags).

To restrict the branches that this workflow executes on use this syntax

```yml
name: PR Helper

on:
  pull_request:
    branches:
      - master
  pull_request_review:
    branches:
      - master
  issue_comment:
    branches:
      - master
jobs:
  ...
```

## Example inputs

The action can be customized using the additional inputs on the workflow yaml file. This will always be read from the default branch of the repository, rather than custom yaml config files which can be overridden as they are read in the branch where the workflow is triggered from.

```yml
with:
  repo-token: ${{ secrets.GITHUB_TOKEN }}
  enable-prmerge-automation: true
  enable-prcomment-automation: true
  enable-prlabel-automation: true
  enable-welcomemessage: true
  welcome-message: "Thanks for opening an issue! Make sure you've followed CONTRIBUTING.md."
  prmerge-requireallchecks: true
  prmerge-requirereviewcount: 1
  permerge-method: 'merge'
  prlabel-default: 'pr-onhold'
  prlabel-ready: 'pr-ready'
  prlabel-onhold: 'pr-onhold'
  prlabel-reviewrequired: 'review-required'
  prlabel-automerge: 'auto-merge'
```

## Troubleshooting

If you are having issues running the action enable the debug logs as some additional logging has been built into the Action.

1. To enable runner diagnostic logging, set the following secret in the repository that contains the workflow: `ACTIONS_RUNNER_DEBUG` to `true`.
1. To download runner diagnostic logs, download the log archive of the workflow run. The runner diagnostic logs are contained in the `runner-diagnostic-logs` folder. For more information on downloading logs, see [Downloading logs](https://help.github.com/en/actions/configuring-and-managing-workflows/managing-a-workflow-run#downloading-logs).

[Enable debug logging](https://help.github.com/en/actions/configuring-and-managing-workflows/managing-a-workflow-run#enabling-debug-logging)

## Known issues

None

## Related resources

- [Official GitHub Action docs](https://help.github.com/en/actions)