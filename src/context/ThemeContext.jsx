import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../types/presets';

export const THEMES = [
  {
    id: 'neon-pink',
    name: 'Neon Pink',
    type: 'Neon',
    isDark: true,
    bgClass: 'bg-[#000000] text-[#FF2D55]',
    cardClass: 'bg-[#1a0a10]/90 border-[#FF2D55]/25 text-[#FFEBF0]',
    dockClass: 'bg-[#14060c]/90 border-[#FF2D55]/30',
    pillClass: 'bg-[#FF2D55]/10 hover:bg-[#FF2D55]/20 text-[#FF2D55] border border-[#FF2D55]/20',
    accentClass: 'bg-[#FF2D55] text-white font-bold',
    accentHover: 'hover:bg-[#ff476d]',
    accentText: 'text-[#FF2D55]',
    accentBorder: 'border-[#FF2D55]/50',
    accentColor: '#FF2D55',
    timerColor: '#FF2D55',
    startButtonClass: 'bg-[#FF2D55] hover:bg-[#ff476d] text-white font-bold',
    glowFilter: 'drop-shadow(0 0 24px rgba(255, 45, 85, 0.45)) drop-shadow(0 0 65px rgba(255, 45, 85, 0.2))',
    glowClass: 'shadow-[0_0_60px_rgba(255,45,85,0.25)]',
    progressTrack: 'bg-[#FF2D55]/15',
    progressFill: 'bg-[#FF2D55] shadow-[0_0_15px_#FF2D55]',
    overtimeFill: 'bg-[#FF3B30] shadow-[0_0_15px_#FF3B30]',
    badgeClass: 'bg-[#FF2D55]/10 text-[#FF2D55] border-[#FF2D55]/30',
  },
  {
    id: 'neon-orange',
    name: 'Warm Orange',
    type: 'Warm',
    isDark: true,
    bgClass: 'bg-[#000000] text-[#FF8A3D]',
    cardClass: 'bg-[#16100a]/90 border-[#FF8A3D]/25 text-[#FFF4EB]',
    dockClass: 'bg-[#110b06]/90 border-[#FF8A3D]/30',
    pillClass: 'bg-[#FF8A3D]/10 hover:bg-[#FF8A3D]/20 text-[#FF8A3D] border border-[#FF8A3D]/20',
    accentClass: 'bg-[#FF8A3D] text-black font-bold',
    accentHover: 'hover:bg-[#ff9c57]',
    accentText: 'text-[#FF8A3D]',
    accentBorder: 'border-[#FF8A3D]/50',
    accentColor: '#FF8A3D',
    timerColor: '#FF8A3D',
    startButtonClass: 'bg-[#FF8A3D] hover:bg-[#ff9c57] text-black font-bold',
    glowFilter: 'drop-shadow(0 0 12px rgba(255, 138, 61, 0.22)) drop-shadow(0 0 30px rgba(255, 138, 61, 0.1))',
    glowClass: 'shadow-[0_0_40px_rgba(255,138,61,0.18)]',
    progressTrack: 'bg-[#FF8A3D]/15',
    progressFill: 'bg-[#FF8A3D] shadow-[0_0_10px_#FF8A3D]',
    overtimeFill: 'bg-[#FF3B30] shadow-[0_0_15px_#FF3B30]',
    badgeClass: 'bg-[#FF8A3D]/10 text-[#FF8A3D] border-[#FF8A3D]/30',
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
    startButtonClass: 'bg-[#00F0FF] hover:bg-[#33f3ff] text-black font-bold',
    glowFilter: 'drop-shadow(0 0 24px rgba(0, 240, 255, 0.45)) drop-shadow(0 0 65px rgba(0, 240, 255, 0.2))',
    glowClass: 'shadow-[0_0_60px_rgba(0,240,255,0.25)]',
    progressTrack: 'bg-[#00F0FF]/15',
    progressFill: 'bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]',
    overtimeFill: 'bg-[#FF3B30] shadow-[0_0_15px_#FF3B30]',
    badgeClass: 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30',
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
    startButtonClass: 'bg-[#0A84FF] hover:bg-[#0071E3] text-white font-semibold',
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
    startButtonClass: 'bg-[#007AFF] hover:bg-[#0062CC] text-white font-semibold',
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
    let saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'neon-pink';
    if (saved === 'neon-mint') saved = 'neon-pink';
    if (saved === 'neon-amber') saved = 'neon-orange';
    return saved;
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
