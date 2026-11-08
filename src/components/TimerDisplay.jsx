import React from 'react';
import { Bell, AlertCircle } from 'lucide-react';
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
  isRunning,
  t,
  lang
}) {
  const { theme } = useTheme();

  // Format MM:SS with leading zeros
  const formatTimeParts = (totalSecs) => {
    const isNeg = totalSecs < 0;
    const abs = Math.abs(totalSecs);
    const m = Math.floor(abs / 60);
    const s = abs % 60;
    const padM = String(m).padStart(2, '0');
    const padS = String(s).padStart(2, '0');
    return {
      isNeg,
      m1: padM[0],
      m2: padM[1],
      s1: padS[0],
      s2: padS[1],
      fullString: `${isNeg ? '-' : ''}${padM}:${padS}`
    };
  };

  const activeSecs = isOvertime ? overtimeSeconds : displaySeconds;
  const { m1, m2, s1, s2, fullString } = formatTimeParts(activeSecs);

  // Calculate progress percentage (0 - 100%)
  const progressPercent = totalDurationSeconds > 0
    ? Math.min(100, Math.max(0, (elapsedSeconds / totalDurationSeconds) * 100))
    : 0;

  // Check if any active bell is exactly at the start or end of the track
  const hasBellAtEnd = bells.some(
    (b) => b.enabled && b.minutes * 60 + (b.seconds || 0) === totalDurationSeconds
  );

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl px-2 sm:px-6 py-2 relative z-10">
      
      {/* Overtime or Phase Status Pill */}
      <div className="mb-2 sm:mb-4 transition-all duration-300">
        {isOvertime ? (
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-950/50 border border-red-500/40 text-[#FF453A] text-xs sm:text-sm font-bold tracking-widest uppercase animate-pulse shadow-[0_0_25px_rgba(255,69,58,0.3)]">
            <AlertCircle size={16} />
            <span>{t.overtime}: +{fullString}</span>
          </div>
        ) : (
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors border ${theme.badgeClass}`}>
            <span>{currentPhaseText || (isRunning ? t.inProgress : t.ready)}</span>
          </div>
        )}
      </div>

      {/* Main Massive Digital Readout with Balanced Spacing & Exact Color Match for Colon */}
      <div className="relative flex items-center justify-center w-full my-2 sm:my-3 select-none">
        <div
          className="flex items-center justify-center font-timer font-bold select-none transition-all duration-300"
          style={{
            fontSize: 'clamp(6.5rem, 26vw, 23rem)',
            lineHeight: 0.9,
            letterSpacing: '0.015em',
            color: isOvertime ? '#FF453A' : theme.timerColor,
            filter: isOvertime
              ? 'drop-shadow(0 0 25px rgba(255, 69, 58, 0.6)) drop-shadow(0 0 60px rgba(255, 69, 58, 0.3))'
              : theme.glowFilter,
          }}
        >
          {/* Overtime indicator prefix */}
          {isOvertime && (
            <span className="text-red-500 mr-2 sm:mr-3 font-normal opacity-90 select-none">
              +
            </span>
          )}

          {/* Minutes */}
          <span className="tnum inline-block text-center">{m1}</span>
          <span className="tnum inline-block text-center">{m2}</span>

          {/* Colon Separator - 100% opacity matching exact color and glow of digits */}
          <span className="mx-[0.03em] pb-[0.04em] select-none">
            :
          </span>

          {/* Seconds */}
          <span className="tnum inline-block text-center">{s1}</span>
          <span className="tnum inline-block text-center">{s2}</span>
        </div>
      </div>

      {/* Progress Timeline with Bell Pins and Times Directly Aligned Below */}
      <div className="w-full max-w-3xl mt-4 sm:mt-6 px-4">
        <div className="relative w-full pb-7">
          {/* Background track */}
          <div className={`h-2 sm:h-2.5 w-full rounded-full overflow-hidden ${theme.progressTrack}`}>
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isOvertime ? theme.overtimeFill : theme.progressFill
              }`}
              style={{ width: `${isOvertime ? 100 : progressPercent}%` }}
            />
          </div>

          {/* Bell Markers & Times directly aligned under each bell symbol */}
          {bells.map((bell) => {
            const bellSeconds = bell.minutes * 60 + (bell.seconds || 0);
            if (bellSeconds <= 0 || bellSeconds > totalDurationSeconds || !bell.enabled) return null;
            const markerPercent = (bellSeconds / totalDurationSeconds) * 100;
            const hasTriggered = elapsedSeconds >= bellSeconds;
            const timeString = formatTimeParts(bellSeconds).fullString;

            return (
              <div
                key={bell.id}
                className="absolute top-1 -translate-y-1/2 -translate-x-1/2 group z-20 flex flex-col items-center"
                style={{ left: `${markerPercent}%` }}
              >
                {/* Bell Icon Pin on top of the progress bar with optical centering */}
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-200 border-[1.5px] shadow-sm ${
                    hasTriggered
                      ? 'bg-amber-400 border-white text-black scale-110 shadow-[0_0_12px_#fbbf24]'
                      : 'bg-black/90 border-current/70 text-current group-hover:scale-125'
                  }`}
                  title={`${(lang === 'ja' && bell.nameJa) ? bell.nameJa : bell.name}: ${timeString} (${bell.rings} ${bell.rings === 1 ? t.chime : t.chimes})`}
                >
                  <Bell size={11} className="opacity-95 translate-y-[0.75px]" />
                </div>

                {/* Time directly under the progress bar aligned with the bell symbol */}
                <div className="mt-2.5 whitespace-nowrap select-none pointer-events-none">
                  <span
                    className={`text-[11px] sm:text-xs font-semibold tracking-tight transition-colors ${
                      hasTriggered ? 'text-amber-400 font-bold' : 'opacity-70'
                    }`}
                  >
                    {timeString}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Track 00:00 at start and total duration at end (if not occupied by a bell) */}
          <div className="absolute top-4 left-0 right-0 flex justify-between items-center text-[11px] sm:text-xs opacity-50 font-medium select-none pointer-events-none">
            <span>00:00</span>
            {!hasBellAtEnd && (
              <span>{formatTimeParts(totalDurationSeconds).fullString}</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
