#!/bin/bash
# Remove lovable references from files
find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.html" \) -exec sed -i '' 's/lovable//gi' {}