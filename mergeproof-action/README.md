# MergeProof Action

MergeProof maps a pull request's acceptance criteria to changed implementation and test-file evidence.

## Add to a repository

```yaml
name: MergeProof
on:
  pull_request:
    types: [opened, edited, synchronize]

permissions:
  contents: read
  pull-requests: write

jobs:
  evidence:
    runs-on: ubuntu-latest
    steps:
      - uses: 0xnewbiewhermes/copymuse/mergeproof-action@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          fail-on-unproven: false
```

Add an `## Acceptance criteria` section with Markdown checkboxes to a pull request description. MergeProof posts one evidence brief and never checks out or executes pull-request code.
