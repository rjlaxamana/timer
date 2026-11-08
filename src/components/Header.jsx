import React from 'react';
import { Settings, Maximize, Minimize, Bell, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header({
  activePreset,
  totalTimeSeconds,
  activeBellsCount,
  onOpenSettings,
  isFullscreen,
  onToggleFullscreen,
  countDirection,
  onToggleDirection
}) {
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-5 pt-4 sm:pt-6 pb-3 flex items-center justify-between pointer-events-none">
      {/* Left: Active Preset Pill Badge */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onOpenSettings}
          className={`group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95`}
          title="Click to view and switch presets"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accentColor }} />
          <span className="font-semibold truncate max-w-[140px] sm:max-w-[220px]">
            {activePreset ? activePreset.name : 'Custom Presentation'}
          </span>
          <div className="flex items-center gap-1 text-[11px] opacity-70 border-l border-current/20 pl-2">
            <Bell size={11} />
            <span>{activeBellsCount}</span>
          </div>
        </button>

        {/* Count Direction Toggle */}
        <button
          onClick={onToggleDirection}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95`}
          title={`Switch between Count Down and Count Up (Current: ${countDirection === 'down' ? 'Countdown' : 'Count-up'})`}
        >
          <span>{countDirection === 'down' ? '⏱️ Down' : '⏳ Up'}</span>
        </button>
      </div>

      {/* Right: Quick Actions & Settings Trigger */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className={`p-2.5 rounded-full transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95`}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ios-glass border ${theme.badgeClass} hover:opacity-90 active:scale-95 shadow-sm`}
          aria-label="Open Settings"
          title="Settings (Presets, Bells, Themes)"
        >
          <Settings size={17} className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-medium hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
}
