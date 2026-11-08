import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../types/presets';

export const THEMES = [
  {
    id: 'neon-mint',
    name: 'Neon Mint',
    type: 'Neon',
    isDark: true,
    bgClass: 'bg-[#000000] text-[#00F5D4]',
    cardClass: 'bg-[#0d1614]/90 border-[#00F5D4]/25 text-[#E6FFF8]',
    dockClass: 'bg-[#091210]/90 border-[#00F5D4]/30',
    pillClass: 'bg-[#00F5D4]/10 hover:bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/20',
    accentClass: 'bg-[#00F5D4] text-[#001f1a] font-bold',
    accentHover: 'hover:bg-[#33ffdf]',
    accentText: 'text-[#00F5D4]',
    accentBorder: 'border-[#00F5D4]/50',
    accentColor: '#00F5D4',
    timerColor: '#00F5D4',
    glowFilter: 'drop-shadow(0 0 24px rgba(0, 245, 212, 0.45)) drop-shadow(0 0 65px rgba(0, 245, 212, 0.2))',
    glowClass: 'shadow-[0_0_60px_rgba(0,245,212,0.25)]',
    progressTrack: 'bg-[#00F5D4]/15',
    progressFill: 'bg-[#00F5D4] shadow-[0_0_15px_#00F5D4]',
    overtimeFill: 'bg-[#FF3B30] shadow-[0_0_15px_#FF3B30]',
    badgeClass: 'bg-[#00F5D4]/10 text-[#00F5D4] border-[#00F5D4]/30',
  },
  {
    id: 'neon-cyan',
    name: 'Electric Cyan',
    type: 'Neon',
    isDark: true,
    bgClass: 'bg-[#000000] text-[#00F0FF]',
    cardClass: 'bg-[#07131a]/90 border-[#00F0FF]/25 text-[#E0F8FF]',
    dockClass: 'bg-[#050e14]/90 border-[#00F0FF]/30',
    pillClass: 'bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/20',
    accentClass: 'bg-[#00F0FF] text-[#00171a] font-bold',
    accentHover: 'hover:bg-[#33f3ff]',
    accentText: 'text-[#00F0FF]',
    accentBorder: 'border-[#00F0FF]/50',
    accentColor: '#00F0FF',
    timerColor: '#00F0FF',
    glowFilter: 'drop-shadow(0 0 24px rgba(0, 240, 255, 0.45)) drop-shadow(0 0 65px rgba(0, 240, 255, 0.2))',
    glowClass: 'shadow-[0_0_60px_rgba(0,240,255,0.25)]',
    progressTrack: 'bg-[#00F0FF]/15',
    progressFill: 'bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]',
    overtimeFill: 'bg-[#FF3B30] shadow-[0_0_15px_#FF3B30]',
    badgeClass: 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30',
  },
  {
    id: 'neon-amber',
    name: 'Neon Amber',
    type: 'Neon',
    isDark: true,
    bgClass: 'bg-[#000000] text-[#FFB800]',
    cardClass: 'bg-[#141005]/90 border-[#FFB800]/25 text-[#FFF6E0]',
    dockClass: 'bg-[#0f0c04]/90 border-[#FFB800]/30',
    pillClass: 'bg-[#FFB800]/10 hover:bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/20',
    accentClass: 'bg-[#FFB800] text-[#1f1600] font-bold',
    accentHover: 'hover:bg-[#ffc633]',
    accentText: 'text-[#FFB800]',
    accentBorder: 'border-[#FFB800]/50',
    accentColor: '#FFB800',
    timerColor: '#FFB800',
    glowFilter: 'drop-shadow(0 0 24px rgba(255, 184, 0, 0.45)) drop-shadow(0 0 65px rgba(255, 184, 0, 0.2))',
    glowClass: 'shadow-[0_0_60px_rgba(255,184,0,0.25)]',
    progressTrack: 'bg-[#FFB800]/15',
    progressFill: 'bg-[#FFB800] shadow-[0_0_15px_#FFB800]',
    overtimeFill: 'bg-[#FF3B30] shadow-[0_0_15px_#FF3B30]',
    badgeClass: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30',
  },
  {
    id: 'ios-dark',
    name: 'iOS Classic Dark',
    type: 'Dark',
    isDark: true,
    bgClass: 'bg-[#000000] text-white',
    cardClass: 'bg-[#1C1C1E]/85 border-white/10 text-white',
    dockClass: 'bg-[#1C1C1E]/90 border-white/15',
    pillClass: 'bg-white/10 hover:bg-white/15 text-white',
    accentClass: 'bg-[#0A84FF] text-white font-semibold',
    accentHover: 'hover:bg-[#0071E3]',
    accentText: 'text-[#0A84FF]',
    accentBorder: 'border-[#0A84FF]/40',
    accentColor: '#0A84FF',
    timerColor: '#FFFFFF',
    glowFilter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))',
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
    cardClass: 'bg-white/90 border-black/10 text-[#1C1C1E] shadow-sm',
    dockClass: 'bg-white/95 border-black/10 shadow-lg',
    pillClass: 'bg-black/5 hover:bg-black/10 text-[#1C1C1E]',
    accentClass: 'bg-[#007AFF] text-white font-semibold',
    accentHover: 'hover:bg-[#0062CC]',
    accentText: 'text-[#007AFF]',
    accentBorder: 'border-[#007AFF]/30',
    accentColor: '#007AFF',
    timerColor: '#1C1C1E',
    glowFilter: 'none',
    glowClass: 'shadow-[0_0_40px_rgba(0,122,255,0.15)]',
    progressTrack: 'bg-black/10',
    progressFill: 'bg-[#007AFF]',
    overtimeFill: 'bg-[#FF3B30]',
    badgeClass: 'bg-black/5 text-[#1C1C1E]/80 border-black/10',
  }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'neon-mint';
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
