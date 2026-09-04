# Fonts (optional)

`server.js` renders the PDF proposal with the built-in Helvetica font, which
only supports Latin characters. If a client's name or notes are typed in
Georgian, add a Unicode font here and it will be picked up automatically:

1. Download **Noto Sans Georgian** (Regular + Bold) from Google Fonts:
   https://fonts.google.com/noto/specimen/Noto+Sans+Georgian
2. Place the files in this folder as:
   - `fonts/NotoSansGeorgian-Regular.ttf`
   - `fonts/NotoSansGeorgian-Bold.ttf`

No code changes needed — `server.js` checks for
`fonts/NotoSansGeorgian-Regular.ttf` on each PDF request and switches to it
automatically. Without the font file, Georgian text will be dropped/blank in
the generated PDF; all English structural text (labels, totals, headings)
renders correctly either way since those are hard-coded in English.
