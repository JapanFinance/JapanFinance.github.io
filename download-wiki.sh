#! /bin/bash

# Requires: bash coreutils curl jq
# Prerequisite: git user is configured via git config

# Adapted from https://www.reddit.com/r/DataHoarder/comments/ga2p8y/comment/idpu8cs/

USER_AGENT='wikidownload/1.0'
DOWNLOAD_DIR="download"
DOCS_DIR="docs"
NONDOCS_DIR="archive"
SUBREDDIT="JapanFinance"

while read -r line; do
    # Reddit's anonymous access rate limit is 10 requests per minute
    # see https://www.reddit.com/r/redditdev/comments/14nbw6g/updated_rate_limits_going_into_effect_over_the/
    sleep 6.1

    PAGE="$line"
    # strip index/ from beginning of page path
    SOURCE_PAGE_JSON="./$DOWNLOAD_DIR/${PAGE#*index/}.json"
    TARGET_PAGE_MD="./$DOCS_DIR/${PAGE#*index/}.md"
    # do not publish config markdown, but archive it in this same repo
    if [[ $PAGE == config* ]]; then TARGET_PAGE_MD="./$NONDOCS_DIR/$PAGE.md"; fi

    # strip file name from end of path when making directories
    mkdir -p "${SOURCE_PAGE_JSON%/*}"
    mkdir -p "${TARGET_PAGE_MD%/*}"
    curl -sfL --user-agent "$USER_AGENT" "https://www.reddit.com/r/$SUBREDDIT/wiki/$PAGE.json" > "$SOURCE_PAGE_JSON"
    printf "%s/wiki/%s   " "$SUBREDDIT" "$PAGE"; echo $?

    REASON="$(jq -r '.data.reason' "$SOURCE_PAGE_JSON")"
    AUTHOR="$(jq -r '.data.revision_by.data.name' "$SOURCE_PAGE_JSON")"

    # Rewrite wiki links before saving Markdown file
    jq -r '.data.content_md' "$SOURCE_PAGE_JSON" | sed 's,https://www.reddit.com/r/JapanFinance/wiki/index/,,g' > "$TARGET_PAGE_MD"

    # If the wiki page was changed, commit it.
    if [ -n "$(git status --porcelain)" ]; then
        git add "$TARGET_PAGE_MD"
        git commit -m "Sync from Reddit" -m "$REASON" -m "Change made by u/$AUTHOR"
        git --no-pager diff
    fi

done < <(curl -SsfL --user-agent "$USER_AGENT" "https://www.reddit.com/r/$SUBREDDIT/wiki/pages.json" | jq -r '.data | .[]')

rm -rf "./$DOWNLOAD_DIR"
