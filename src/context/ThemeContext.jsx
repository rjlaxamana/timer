import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../types/presets';

export const THEMES = [
  {
    id: 'ios-dark',
    name: 'iOS Dark',
    type: 'Dark',
    isDark: true,
    bgClass: 'bg-[#000000] text-white',
    cardClass: 'bg-[#1C1C1E]/80 border-white/10 text-white',
    dockClass: 'bg-[#1C1C1E]/85 border-white/15',
    pillClass: 'bg-white/10 hover:bg-white/15 text-white',
    accentClass: 'bg-[#0A84FF] text-white',
    accentHover: 'hover:bg-[#0071E3]',
    accentText: 'text-[#0A84FF]',
    accentBorder: 'border-[#0A84FF]/40',
    accentColor: '#0A84FF',
    glowClass: 'shadow-[0_0_50px_rgba(10,132,255,0.2)]',
    progressTrack: 'bg-white/10',
    progressFill: 'bg-[#0A84FF]',
    overtimeFill: 'bg-[#FF453A]',
    badgeClass: 'bg-white/10 text-white/80 border-white/10',
  },
  {
    id: 'ios-light',
    name: 'iOS Light',
    type: 'Light',
    isDark: false,
    bgClass: 'bg-[#F2F2F7] text-[#1C1C1E]',
    cardClass: 'bg-white/85 border-black/10 text-[#1C1C1E] shadow-sm',
    dockClass: 'bg-white/90 border-black/10 shadow-lg',
    pillClass: 'bg-black/5 hover:bg-black/10 text-[#1C1C1E]',
    accentClass: 'bg-[#007AFF] text-white',
    accentHover: 'hover:bg-[#0062CC]',
    accentText: 'text-[#007AFF]',
    accentBorder: 'border-[#007AFF]/30',
    accentColor: '#007AFF',
    glowClass: 'shadow-[0_0_40px_rgba(0,122,255,0.15)]',
    progressTrack: 'bg-black/10',
    progressFill: 'bg-[#007AFF]',
    overtimeFill: 'bg-[#FF3B30]',
    badgeClass: 'bg-black/5 text-[#1C1C1E]/80 border-black/10',
  },
  {
    id: 'cyber',
    name: 'Midnight Cyber',
    type: 'Color',
    isDark: true,
    bgClass: 'bg-[#070b14] text-[#E0F2FE]',
    cardClass: 'bg-[#0F172A]/80 border-cyan-500/20 text-[#E0F2FE]',
    dockClass: 'bg-[#0F172A]/90 border-cyan-500/30',
    pillClass: 'bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/20',
    accentClass: 'bg-[#06B6D4] text-black font-semibold',
    accentHover: 'hover:bg-[#22D3EE]',
    accentText: 'text-[#00f0ff]',
    accentBorder: 'border-cyan-400/50',
    accentColor: '#00f0ff',
    glowClass: 'shadow-[0_0_60px_rgba(6,182,212,0.25)]',
    progressTrack: 'bg-cyan-950/40',
    progressFill: 'bg-[#00f0ff]',
    overtimeFill: 'bg-[#F43F5E]',
    badgeClass: 'bg-cyan-950/50 text-cyan-300 border-cyan-500/30',
  },
  {
    id: 'sunset',
    name: 'Sunset Amber',
    type: 'Color',
    isDark: true,
    bgClass: 'bg-[#12100E] text-[#FFF7ED]',
    cardClass: 'bg-[#1C1917]/85 border-amber-500/20 text-[#FFF7ED]',
    dockClass: 'bg-[#1C1917]/90 border-amber-500/30',
    pillClass: 'bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-500/20',
    accentClass: 'bg-[#F97316] text-white font-semibold',
    accentHover: 'hover:bg-[#EA580C]',
    accentText: 'text-[#FF9F0A]',
    accentBorder: 'border-amber-400/50',
    accentColor: '#FF9F0A',
    glowClass: 'shadow-[0_0_60px_rgba(249,115,22,0.25)]',
    progressTrack: 'bg-amber-950/40',
    progressFill: 'bg-[#FF9F0A]',
    overtimeFill: 'bg-[#EF4444]',
    badgeClass: 'bg-amber-950/50 text-amber-300 border-amber-500/30',
  },
  {
    id: 'mint',
    name: 'Emerald Mint',
    type: 'Color',
    isDark: true,
    bgClass: 'bg-[#07130F] text-[#F0FDF4]',
    cardClass: 'bg-[#0F241C]/85 border-emerald-500/20 text-[#F0FDF4]',
    dockClass: 'bg-[#0F241C]/90 border-emerald-500/30',
    pillClass: 'bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/20',
    accentClass: 'bg-[#10B981] text-black font-semibold',
    accentHover: 'hover:bg-[#34D399]',
    accentText: 'text-[#30D158]',
    accentBorder: 'border-emerald-400/50',
    accentColor: '#30D158',
    glowClass: 'shadow-[0_0_60px_rgba(16,185,129,0.25)]',
    progressTrack: 'bg-emerald-950/40',
    progressFill: 'bg-[#30D158]',
    overtimeFill: 'bg-[#F87171]',
    badgeClass: 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30',
  }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'ios-dark';
  });

  const theme = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, currentThemeId);
    if (theme.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentThemeId, theme]);

  return (
    <ThemeContext.Provider value={{ theme, currentThemeId, setThemeId: setCurrentThemeId, allThemes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
