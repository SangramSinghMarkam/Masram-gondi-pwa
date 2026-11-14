# Masram Gondi Learning (PWA)

## Host on GitHub Pages
1. Create a repository and upload every file in this folder to the repository root (keep `.nojekyll`).
2. Repository **Settings > Pages > Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`.
3. Open `https://<your-username>.github.io/<repository-name>/` (it must be https).
4. Open it once while online, wait a few seconds, then open **Support this app**: it should say *Offline mode: ready*.
5. Now it works without internet. Switch on airplane mode and reload to check.

## Gondi font for offline use
The app saves the Google "Noto Sans Masaram Gondi" font on the first online visit. To make it fully independent of Google,
download the font and save it next to `index.html` as `MasaramGondi.ttf`. It is then saved for offline use automatically.

## Publishing an update
Upload the changed files, then change the version name at the top of `sw.js` (for example `masram-v7` to `masram-v8`).
Open pages refresh themselves once the new version is installed.

## Changing how letters sound
Open **Support page > Developer option**, enter the developer code, then tap **Sound Mapping (pronunciation)**. Type the Hindi sound you want for any letter, vowel sign or digit and tap the play button to test it.
Changes are saved on the device and used everywhere the app speaks. Use **Save sounds file** to share a regional pronunciation set and **Load sounds file** to apply one.

## Built-in dictionary and Word Quiz
- `gondi_dictionary_converted.json` is the built-in dictionary (3,351 words). On the first visit, if the dictionary is empty, the app loads it automatically. It is saved for offline use. In the Gondi Dictionary screen, **Built-in words** loads it again (replace, or add missing words).
- File format (same as the Word Link app): `id`, `primaryWord` (Masram Gondi), `associatedWords`, `image`, `emoji`.
- `associatedWords` order: Hindi, English, Marathi, Telugu meanings (each present only if known; several senses are joined with ` / `), then related Gondi words (variants / compare / see). The quiz tells meanings apart by script: first Devanagari = Hindi, second = Marathi, Latin = English, Telugu script = Telugu. Gondi-script items are related words.
- **Word Quiz** (menu item 10, or the quiz button in the dictionary): Gondi word -> meaning, or meaning -> Gondi word, in Hindi, English, Marathi or Telugu, 10/20/30 questions, retry missed words, listen to the word in Hindi. It uses whatever words are in your dictionary, including ones you add.
- `MasaramGondi.ttf` (Noto Sans Masaram Gondi, SIL Open Font License) is included, so the Gondi script also works offline without Google Fonts.
- Version in `sw.js` is `masram-v10`.
