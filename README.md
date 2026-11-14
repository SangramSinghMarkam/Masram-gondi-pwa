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
