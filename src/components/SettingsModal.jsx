import React, { useState } from 'react';
import {
  X,
  Bell,
  Clock,
  Palette,
  Volume2,
  VolumeX,
  Play,
  Check,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { DEFAULT_PRESETS, AVAILABLE_SOUNDS } from '../types/presets';
import { soundPlayer } from '../audio/soundPlayer';

export default function SettingsModal({
  isOpen,
  onClose,
  totalMinutes,
  totalSeconds,
  onChangeTotalTime,
  bells,
  onChangeBell,
  onToggleBell,
  activePresetId,
  onSelectPreset,
  customPresets,
  onSaveCustomPreset,
  onDeleteCustomPreset,
  volume,
  onChangeVolume,
  isMuted,
  onToggleMute,
  visualFlash,
  onToggleVisualFlash,
  displayMode,
  onChangeDisplayMode,
}) {
  const { theme, currentThemeId, setThemeId, allThemes } = useTheme();
  const [activeTab, setActiveTab] = useState('bells'); // 'bells' | 'presets' | 'appearance'
  const [newPresetName, setNewPresetName] = useState('');
  const [isSavingPreset, setIsSavingPreset] = useState(false);

  if (!isOpen) return null;

  const handleTestBell = (bell) => {
    soundPlayer.unlockAudio();
    soundPlayer.play(bell.sound, { rings: bell.rings });
  };

  const handleSavePreset = (e) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;
    onSaveCustomPreset(newPresetName.trim());
    setNewPresetName('');
    setIsSavingPreset(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Settings Pop-up Modal Sheet (Upper Right) */}
      <div
        className={`relative z-10 w-full sm:max-w-lg max-h-[92vh] sm:max-h-[85vh] flex flex-col rounded-b-3xl sm:rounded-3xl ios-glass border ${theme.cardClass} shadow-2xl overflow-hidden animate-scale-up`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-current/10">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Timer Settings</h2>
            <p className="text-xs opacity-60">Presentation bell markers, presets & themes</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-current/10 active:scale-90 transition-all duration-150"
            aria-label="Close Settings"
          >
            <X size={20} />
          </button>
        </div>

        {/* iOS Segmented Control Tabs */}
        <div className="px-6 pt-3 pb-2">
          <div className="grid grid-cols-3 p-1 rounded-2xl bg-current/5 border border-current/10 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('bells')}
              className={`py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'bells'
                  ? `${theme.accentClass} shadow-sm`
                  : 'hover:opacity-80'
              }`}
            >
              <Bell size={14} />
              <span>Bells & Time</span>
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'presets'
                  ? `${theme.accentClass} shadow-sm`
                  : 'hover:opacity-80'
              }`}
            >
              <Clock size={14} />
              <span>Presets</span>
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              className={`py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'appearance'
                  ? `${theme.accentClass} shadow-sm`
                  : 'hover:opacity-80'
              }`}
            >
              <Palette size={14} />
              <span>Theme & Audio</span>
            </button>
          </div>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 text-sm">
          
          {/* TAB 1: BELLS & TOTAL TIME */}
          {activeTab === 'bells' && (
            <div className="space-y-5">
              
              {/* Total Duration Block */}
              <div className="p-4 rounded-2xl bg-current/5 border border-current/10">
                <label className="text-xs font-semibold uppercase tracking-wider opacity-70 block mb-2">
                  Total Presentation Duration
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                      <span>Minutes</span>
                      <span className="font-mono font-bold text-sm">{totalMinutes}m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="120"
                      value={totalMinutes}
                      onChange={(e) => onChangeTotalTime(Number(e.target.value), totalSeconds)}
                      className="w-full accent-[#0A84FF] h-2 bg-current/10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                      <span>Seconds</span>
                      <span className="font-mono font-bold text-sm">{totalSeconds}s</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      step="5"
                      value={totalSeconds}
                      onChange={(e) => onChangeTotalTime(totalMinutes, Math.min(59, Math.max(0, Number(e.target.value))))}
                      className="w-full p-2 text-center rounded-xl bg-current/10 border border-current/15 font-mono text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bells Configuration (Up to 3 bells) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70">
                    Presentation Bell Chimes (Max 3)
                  </h3>
                  <span className="text-[11px] opacity-60">Sourced from OtoLogic</span>
                </div>

                {bells.map((bell) => (
                  <div
                    key={bell.id}
                    className={`p-4 rounded-2xl border transition-all duration-200 ${
                      bell.enabled
                        ? 'bg-current/5 border-current/15'
                        : 'bg-current/[0.02] border-current/5 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-current/10 text-xs font-bold font-mono">
                          {bell.id}
                        </span>
                        <div>
                          <div className="font-semibold text-sm flex items-center gap-2">
                            <span>{bell.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-current/10 font-normal">
                              {bell.rings} {bell.rings === 1 ? 'Chime' : 'Chimes'}
                            </span>
                          </div>
                          <div className="text-[11px] opacity-60">
                            Plays at {bell.minutes}m {bell.seconds ? `${bell.seconds}s` : ''}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Test Bell Audio Button */}
                        <button
                          onClick={() => handleTestBell(bell)}
                          className="p-2 rounded-xl bg-current/10 hover:bg-current/15 text-xs font-medium flex items-center gap-1 active:scale-95 transition-all"
                          title="Preview sound chime"
                        >
                          <Play size={12} fill="currentColor" />
                          <span className="text-[11px]">Test</span>
                        </button>

                        {/* iOS Switch Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={bell.enabled}
                            onChange={(e) => onToggleBell(bell.id, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-current/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#30D158]" />
                        </label>
                      </div>
                    </div>

                    {/* Minute / Second Sliders & Pickers */}
                    {bell.enabled && (
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-current/10 text-xs">
                        <div>
                          <label className="block text-[11px] opacity-70 mb-1">Trigger Minute</label>
                          <input
                            type="number"
                            min="0"
                            max={totalMinutes}
                            value={bell.minutes}
                            onChange={(e) => onChangeBell(bell.id, { minutes: Number(e.target.value) })}
                            className="w-full p-2 rounded-xl bg-current/10 border border-current/15 font-mono text-center focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] opacity-70 mb-1">Trigger Second</label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            step="5"
                            value={bell.seconds || 0}
                            onChange={(e) => onChangeBell(bell.id, { seconds: Number(e.target.value) })}
                            className="w-full p-2 rounded-xl bg-current/10 border border-current/15 font-mono text-center focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-5">
              
              {/* Built-in Presets */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Standard Presentation Presets
                </h3>
                <div className="grid gap-2">
                  {DEFAULT_PRESETS.map((preset) => {
                    const isSelected = activePresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => onSelectPreset(preset)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? `${theme.accentBorder} bg-current/10 shadow-sm`
                            : 'bg-current/5 border-current/10 hover:bg-current/10'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-sm flex items-center gap-2">
                            <span>{preset.name}</span>
                            {isSelected && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#30D158] text-black font-bold">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs opacity-60 mt-0.5">{preset.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-sm opacity-90">{preset.totalMinutes}m</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Presets Section */}
              <div className="pt-2 border-t border-current/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70">
                    Custom Presets ({customPresets.length})
                  </h3>
                  {!isSavingPreset && (
                    <button
                      onClick={() => setIsSavingPreset(true)}
                      className="text-xs flex items-center gap-1 font-semibold text-[#0A84FF] hover:underline"
                    >
                      <Plus size={14} />
                      <span>Save Current Settings</span>
                    </button>
                  )}
                </div>

                {/* Save Current Preset Form */}
                {isSavingPreset && (
                  <form onSubmit={handleSavePreset} className="p-3 rounded-2xl bg-current/5 border border-current/10 space-y-2">
                    <label className="block text-xs font-medium">Preset Name</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. My Final Thesis"
                        value={newPresetName}
                        onChange={(e) => setNewPresetName(e.target.value)}
                        className="flex-1 p-2 rounded-xl bg-current/10 border border-current/15 text-sm focus:outline-none"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#30D158] text-black font-semibold text-xs active:scale-95"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsSavingPreset(false)}
                        className="p-2 rounded-xl bg-current/10 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Custom Presets List */}
                {customPresets.length === 0 ? (
                  <div className="text-center py-4 text-xs opacity-50 italic">
                    No custom presets saved yet. Customize your bells and click "Save Current Settings".
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {customPresets.map((preset) => {
                      const isSelected = activePresetId === preset.id;
                      return (
                        <div
                          key={preset.id}
                          className={`w-full p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? `${theme.accentBorder} bg-current/10`
                              : 'bg-current/5 border-current/10'
                          }`}
                        >
                          <div
                            onClick={() => onSelectPreset(preset)}
                            className="flex-1 cursor-pointer pr-2"
                          >
                            <div className="font-semibold text-sm flex items-center gap-2">
                              <span>{preset.name}</span>
                              {isSelected && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#30D158] text-black font-bold">
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-xs opacity-60 mt-0.5">
                              {preset.totalMinutes}m • {preset.bells.filter(b => b.enabled).length} bells
                            </p>
                          </div>
                          <button
                            onClick={() => onDeleteCustomPreset(preset.id)}
                            className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 active:scale-90 transition-all"
                            title="Delete custom preset"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: THEME & AUDIO */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              
              {/* Color Themes Selection (Max 5 themes) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70">
                    Color Schemes (5 Curated)
                  </h3>
                  <span className="text-[11px] opacity-60">Dark & Light Modes</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {allThemes.map((t) => {
                    const isSelected = currentThemeId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setThemeId(t.id)}
                        className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between text-left ${
                          isSelected
                            ? 'bg-current/10 shadow-sm scale-[1.02]'
                            : 'border-current/10 bg-current/5 hover:bg-current/10'
                        }`}
                        style={{ borderColor: isSelected ? t.accentColor : undefined }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: t.accentColor }}
                          />
                          <div>
                            <div className="font-semibold text-xs sm:text-sm">{t.name}</div>
                            <div className="text-[10px] opacity-60">{t.type} Mode</div>
                          </div>
                        </div>

                        {isSelected && (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                            style={{ backgroundColor: t.accentColor, color: '#000000' }}
                          >
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sound Settings */}
              <div className="pt-4 border-t border-current/10 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70">
                  Audio & Visual Feedback
                </h3>

                {/* Volume Slider */}
                <div className="p-4 rounded-2xl bg-current/5 border border-current/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium flex items-center gap-1.5">
                      <Volume2 size={16} />
                      <span>Chime Volume</span>
                    </span>
                    <span className="font-mono font-bold">{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => onChangeVolume(Number(e.target.value))}
                    className="w-full accent-[#0A84FF] h-2 bg-current/10 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Visual Flash Alert Toggle */}
                <div className="p-4 rounded-2xl bg-current/5 border border-current/10 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-xs sm:text-sm">Screen Flash on Bell</div>
                    <div className="text-[11px] opacity-60">Subtly flash the screen when a bell rings</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visualFlash}
                      onChange={(e) => onToggleVisualFlash(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-current/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#30D158]" />
                  </label>
                </div>

                {/* OtoLogic Attribution Badge */}
                <div className="p-3 rounded-xl bg-current/[0.03] border border-current/5 text-[11px] opacity-70 flex items-center justify-between">
                  <span>Sound effects provided by <strong>OtoLogic</strong> (CC BY 4.0)</span>
                  <a
                    href="https://otologic.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A84FF] hover:underline flex items-center gap-0.5 ml-2"
                  >
                    <span>Website</span>
                    <ExternalLink size={10} />
                  </a>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer Done Button */}
        <div className="p-4 border-t border-current/10 flex justify-end">
          <button
            onClick={onClose}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-150 ${theme.accentClass} active:scale-95 shadow-md`}
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

