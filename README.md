# DATA_INTERPRETATION

## Run
npm install
npm run dev

## Edit Slides
All content lives in `src/data/surveyDeck.js`.
Add slides by appending to `deck.slides[]`.

## Slide Types
- title
- pie: { data:[{name,value}] }
- bars: { categories:[], values:[], mean?: number }
- meanBars: { data:[{name, mean}] }
- keyFindings: { bullets:[] }

## Deploy to Vercel
1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output directory: auto-detected by Vercel.
6. No environment variables are required for this project.
