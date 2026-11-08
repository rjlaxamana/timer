export const DEFAULT_PRESETS = [
  {
    id: 'academic-15',
    name: 'Conference Talk (15m)',
    description: '10m 1st warning, 12m talk end, 15m Q&A finish',
    totalMinutes: 15,
    totalSeconds: 0,
    bells: [
      { id: 1, name: 'Bell 1 (Warning)', rings: 1, enabled: true, minutes: 10, seconds: 0, sound: 'otologic-ding04' },
      { id: 2, name: 'Bell 2 (Talk End)', rings: 2, enabled: true, minutes: 12, seconds: 0, sound: 'otologic-ding03' },
      { id: 3, name: 'Bell 3 (Session End)', rings: 3, enabled: true, minutes: 15, seconds: 0, sound: 'otologic-ding02' },
    ]
  },
  {
    id: 'academic-10',
    name: 'Short Talk (10m)',
    description: '7m 1st warning, 8m talk end, 10m Q&A finish',
    totalMinutes: 10,
    totalSeconds: 0,
    bells: [
      { id: 1, name: 'Bell 1 (Warning)', rings: 1, enabled: true, minutes: 7, seconds: 0, sound: 'otologic-ding04' },
      { id: 2, name: 'Bell 2 (Talk End)', rings: 2, enabled: true, minutes: 8, seconds: 0, sound: 'otologic-ding03' },
      { id: 3, name: 'Bell 3 (Session End)', rings: 3, enabled: true, minutes: 10, seconds: 0, sound: 'otologic-ding02' },
    ]
  },
  {
    id: 'defense-20',
    name: 'Thesis Defense (20m)',
    description: '15m 1st warning, 18m talk end, 20m total time',
    totalMinutes: 20,
    totalSeconds: 0,
    bells: [
      { id: 1, name: 'Bell 1 (Warning)', rings: 1, enabled: true, minutes: 15, seconds: 0, sound: 'otologic-ding04' },
      { id: 2, name: 'Bell 2 (Talk End)', rings: 2, enabled: true, minutes: 18, seconds: 0, sound: 'otologic-ding03' },
      { id: 3, name: 'Bell 3 (Session End)', rings: 3, enabled: true, minutes: 20, seconds: 0, sound: 'otologic-ding02' },
    ]
  },
  {
    id: 'lt-5',
    name: 'Lightning Talk (5m)',
    description: '3m warning, 4m warning, 5m final stop',
    totalMinutes: 5,
    totalSeconds: 0,
    bells: [
      { id: 1, name: 'Bell 1 (Warning)', rings: 1, enabled: true, minutes: 3, seconds: 0, sound: 'otologic-ding04' },
      { id: 2, name: 'Bell 2 (Talk End)', rings: 2, enabled: true, minutes: 4, seconds: 0, sound: 'otologic-ding03' },
      { id: 3, name: 'Bell 3 (Session End)', rings: 3, enabled: true, minutes: 5, seconds: 0, sound: 'otologic-ding02' },
    ]
  },
  {
    id: 'pitch-3',
    name: 'Pitch (3m)',
    description: '2m warning, 2m30s wrap-up, 3m hard stop',
    totalMinutes: 3,
    totalSeconds: 0,
    bells: [
      { id: 1, name: 'Bell 1 (Warning)', rings: 1, enabled: true, minutes: 2, seconds: 0, sound: 'otologic-ding04' },
      { id: 2, name: 'Bell 2 (Talk End)', rings: 2, enabled: true, minutes: 2, seconds: 30, sound: 'otologic-ding03' },
      { id: 3, name: 'Bell 3 (Session End)', rings: 3, enabled: true, minutes: 3, seconds: 0, sound: 'otologic-ding02' },
    ]
  },
  {
    id: 'pomodoro-25',
    name: 'Pomodoro Focus (25m)',
    description: '20m check-in, 24m wind-down, 25m break',
    totalMinutes: 25,
    totalSeconds: 0,
    bells: [
      { id: 1, name: 'Bell 1 (Check-in)', rings: 1, enabled: true, minutes: 20, seconds: 0, sound: 'otologic-ding04' },
      { id: 2, name: 'Bell 2 (Wind-down)', rings: 2, enabled: true, minutes: 24, seconds: 0, sound: 'otologic-ding03' },
      { id: 3, name: 'Bell 3 (Break Time)', rings: 3, enabled: true, minutes: 25, seconds: 0, sound: 'otologic-ding02' },
    ]
  }
];

export const AVAILABLE_SOUNDS = [
  { id: 'otologic-ding04', name: 'Bell 1 (1 Ring)', file: 'otologic-ding04.mp3', credit: 'OtoLogic' },
  { id: 'otologic-ding03', name: 'Bell 2 (2 Rings)', file: 'otologic-ding03.mp3', credit: 'OtoLogic' },
  { id: 'otologic-ding02', name: 'Bell 3 (3 Rings)', file: 'otologic-ding02.mp3', credit: 'OtoLogic' },
  { id: 'reception-bell', name: 'Reception Bell', file: 'reception-bell.mp3', credit: 'OtoLogic' },
];

export const STORAGE_KEYS = {
  PRESETS: 'presentation_timer_custom_presets_v1',
  ACTIVE_PRESET: 'presentation_timer_active_preset_v1',
  CURRENT_CONFIG: 'presentation_timer_current_config_v1',
  THEME: 'presentation_timer_theme_v1',
  SETTINGS: 'presentation_timer_settings_v1',
};
