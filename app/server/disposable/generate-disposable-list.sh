#!/bin/sh

# Define URLs (POSIX-compatible)
URLS="
https://raw.githubusercontent.com/7c/fakefilter/refs/heads/main/txt/data.txt
https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/refs/heads/main/disposable_email_blocklist.conf
https://raw.githubusercontent.com/wesbos/burner-email-providers/refs/heads/master/emails.txt
"

# Temporary file to store combined data
TEMP_FILE=$(mktemp)

# Download and process each URL
echo "$URLS" | while read URL; do
    [ -n "$URL" ] && curl -s "$URL" | grep -v '^#' >> "$TEMP_FILE"
done

# Remove duplicates, empty lines, sort, and save to a JS file
OUTPUT_JS="./index.js"

echo "// Auto-generated list of disposable email domains" > "$OUTPUT_JS"
echo "export const disposableDomains = new Set([" >> "$OUTPUT_JS"

# Filter out empty lines before writing to JS
sort -u "$TEMP_FILE" | sed '/^$/d' | sed -E 's/(.*)/    "\1",/' >> "$OUTPUT_JS"

echo "]);" >> "$OUTPUT_JS"

# Clean up
rm "$TEMP_FILE"

echo "✅ disposable.js has been created with $(grep -c '",' "$OUTPUT_JS") domains."
