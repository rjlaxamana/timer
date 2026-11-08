import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Minimize } from 'lucide-react';
import Header from './components/Header';
import TimerDisplay from './components/TimerDisplay';
import ControlBar from './components/ControlBar';
import SettingsModal from './components/SettingsModal';
import { useTheme } from './context/ThemeContext';
import { DEFAULT_PRESETS, STORAGE_KEYS } from './types/presets';
import { TRANSLATIONS } from './types/translations';
import { soundPlayer } from './audio/soundPlayer';

export default function App() {
  const { theme } = useTheme();

  // Language state ('en' | 'ja')
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LANG) || 'en';
    } catch {
      return 'en';
    }
  });

  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'ja' : 'en';
    setLang(nextLang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, nextLang);
    } catch {}
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Presets & Active Config
  const [customPresets, setCustomPresets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRESETS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activePreset, setActivePreset] = useState(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PRESET);
      if (savedId) {
        const found = DEFAULT_PRESETS.find(p => p.id === savedId);
        if (found) return found;
      }
    } catch {}
    return DEFAULT_PRESETS[0];
  });

  // Current Timer Settings
  const [totalMinutes, setTotalMinutes] = useState(activePreset.totalMinutes);
  const [totalSeconds, setTotalSeconds] = useState(activePreset.totalSeconds || 0);
  const [bells, setBells] = useState(activePreset.bells);

  // Timer Run State
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [countDirection, setCountDirection] = useState('down'); // 'down' | 'up'

  // Settings & Controls
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [visualFlash, setVisualFlash] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  // Refs for precise timekeeping & bells
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedOffsetRef = useRef(0);
  const triggeredBellsRef = useRef(new Set());

  // Setup sound player
  useEffect(() => {
    soundPlayer.preloadSounds();
    soundPlayer.setVolume(volume);
    soundPlayer.setMuted(isMuted);
    soundPlayer.setVisualFlashCallback(() => {
      if (visualFlash) {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 700);
      }
    });
  }, [volume, isMuted, visualFlash]);

  // Persist custom presets
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRESETS, JSON.stringify(customPresets));
    } catch (e) {
      console.warn('Failed to save custom presets:', e);
    }
  }, [customPresets]);

  // Total duration in seconds
  const totalDurationSeconds = totalMinutes * 60 + totalSeconds;
  const remainingSeconds = totalDurationSeconds - elapsedSeconds;
  const isOvertime = remainingSeconds < 0;
  const overtimeSeconds = isOvertime ? Math.abs(remainingSeconds) : 0;

  // Value shown on the large digital screen
  const displaySeconds = countDirection === 'down'
    ? (isOvertime ? overtimeSeconds : remainingSeconds)
    : elapsedSeconds;

  // Sound triggering logic
  const checkBellTriggers = useCallback((curElapsed) => {
    bells.forEach((bell) => {
      if (!bell.enabled) return;
      const triggerSecs = bell.minutes * 60 + (bell.seconds || 0);

      // Trigger if we crossed or reached the trigger threshold
      if (curElapsed >= triggerSecs && !triggeredBellsRef.current.has(bell.id)) {
        triggeredBellsRef.current.add(bell.id);
        soundPlayer.play(bell.sound, { rings: bell.rings });
      }
    });
  }, [bells]);

  // Precise timer tick
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      timerRef.current = setInterval(() => {
        const now = performance.now();
        const deltaSecs = Math.floor((now - startTimeRef.current) / 1000);
        const currentElapsed = elapsedOffsetRef.current + deltaSecs;

        setElapsedSeconds(currentElapsed);
        checkBellTriggers(currentElapsed);
      }, 250);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, checkBellTriggers]);

  // Timer Actions
  const handleStart = () => {
    soundPlayer.unlockAudio();
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    elapsedOffsetRef.current = elapsedSeconds;
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    elapsedOffsetRef.current = 0;
    triggeredBellsRef.current.clear();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    soundPlayer.setMuted(!isMuted);
  };

  const handleQuickTestSound = () => {
    soundPlayer.unlockAudio();
    soundPlayer.play('otologic-ding04', { rings: 1 });
  };

  // Preset Selection
  const handleSelectPreset = (preset) => {
    handleReset();
    setActivePreset(preset);
    setTotalMinutes(preset.totalMinutes);
    setTotalSeconds(preset.totalSeconds || 0);
    setBells(preset.bells.map(b => ({ ...b })));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PRESET, preset.id);
  };

  // Custom Preset Saving
  const handleSaveCustomPreset = (name) => {
    const newPreset = {
      id: `custom-${Date.now()}`,
      name,
      description: `Custom ${totalMinutes}m presentation preset`,
      totalMinutes,
      totalSeconds,
      bells: bells.map(b => ({ ...b })),
    };
    setCustomPresets(prev => [...prev, newPreset]);
    setActivePreset(newPreset);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PRESET, newPreset.id);
  };

  const handleDeleteCustomPreset = (presetId) => {
    setCustomPresets(prev => prev.filter(p => p.id !== presetId));
    if (activePreset?.id === presetId) {
      handleSelectPreset(DEFAULT_PRESETS[0]);
    }
  };

  // Time and Bell Modification
  const handleChangeTotalTime = (mins, secs) => {
    setTotalMinutes(mins);
    setTotalSeconds(secs);
    if (!isRunning) {
      setElapsedSeconds(0);
      elapsedOffsetRef.current = 0;
      triggeredBellsRef.current.clear();
    }
  };

  const handleChangeBell = (bellId, updates) => {
    setBells(prev => prev.map(b => b.id === bellId ? { ...b, ...updates } : b));
  };

  const handleToggleBell = (bellId, enabled) => {
    setBells(prev => prev.map(b => b.id === bellId ? { ...b, enabled } : b));
  };

  // Fullscreen Toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
      setIsSettingsOpen(false); // Close settings when entering fullscreen
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard Shortcuts (Space: Start/Pause, R: Reset, F: Fullscreen, Esc: Settings)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing inside form inputs
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) handlePause();
        else handleStart();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleReset();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (e.code === 'Escape' && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, isSettingsOpen]);

  // Current Phase Status Text
  const getCurrentPhaseText = () => {
    if (isOvertime) return t.overtime;
    const triggeredCount = triggeredBellsRef.current.size;
    if (triggeredCount === 0) return isRunning ? t.inProgress : t.ready;
    if (triggeredCount === 1) return t.bell1Triggered;
    if (triggeredCount === 2) return t.bell2Triggered;
    return t.bell3Triggered;
  };

  return (
    <div className={`relative w-screen h-screen flex flex-col justify-between overflow-hidden transition-colors duration-500 font-sans ${theme.bgClass}`}>
      
      {/* Visual Flash Overlay */}
      {isFlashing && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-white animate-flash" />
      )}

      {/* Subtle Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-[160px] opacity-10 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: isOvertime ? '#FF453A' : theme.accentColor }}
      />

      {/* Header - Hidden in Fullscreen */}
      {!isFullscreen && (
        <Header
          activePreset={activePreset}
          totalTimeSeconds={totalDurationSeconds}
          activeBellsCount={bells.filter(b => b.enabled).length}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          countDirection={countDirection}
          onToggleDirection={() => setCountDirection(d => d === 'down' ? 'up' : 'down')}
          lang={lang}
          onToggleLang={handleToggleLang}
          t={t}
        />
      )}

      {/* Main Big Timer Display - In fullscreen, occupies the entire screen cleanly */}
      <main
        className={`flex-1 flex items-center justify-center transition-all duration-300 ${
          isFullscreen ? 'p-2 sm:p-6 cursor-pointer' : 'pt-16 pb-24 sm:pb-28'
        }`}
        onClick={isFullscreen ? (isRunning ? handlePause : handleStart) : undefined}
        title={isFullscreen ? (isRunning ? t.clickToPause : t.clickToStart) : undefined}
      >
        <TimerDisplay
          displaySeconds={displaySeconds}
          isOvertime={isOvertime}
          overtimeSeconds={overtimeSeconds}
          totalDurationSeconds={totalDurationSeconds}
          elapsedSeconds={elapsedSeconds}
          bells={bells}
          countDirection={countDirection}
          currentPhaseText={getCurrentPhaseText()}
          isRunning={isRunning}
          t={t}
          lang={lang}
        />
      </main>

      {/* Subtle Exit Fullscreen Floating Button (reveals on hover in top-right) */}
      {isFullscreen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFullscreen();
          }}
          className="fixed top-5 right-5 z-40 p-2.5 rounded-full ios-glass border border-white/10 text-white/30 hover:text-white hover:border-white/30 hover:bg-white/10 opacity-0 hover:opacity-100 transition-all duration-200"
          title={`${t.exitFullscreen} (F or Esc)`}
          aria-label={t.exitFullscreen}
        >
          <Minimize size={18} />
        </button>
      )}

      {/* Bottom iOS Control Bar - Hidden in Fullscreen */}
      {!isFullscreen && (
        <ControlBar
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onQuickTestSound={handleQuickTestSound}
          t={t}
        />
      )}

      {/* Settings Modal Sheet (Upper Right Pop-up) - Hidden in Fullscreen */}
      {!isFullscreen && (
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          totalMinutes={totalMinutes}
          totalSeconds={totalSeconds}
          onChangeTotalTime={handleChangeTotalTime}
          bells={bells}
          onChangeBell={handleChangeBell}
          onToggleBell={handleToggleBell}
          activePresetId={activePreset?.id}
          onSelectPreset={handleSelectPreset}
          customPresets={customPresets}
          onSaveCustomPreset={handleSaveCustomPreset}
          onDeleteCustomPreset={handleDeleteCustomPreset}
          volume={volume}
          onChangeVolume={setVolume}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          visualFlash={visualFlash}
          onToggleVisualFlash={setVisualFlash}
          displayMode={countDirection}
          onChangeDisplayMode={setCountDirection}
          t={t}
          lang={lang}
        />
      )}

    </div>
  );
}

