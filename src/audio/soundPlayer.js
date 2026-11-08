class SoundPlayer {
  constructor() {
    this.audioCache = {};
    this.volume = 1.0;
    this.isMuted = false;
    this.audioContext = null;
    this.isUnlocked = false;
    this.visualFlashCallback = null;
  }

  setVisualFlashCallback(cb) {
    this.visualFlashCallback = cb;
  }

  unlockAudio() {
    if (this.isUnlocked) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!this.audioContext) {
          this.audioContext = new AudioCtx();
        }
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
      }
      this.isUnlocked = true;
    } catch (e) {
      console.warn('AudioContext unlock failed:', e);
    }
  }

  getAudioUrl(soundId) {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    const soundFiles = {
      'otologic-ding04': 'otologic-ding04.mp3',
      'otologic-ding03': 'otologic-ding03.mp3',
      'otologic-ding02': 'otologic-ding02.mp3',
      'reception-bell': 'reception-bell.mp3',
    };
    const filename = soundFiles[soundId] || `${soundId}.mp3`;
    return `${baseUrl}/audio/${filename}`;
  }

  preloadSounds() {
    const soundIds = ['otologic-ding04', 'otologic-ding03', 'otologic-ding02', 'reception-bell'];
    soundIds.forEach((id) => {
      const url = this.getAudioUrl(id);
      const audio = new Audio(url);
      audio.preload = 'auto';
      this.audioCache[id] = audio;
    });
  }

  playSyntheticChime(count = 1) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;
      const chimeSpacing = 0.55;

      for (let i = 0; i < count; i++) {
        const startTime = now + i * chimeSpacing;

        // Base bell frequencies with acoustic harmonic overtones
        [1209, 2418, 3627].forEach((freq, idx) => {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          const peakGain = (0.28 / (idx + 1)) * this.volume;
          gain.gain.setValueAtTime(0.0001, startTime);
          gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2 - idx * 0.2);

          osc.connect(gain);
          gain.connect(this.audioContext.destination);

          osc.start(startTime);
          osc.stop(startTime + 1.2);
        });
      }
    } catch (e) {
      console.warn('Synthetic chime failed:', e);
    }
  }

  play(soundId, options = {}) {
    if (this.isMuted) return;

    if (this.visualFlashCallback) {
      this.visualFlashCallback();
    }

    this.unlockAudio();

    const url = this.getAudioUrl(soundId);
    let audio = this.audioCache[soundId];

    if (!audio) {
      audio = new Audio(url);
      this.audioCache[soundId] = audio;
    }

    try {
      audio.currentTime = 0;
      audio.volume = Math.max(0, Math.min(1, this.volume));
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio playback prevented or failed, falling back to Web Audio synth:', err);
          // Fallback to synthetic chime if browser blocks mp3 file playback
          const rings = options.rings || (soundId.includes('ding02') ? 3 : soundId.includes('ding03') ? 2 : 1);
          this.playSyntheticChime(rings);
        });
      }
    } catch (err) {
      console.warn('Audio play exception, fallback to synth:', err);
      const rings = options.rings || 1;
      this.playSyntheticChime(rings);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  setMuted(muted) {
    this.isMuted = muted;
  }
}

export const soundPlayer = new SoundPlayer();
