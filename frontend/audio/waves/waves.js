/**
 * Import wave sources
 */
import pianoWaveSource from './sources/piano';
import organWaveSource from './sources/organ';
import bassWaveSource from './sources/bass';
import bassSubWaveSource from './sources/bass_sub';
import guitarWaveSource from './sources/guitar';

/**
 * Function return PeriodicWave object
 * @param {String} waveName - wave's name
 * @param {AudioContext} context - audio context
 * @return {PeriodicWave}
 */
export function createWave(waveName, context) {
  let wave = null;

  switch (waveName) {
    case 'piano':
      wave = context.createPeriodicWave(pianoWaveSource.real, pianoWaveSource.imag);
      break;
    case 'organ':
      wave = context.createPeriodicWave(organWaveSource.real, organWaveSource.imag);
      break;
    case 'bass':
      wave = context.createPeriodicWave(bassWaveSource.real, bassWaveSource.imag);
      break;
    case 'bass_sub':
      wave = context.createPeriodicWave(bassSubWaveSource.real, bassSubWaveSource.imag);
      break;
    case 'guitar':
      wave = context.createPeriodicWave(guitarWaveSource.real, guitarWaveSource.imag);
      break;
  }
  return wave;
}
