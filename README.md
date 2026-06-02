# Google Search & Maps: The Permanent Fix

A lightweight UserScript to restore a cleaner, classic Google Search experience by forcing the "Web" view (`udm=14`), removing AI Overviews, and cleaning up specialized tab queries.

## Features
- **Force Classic Web View:** Automatically appends `udm=14` to Google searches to bypass AI Overviews and other clutter.
- **Smart Redirects:** Intelligently removes search filters when switching to specialized tabs (Maps, Images, Videos) to prevent UI breakage.
- **Site Ban:** Automatically excludes specific sites (like `wuu.wikipedia.org`) from web results.

## Installation Instructions

### 1. Install a UserScript Manager
To run this script, you first need a browser extension that manages UserScripts. **Tampermonkey** is the recommended choice for Chrome.

**For Chrome:**
1. Go to the [Tampermonkey page on the Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).
2. Click **Add to Chrome**.
3. Confirm by clicking **Add extension**.

### 2. Install the Script
Once Tampermonkey is installed:
1. Click on the Tampermonkey icon in your browser toolbar and select **Create a new script**.
2. Open [grease_monkey.js](./grease_monkey.js) from this repository and copy the entire content.
3. Delete any default code in the Tampermonkey editor and paste the copied script.
4. Go to **File > Save** (or press `Ctrl+S` / `Cmd+S`).

Alternatively, if this repository is hosted on GitHub, you can often click the **Raw** button on the `grease_monkey.js` file, and Tampermonkey will automatically prompt you to install it.

## How it Works
The script runs at `document-start` to intercept URLs before the page fully loads. It checks if you are on a "Web" search and ensures `udm=14` is present. If you navigate to Maps or other media tabs, it cleans up the URL to ensure those services function correctly.

## License
WTFPL
