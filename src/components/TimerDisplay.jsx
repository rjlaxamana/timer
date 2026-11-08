import React from 'react';
import { Bell, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function TimerDisplay({
  displaySeconds,
  isOvertime,
  overtimeSeconds,
  totalDurationSeconds,
  elapsedSeconds,
  bells,
  countDirection,
  currentPhaseText,
  isRunning
}) {
  const { theme } = useTheme();

  // Format MM:SS with leading zeros
  const formatTime = (totalSecs) => {
    const isNeg = totalSecs < 0;
    const abs = Math.abs(totalSecs);
    const m = Math.floor(abs / 60);
    const s = abs % 60;
    const padM = String(m).padStart(2, '0');
    const padS = String(s).padStart(2, '0');
    return `${isNeg ? '-' : ''}${padM}:${padS}`;
  };

  // Calculate progress percentage (0 - 100%)
  const progressPercent = totalDurationSeconds > 0
    ? Math.min(100, Math.max(0, (elapsedSeconds / totalDurationSeconds) * 100))
    : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl px-4 sm:px-8 py-4 sm:py-6 relative z-10">
      
      {/* Overtime or Phase Status Pill */}
      <div className="mb-3 sm:mb-6 transition-all duration-300">
        {isOvertime ? (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold tracking-wider uppercase animate-pulse">
            <AlertCircle size={15} />
            <span>Overtime: +{formatTime(overtimeSeconds)}</span>
          </div>
        ) : (
          <div className={`flex items-center gap-2 px-4 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors border ${theme.badgeClass}`}>
            <span>{currentPhaseText || (isRunning ? 'Running' : 'Ready')}</span>
          </div>
        )}
      </div>

      {/* Main Massive Digital Readout */}
      <div className="relative flex items-center justify-center my-2 sm:my-4">
        <div
          className={`tnum font-bold tracking-tight select-none transition-colors duration-300 ${
            isOvertime
              ? 'text-red-500 drop-shadow-[0_0_40px_rgba(239,68,68,0.4)]'
              : 'drop-shadow-sm'
          }`}
          style={{
            fontSize: 'clamp(4.5rem, 20vw, 16rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}
        >
          {isOvertime ? `+${formatTime(overtimeSeconds)}` : formatTime(displaySeconds)}
        </div>
      </div>

      {/* Progress Timeline with Bell Pins */}
      <div className="w-full max-w-2xl mt-4 sm:mt-8 px-2">
        <div className="relative w-full">
          {/* Background track */}
          <div className={`h-2.5 sm:h-3 w-full rounded-full overflow-hidden ${theme.progressTrack}`}>
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isOvertime ? theme.overtimeFill : theme.progressFill
              }`}
              style={{ width: `${isOvertime ? 100 : progressPercent}%` }}
            />
          </div>

          {/* Bell Markers pinned on the timeline */}
          {bells.map((bell) => {
            const bellSeconds = bell.minutes * 60 + bell.seconds;
            if (bellSeconds <= 0 || bellSeconds > totalDurationSeconds || !bell.enabled) return null;
            const markerPercent = (bellSeconds / totalDurationSeconds) * 100;
            const hasTriggered = elapsedSeconds >= bellSeconds;

            return (
              <div
                key={bell.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group z-20"
                style={{ left: `${markerPercent}%` }}
              >
                {/* Marker Dot */}
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-200 border-2 shadow-sm ${
                    hasTriggered
                      ? 'bg-amber-400 border-white text-black scale-110'
                      : 'bg-neutral-800 border-white/60 text-white/80 group-hover:scale-125'
                  }`}
                  title={`${bell.name}: ${bell.minutes}m ${bell.seconds ? `${bell.seconds}s` : ''} (${bell.rings} ring${bell.rings > 1 ? 's' : ''})`}
                >
                  <Bell size={9} className="opacity-90" />
                </div>

                {/* Marker Tooltip label */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap px-2 py-0.5 rounded text-[10px] bg-black/80 text-white backdrop-blur">
                  {bell.name} ({bell.minutes}m)
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Labels below timeline */}
        <div className="flex justify-between items-center mt-3 text-xs opacity-60 font-medium">
          <span>00:00</span>
          <div className="flex gap-4">
            {bells.filter(b => b.enabled).map(b => (
              <span key={b.id} className="hidden sm:inline-flex items-center gap-1">
                <Bell size={10} className={elapsedSeconds >= (b.minutes * 60 + b.seconds) ? 'text-amber-400' : ''} />
                <span>B{b.id}: {b.minutes}m</span>
              </span>
            ))}
          </div>
          <span>{formatTime(totalDurationSeconds)}</span>
        </div>
      </div>

    </div>
  );
}
