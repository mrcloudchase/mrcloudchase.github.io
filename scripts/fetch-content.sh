#!/bin/bash
CONTENT_DIR="content/blog"
REPO_URL="https://github.com/mrcloudchase/mrcloudchase-blog.git"

echo "Fetching blog content..."
rm -rf "$CONTENT_DIR"
mkdir -p content
git clone "$REPO_URL" "$CONTENT_DIR"
