// ==UserScript==
// @name         Google Search & Maps: The Permanent Fix (Clean Tabs)
// @namespace    https://github.com/yourusername/google-search-is-broken-we-must-fix-it
// @version      5.3.0
// @description  Forces udm=14 on Web, bans wuu.wikipedia, and cleans Maps/Media queries.
// @author       Your Name
// @license      WTFPL
// @match        *://*.google.com/search*
// @match        *://*.google.com/maps*
// @match        *://*.google.com.hk/search*
// @match        *://*.google.com.hk/maps*
// @match        *://www.google.*/search*
// @match        *://www.google.*/maps*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const BAN = "-site:wuu.wikipedia.org";

    const applyFilters = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;

        let query = params.get('q') || "";
        const tbm = params.get('tbm') || "";
        const udm = params.get('udm') || "";
        const isMapsPath = url.pathname.includes('/maps');

        // Maps, Images, Videos, Shopping, etc.
        const isSpecializedTab = isMapsPath || tbm.length > 0 || (udm.length > 0 && udm !== '14');

        let needsRedirect = false;

        if (isSpecializedTab) {
            // --- CLEANUP LOGIC (Maps & Media) ---

            // 1. Remove the ban tag if it carried over
            if (query.includes(BAN)) {
                query = query.replace(BAN, "").replace(/\s+/g, ' ').trim();
                params.set('q', query);
                needsRedirect = true;
            }

            // 2. Remove udm=14 as it breaks Maps and non-Web tabs
            if (udm === '14') {
                params.delete('udm');
                needsRedirect = true;
            }
        } else {
            // --- WEB TAB LOGIC (Classic View) ---

            // 1. Add the ban if it's missing
            if (query && !query.includes(BAN)) {
                params.set('q', query + " " + BAN);
                needsRedirect = true;
            }

            // 2. Force the Web (udm=14) filter
            if (udm !== '14') {
                params.set('udm', '14');
                needsRedirect = true;
            }
        }

        if (needsRedirect) {
            window.location.replace(url.toString());
        }
    };

    applyFilters();

    let lastHref = location.href;
    const observer = new MutationObserver(() => {
        if (location.href !== lastHref) {
            lastHref = location.href;
            applyFilters();
        }
    });

    const target = document.querySelector('title') || document.documentElement;
    observer.observe(target, { subtree: true, characterData: true, childList: true });
})();
