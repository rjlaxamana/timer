import React from 'react';
import { Settings, Maximize, Minimize, Bell, Languages } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header({
  activePreset,
  totalTimeSeconds,
  activeBellsCount,
  onOpenSettings,
  isFullscreen,
  onToggleFullscreen,
  countDirection,
  onToggleDirection,
  lang,
  onToggleLang,
  t
}) {
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-5 pt-4 sm:pt-6 pb-3 flex items-center justify-between pointer-events-none">
      {/* Left: Active Preset Pill Badge & Mode Toggle */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        <button
          onClick={onOpenSettings}
          className={`group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95`}
          title={t.activePresetTitle}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accentColor }} />
          <span className="font-semibold truncate max-w-[140px] sm:max-w-[220px]">
            {activePreset ? (lang === 'ja' && activePreset.nameJa ? activePreset.nameJa : activePreset.name) : t.customPreset}
          </span>
          <div className="flex items-center gap-1 text-[11px] opacity-70 border-l border-current/20 pl-2">
            <Bell size={11} />
            <span>{activeBellsCount}</span>
          </div>
        </button>

        {/* Count Direction Toggle: Explicitly "Count Down" / "Count Up" */}
        <button
          onClick={onToggleDirection}
          className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95`}
          title={t.switchModeTooltip}
        >
          <span>{countDirection === 'down' ? `⏳ ${t.countDown}` : `⏱️ ${t.countUp}`}</span>
        </button>
      </div>

      {/* Right: Quick Actions & Settings Trigger */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* 1. Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className={`p-2.5 rounded-full transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95`}
          aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
          title={isFullscreen ? `${t.exitFullscreen} (F)` : `${t.fullscreen} (F)`}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        {/* 2. Japanese / English Language Toggle (In between Fullscreen & Settings) */}
        <button
          onClick={onToggleLang}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95`}
          aria-label={t.switchLangTooltip}
          title={t.switchLangTooltip}
        >
          <Languages size={17} />
          <span className="text-[11px] font-bold tracking-wider uppercase">
            {lang === 'en' ? 'JA' : 'EN'}
          </span>
        </button>

        {/* 3. Settings Button */}
        <button
          onClick={onOpenSettings}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95 shadow-sm`}
          aria-label={t.settings}
          title={t.settings}
        >
          <Settings size={17} className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-medium hidden sm:inline">{t.settings}</span>
        </button>
      </div>
    </header>
  );
}
