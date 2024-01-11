import praw
import re
import os

DOCS_DIR="docs"
NONDOCS_DIR="archive"
SUBREDDIT="JapanFinance"

CLIENT_ID       = os.getenv( "REDDIT_CLIENT_ID" )
CLIENT_SECRET   = os.getenv( "REDDIT_CLIENT_SECRET" )
USER_AGENT      = os.getenv( "REDDIT_USER_AGENT" )
USER_NAME       = os.getenv( "REDDIT_USER_NAME")
PASSWORD        = os.getenv( "REDDIT_PASSWORD")

reddit = praw.Reddit( client_id = CLIENT_ID,
                      client_secret = CLIENT_SECRET,
                      user_agent = USER_AGENT,
                      username = USER_NAME,
                      password = PASSWORD )

subreddit = reddit.subreddit( SUBREDDIT )

for wikipage in subreddit.wiki:
    content = wikipage.content_md + "\n"
    name = wikipage.name
    author = 'unknown' if wikipage.revision_by is None else wikipage.revision_by.name
    reason = wikipage.reason

    # strip index/ from beginning of page path
    target_page_md = "./{}/{}.md".format(DOCS_DIR, name.replace('index/','', 1))

    # do not publish config markdown, but archive it in this same repo
    if re.match( r'^config', name ):
        target_page_md = "./{}/{}.md".format(NONDOCS_DIR, name)

    print( "Writing to {}".format(target_page_md) )

    # strip file name from end of path when making directories
    os.makedirs(os.path.dirname( target_page_md ), exist_ok=True )

    # Rewrite wiki links before saving Markdown file
    # FIXME: remove hardcoding of subreddit name here
    content = re.sub( r'https://www.reddit.com/r/JapanFinance/wiki/index', '', content, 0, re.IGNORECASE)

    # Clean up entities
    content = re.sub( r'&nbsp;',' ', content, 0, re.IGNORECASE )
    content = re.sub( r'&amp;', '&', content, 0, re.IGNORECASE )
    content = re.sub( r'&lt;', '<', content, 0, re.IGNORECASE )
    content = re.sub( r'&gt;', '>', content, 0, re.IGNORECASE )

    # Write content to file
    f = open( target_page_md, "w", encoding='utf-8')
    f.write(content)

    # If the wiki page was changed, commit it.
    process = os.popen('git status --porcelain')
    result = process.read()
    process.close

    if len(result) != 0:
        os.system( 'git add "{}"'.format(target_page_md) )
        os.system( 'git commit -m "Sync from Reddit" -m "{}" -m "Change made by u/{}"'.format(reason, author) )
        os.system( 'git --no-pager diff' )