export const TRANSLATIONS = {
  en: {
    // Header & Mode
    countDown: 'Count Down',
    countUp: 'Count Up',
    switchModeTooltip: 'Switch between Count Down and Count Up',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    settings: 'Settings',
    switchLangTooltip: '日本語に切り替え (Switch to Japanese)',
    activePresetTitle: 'Click to view and switch presets',
    customPreset: 'Custom Presentation',

    // Controls
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    mute: 'Mute',
    unmute: 'Unmute',
    testSound: 'Preview Bell Sound',
    clickToPause: 'Click anywhere to Pause',
    clickToStart: 'Click anywhere to Start',

    // Timer States
    ready: 'Ready',
    inProgress: 'In Progress',
    overtime: 'Overtime',
    bell1Triggered: 'Bell 1 (Warning)',
    bell2Triggered: 'Bell 2 (Talk Finished)',
    bell3Triggered: 'Bell 3 (Session Finished)',

    // Settings Modal
    settingsTitle: 'Timer Settings',
    settingsSubtitle: 'Presentation bell markers, presets & themes',
    tabBells: 'Bells & Time',
    tabPresets: 'Presets',
    tabAppearance: 'Theme & Audio',
    done: 'Done',

    // Tab 1: Bells & Time
    totalDuration: 'Total Presentation Duration',
    minutes: 'Minutes',
    seconds: 'Seconds',
    bellChimesHeading: 'Presentation Bell Chimes (Max 3)',
    sourcedFromOtoLogic: 'Sourced from OtoLogic',
    bell1Name: 'Bell 1 (Warning)',
    bell2Name: 'Bell 2 (Talk End)',
    bell3Name: 'Bell 3 (Session End)',
    chime: 'Chime',
    chimes: 'Chimes',
    playsAt: 'Plays at',
    test: 'Test',
    triggerMinute: 'Trigger Minute',
    triggerSecond: 'Trigger Second',

    // Tab 2: Presets
    standardPresets: 'Standard Presentation Presets',
    customPresets: 'Custom Presets',
    saveCurrentSettings: 'Save Current Settings',
    presetName: 'Preset Name',
    presetNamePlaceholder: 'e.g. My Final Thesis',
    save: 'Save',
    cancel: 'Cancel',
    activeBadge: 'Active',
    noCustomPresets: 'No custom presets saved yet. Customize your bells and click "Save Current Settings".',
    bellsCount: 'bells',

    // Preset items
    presetAcademic15Name: 'Conference Talk (15m)',
    presetAcademic15Desc: '10m 1st warning, 12m talk end, 15m Q&A finish',
    presetAcademic10Name: 'Short Talk (10m)',
    presetAcademic10Desc: '7m 1st warning, 8m talk end, 10m Q&A finish',
    presetDefense20Name: 'Thesis Defense (20m)',
    presetDefense20Desc: '15m 1st warning, 18m talk end, 20m total time',
    presetLt5Name: 'Lightning Talk (5m)',
    presetLt5Desc: '3m warning, 4m warning, 5m final stop',
    presetPitch3Name: 'Pitch (3m)',
    presetPitch3Desc: '2m warning, 2m30s wrap-up, 3m hard stop',
    presetPomodoro25Name: 'Pomodoro Focus (25m)',
    presetPomodoro25Desc: '20m check-in, 24m wind-down, 25m break',

    // Tab 3: Appearance & Sound
    colorSchemesHeading: 'Color Schemes (5 Curated)',
    darkAndLightModes: 'Dark & Light Modes',
    audioFeedbackHeading: 'Audio & Visual Feedback',
    chimeVolume: 'Chime Volume',
    screenFlash: 'Screen Flash on Bell',
    screenFlashDesc: 'Subtly flash the screen when a bell rings',
    soundAttribution: 'Sound effects provided by',
    website: 'Website',
  },

  ja: {
    // Header & Mode
    countDown: 'カウントダウン',
    countUp: 'カウントアップ',
    switchModeTooltip: 'カウントダウンとカウントアップを切り替え',
    fullscreen: '全画面表示',
    exitFullscreen: '全画面解除',
    settings: '設定',
    switchLangTooltip: 'Switch to English (英語に切り替え)',
    activePresetTitle: 'クリックしてプリセット一覧を表示・切替',
    customPreset: 'カスタム設定',

    // Controls
    start: 'スタート',
    pause: '一時停止',
    reset: 'リセット',
    mute: '消音',
    unmute: '音声を有効化',
    testSound: 'ベル音を試聴',
    clickToPause: '画面クリックで一時停止',
    clickToStart: '画面クリックでスタート',

    // Timer States
    ready: '準備完了',
    inProgress: '発表中',
    overtime: '超過時間',
    bell1Triggered: '1鈴 (予鈴)',
    bell2Triggered: '2鈴 (発表終了)',
    bell3Triggered: '3鈴 (質疑・セッション終了)',

    // Settings Modal
    settingsTitle: 'タイマー設定',
    settingsSubtitle: '発表ベル・プリセット・カラーテーマ',
    tabBells: 'ベル & 時間',
    tabPresets: 'プリセット',
    tabAppearance: 'テーマ & 音',
    done: '完了',

    // Tab 1: Bells & Time
    totalDuration: '全体の発表時間',
    minutes: '分',
    seconds: '秒',
    bellChimesHeading: 'ベル鳴動設定 (最大3回)',
    sourcedFromOtoLogic: 'OtoLogic音源',
    bell1Name: '1鈴 (予鈴)',
    bell2Name: '2鈴 (発表終了)',
    bell3Name: '3鈴 (質疑終了)',
    chime: '回鳴動',
    chimes: '回鳴動',
    playsAt: '鳴動タイミング:',
    test: '試聴',
    triggerMinute: '鳴動時間 (分)',
    triggerSecond: '鳴動時間 (秒)',

    // Tab 2: Presets
    standardPresets: '標準プリセット',
    customPresets: 'カスタムプリセット',
    saveCurrentSettings: '現在の設定を保存',
    presetName: 'プリセット名',
    presetNamePlaceholder: '例: 卒論最終発表',
    save: '保存',
    cancel: 'キャンセル',
    activeBadge: '適用中',
    noCustomPresets: '保存されたカスタムプリセットはありません。設定を変更して「現在の設定を保存」をクリックしてください。',
    bellsCount: '個のベル',

    // Preset items
    presetAcademic15Name: '学会・研究発表 (15分)',
    presetAcademic15Desc: '発表10分で予鈴、12分で発表終了、15分で質疑終了',
    presetAcademic10Name: 'ショート発表 (10分)',
    presetAcademic10Desc: '発表7分で予鈴、8分で発表終了、10分で終了',
    presetDefense20Name: '卒論・修論発表 (20分)',
    presetDefense20Desc: '15分で予鈴、18分で発表終了、20分で全体終了',
    presetLt5Name: 'ライトニングトーク (5分)',
    presetLt5Desc: '3分で予鈴、4分で終了前警告、5分で強制終了',
    presetPitch3Name: 'ピッチ発表 (3分)',
    presetPitch3Desc: '2分で予鈴、2分30秒でまとめ、3分で終了',
    presetPomodoro25Name: 'ポモドーロ集中 (25分)',
    presetPomodoro25Desc: '20分経過、24分まとめ、25分休憩',

    // Tab 3: Appearance & Sound
    colorSchemesHeading: 'カラーテーマ (厳選5種)',
    darkAndLightModes: 'ダーク・ライトモード',
    audioFeedbackHeading: '音声 & 視覚フィードバック',
    chimeVolume: 'ベル音量',
    screenFlash: 'ベル鳴動時に画面点滅',
    screenFlashDesc: 'ベルが鳴る瞬間に画面を軽く点滅させて視覚的に通知',
    soundAttribution: '効果音提供：',
    website: '公式サイト',
  }
};

