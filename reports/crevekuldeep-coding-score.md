# Coding Score Audit: https://crevekuldeep.com/

## Result
**Coding score: 90 / 100 (Good)**

## Method used
Because direct Lighthouse/PageSpeed API access is blocked in this environment, the score was calculated from a browser-based technical audit using Playwright and the following weighted rubric:

- Reliability & runtime errors (30 points)
  - No console errors: +15
  - No uncaught page errors: +10
  - No failed network requests: +5
- Security & protocol hygiene (10 points)
  - Served over HTTPS: +10
- Performance baseline (30 points)
  - DOMContentLoaded = 4.69s: +12/15
  - Load event end = 5.92s: +8/10
  - Resource count (25 total): +10/10
- Semantic/accessibility code hygiene (20 points)
  - Images missing alt text (0/4): +10/10
  - Empty/label-less links (2 found): +5/10
- Response quality (10 points)
  - HTTP 200 and stable initial payload sizes: +10/10

## Raw measurements
- Title: `Digital Marketing Coach in India | 1:1 Coaching & Mentorship`
- URL: `https://crevekuldeep.com/`
- HTTP status: `200`
- HTTPS: `true`
- Console errors: `0`
- Page errors: `0`
- Failed requests: `0`
- DOMContentLoaded: `4689.2 ms`
- Load event end: `5918.2 ms`
- Main document transfer size: `41,311 bytes`
- Encoded body size: `41,011 bytes`
- Decoded body size: `129,201 bytes`
- Total resources: `25`
  - `script`: 14
  - `link`: 8
  - `img`: 3
- Accessibility quick checks:
  - Images: 4
  - Missing alt text: 0
  - Links: 27
  - Empty/label-less links: 2

## Top improvements to raise the score
1. Fix the 2 empty/label-less links (add visible text or `aria-label`).
2. Reduce blocking script cost (14 scripts) with defer/splitting where possible.
3. Improve initial render path to reduce DCL/load times on mobile-like conditions.
