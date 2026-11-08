import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ControlBar({
  isRunning,
  onStart,
  onPause,
  onReset,
  isMuted,
  onToggleMute,
  onQuickTestSound,
  t
}) {
  const { theme } = useTheme();

  return (
    <footer className="fixed bottom-6 sm:bottom-10 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
      <div className={`pointer-events-auto flex items-center gap-2 sm:gap-3 p-2 rounded-full ios-glass border ${theme.dockClass} shadow-2xl transition-all duration-300`}>
        
        {/* Reset Button */}
        <button
          onClick={onReset}
          className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 ${theme.pillClass} active:scale-90`}
          title={`${t.reset} (R)`}
          aria-label={t.reset}
        >
          <RotateCcw size={20} className="opacity-90" />
        </button>

        {/* Primary Start / Pause Pill Button (Theme-responsive Start) */}
        {isRunning ? (
          <button
            onClick={onPause}
            className="flex items-center justify-center gap-2 px-7 sm:px-9 h-12 sm:h-14 rounded-full bg-[#FF9F0A] hover:bg-[#E08A00] text-black font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg active:scale-95"
            title={`${t.pause} (Space)`}
            aria-label={t.pause}
          >
            <Pause size={22} fill="currentColor" />
            <span>{t.pause}</span>
          </button>
        ) : (
          <button
            onClick={onStart}
            className={`flex items-center justify-center gap-2 px-7 sm:px-9 h-12 sm:h-14 rounded-full font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg active:scale-95 ${theme.startButtonClass || theme.accentClass}`}
            style={{
              boxShadow: `0 0 28px ${theme.accentColor}50`,
            }}
            title={`${t.start} (Space)`}
            aria-label={t.start}
          >
            <Play size={22} fill="currentColor" />
            <span>{t.start}</span>
          </button>
        )}

        {/* Quick Chime Test */}
        <button
          onClick={onQuickTestSound}
          className={`hidden sm:flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 ${theme.pillClass} active:scale-90`}
          title={t.testSound}
          aria-label={t.testSound}
        >
          <Bell size={20} className="opacity-90" />
        </button>

        {/* Mute Toggle */}
        <button
          onClick={onToggleMute}
          className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 ${theme.pillClass} ${isMuted ? 'text-red-400' : ''} active:scale-90`}
          title={isMuted ? t.unmute : t.mute}
          aria-label={isMuted ? t.unmute : t.mute}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

      </div>
    </footer>
  );
}
