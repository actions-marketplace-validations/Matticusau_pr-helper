# Pull Request notes

## GitHub API references

### Pulls data structure

Pull requests in draft will have this payload
```json
{
    "number": 123,
    ...
    "draft": false,
    ...
}
```

For a PR **waiting on Code Review** it will have this webhook payload

```json
{
    "number": 123,
    "state": "open",
    "locked": false,
    "title": "<<REDACTED>>",
    "requested_reviewers": [{...},{...}],
    "merged": false,
    "mergeable": true,
    "rebaseable": true,
    "mergeable_state": "blocked",
    "merged_by": null,
}
```

A PR which has been **approved by reviewers** will have this webhook payload

```json
{
    "number": 123,
    "state": "open",
    "locked": false,
    "title": "<<REDACTED>>",
    "requested_reviewers": [{...},{...}],
    "merged": false,
    "mergeable": true,
    "rebaseable": true,
    "mergeable_state": "clean",
    "merged_by": null,
}
```

A PR which has been **merged after approval** by reviewers will have this webhook payload

```json
{
    "number": 123,
    "state": "closed",
    "locked": false,
    "title": "<<REDACTED>>",
    "requested_reviewers": [{...},{...}],
    "merged": true,
    "mergeable": null,
    "rebaseable": null,
    "mergeable_state": "unknown",
    "merged_by": {...}
}
```

A PR which is **blocked by merge conflict** will have this webhook payload.
NOTE: This won't allow the actions to run if happens at first load

```json
{
    "number": 123,
    "state": "open",
    "locked": false,
    "title": "<<REDACTED>>",
    "merge_commit_sha": null,
    "requested_reviewers": [{...},{...}],
    "draft": false,
    "merged": false,
    "mergeable": false,
    "rebaseable": false,
    "mergeable_state": "dirty",
    "merged_by": null,
}
```