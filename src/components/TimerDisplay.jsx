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
  isRunning
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

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl px-2 sm:px-6 py-2 relative z-10">
      
      {/* Overtime or Phase Status Pill */}
      <div className="mb-2 sm:mb-4 transition-all duration-300">
        {isOvertime ? (
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-950/50 border border-red-500/40 text-[#FF453A] text-xs sm:text-sm font-bold tracking-widest uppercase animate-pulse shadow-[0_0_25px_rgba(255,69,58,0.3)]">
            <AlertCircle size={16} />
            <span>Overtime: +{fullString}</span>
          </div>
        ) : (
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors border ${theme.badgeClass}`}>
            <span>{currentPhaseText || (isRunning ? 'In Progress' : 'Ready')}</span>
          </div>
        )}
      </div>

      {/* Main Massive Digital Readout with Balanced Spacing */}
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

          {/* Colon Separator - clean and balanced */}
          <span className="opacity-75 mx-[0.03em] pb-[0.04em] select-none">
            :
          </span>

          {/* Seconds */}
          <span className="tnum inline-block text-center">{s1}</span>
          <span className="tnum inline-block text-center">{s2}</span>
        </div>
      </div>

      {/* Progress Timeline with Bell Pins */}
      <div className="w-full max-w-3xl mt-4 sm:mt-6 px-4">
        <div className="relative w-full">
          {/* Background track */}
          <div className={`h-2 sm:h-2.5 w-full rounded-full overflow-hidden ${theme.progressTrack}`}>
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
                      ? 'bg-amber-400 border-white text-black scale-110 shadow-[0_0_12px_#fbbf24]'
                      : 'bg-black/90 border-current/70 text-current group-hover:scale-125'
                  }`}
                  title={`${bell.name}: ${bell.minutes}m ${bell.seconds ? `${bell.seconds}s` : ''} (${bell.rings} ring${bell.rings > 1 ? 's' : ''})`}
                >
                  <Bell size={9} className="opacity-95" />
                </div>

                {/* Marker Tooltip label */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-medium bg-black/95 text-white border border-white/20 backdrop-blur">
                  {bell.name} ({bell.minutes}m)
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Labels below timeline */}
        <div className="flex justify-between items-center mt-3 text-xs opacity-75 font-medium">
          <span>00:00</span>
          <div className="flex gap-4 sm:gap-6">
            {bells.filter(b => b.enabled).map(b => (
              <span key={b.id} className="hidden sm:inline-flex items-center gap-1">
                <Bell size={11} className={elapsedSeconds >= (b.minutes * 60 + b.seconds) ? 'text-amber-400' : 'opacity-60'} />
                <span>B{b.id}: {String(b.minutes).padStart(2, '0')}:{String(b.seconds || 0).padStart(2, '0')}</span>
              </span>
            ))}
          </div>
          <span>{formatTimeParts(totalDurationSeconds).fullString}</span>
        </div>
      </div>

    </div>
  );
}
