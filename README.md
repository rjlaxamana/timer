# ⏱️ iOS Presentation Timer

An elegant, iOS-inspired presentation and academic conference timer website built with React, Vite, and Tailwind CSS. Deployable to GitHub Pages.

Inspired by [niny.dev presentation timer](https://niny.dev/lab/tools/presentation-timer), crafted with authentic **OtoLogic** conference bell chimes, iOS Human Interface aesthetics, and high-contrast customizable color themes.

---

## ✨ Features

- **Big, High-Visibility Display**: Scaled dynamically for conference halls, seminars, lecture rooms, and remote screen sharing.
- **Up to 3-Stage Bell Chimes**:
  - **Bell 1 (1st Warning)**: 1 chime (e.g. 10m into a 15m talk)
  - **Bell 2 (Presentation End)**: 2 chimes (e.g. 12m)
  - **Bell 3 (Session Finish)**: 3 chimes (e.g. 15m)
  - Customizable trigger minutes & seconds for each bell, with individual On/Off toggles.
- **Authentic OtoLogic Sound Effects**:
  - Sourced directly from [OtoLogic](https://otologic.jp/) (`otologic-ding04.mp3`, `otologic-ding03.mp3`, `otologic-ding02.mp3`, and `reception-bell.mp3`).
  - Preloaded and bundled locally in `public/audio/` for instant zero-latency playback and 100% offline support.
  - Web Audio API fallback synthesizer so sound always plays even if mobile browser policies restrict background audio.
- **5 Curated Color Themes**:
  - **iOS Dark** (Default) – Deep OLED black with frosted glass and iOS system blue
  - **iOS Light** – Apple system gray/white with crisp dark typography
  - **Midnight Cyber** – Obsidian navy with vivid neon cyan glow
  - **Sunset Amber** – Warm espresso charcoal with radiant amber accents
  - **Emerald Mint** – Midnight evergreen with electric mint green accents
- **Presets & Custom Configurations**:
  - Built-in presets: Academic Conference (15m), Short Talk (10m), Thesis Defense (20m), Lightning Talk (5m), Pitch (3m), Pomodoro (25m).
  - Save your custom timer configurations directly to `localStorage`.
- **iOS Human Interface Design**:
  - Frosted glass modal sheet / pop-up in the upper-right corner.
  - Tactile iOS segmented controls, rounded toggle switches, and floating control dock.
  - Visual screen flash on bell triggers (toggleable).
  - Overtime indicator with pulse animation for presentations exceeding total time.
- **Keyboard Shortcuts**:
  - `Space`: Start / Pause
  - `R`: Reset
  - `F`: Fullscreen toggle
  - `Esc`: Close settings

---

## 🚀 Getting Started

### Local Development

1. Clone or navigate into the repository:
   ```bash
   cd timer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 🌐 GitHub Pages Deployment

This project includes `.github/workflows/deploy.yml` and is configured with `base: './'` in `vite.config.js` for instant deployment.

To enable GitHub Pages:
1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/<your-username>/timer.git
   git push -u origin main
   ```
2. In your GitHub repository settings:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. On every push to `main`, the site will automatically build and publish to `https://<your-username>.github.io/timer/`.

---

## 🔔 Sound Credits

- Presentation bell chimes provided by [OtoLogic](https://otologic.jp/) under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.
