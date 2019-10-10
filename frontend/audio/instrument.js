import noteFrequencies from './noteFrequencies';

/**
 * Parent class for all instruments
 */
class Instrument {
  /**
   * Create instrument object
   * @param {AudioContext} context - audio context
   */
  constructor(context) {
    this.context = context;
    this.oscillatorNode = context.createOscillator();
    this.gainNode = context.createGain();
    this.setGainValue(0.35);
    this.setupOscillator(440);
    this.oscillatorNode.start();
    this.gainNode.connect(context.destination);
  }

  /**
   * Set gainNode's value
   * @param {Number} value - new value for gainNode
   */
  setGainValue(value) {
    this.gainNode.gain.setValueAtTime(value, this.context.currentTime);
  }

  /**
   * Return gainNode's value. If gainNode === null, return 0.
   * @return {Number} value - gainNode's value
   */
  getGainValue() {
    if (this.gainNode) {
      return this.gainNode.gain.value;
    }
    return 0;
  }

  /**
   * Setup oscillator values
   * @param {Number} frequency - frequency of oscillator in hertz
   * @param {Number} detune - detuning of oscillation in cents
   * @param {String} waveType - the shape of waveform to play
   */
  setupOscillator(frequency, detune = 0, waveType = 'sine') {
    this.oscillatorNode.frequency.value = frequency;
    this.oscillatorNode.detune.value = 0;
    this.oscillatorNode.type = waveType;
  }

  /**
   * Set oscillator's wave
   * @param waveType - the shape of waveform to play
   */
  setWave(waveType) {
    this.oscillatorNode.type = waveType;
  }

  /**
   * Play melody
   * @param {Array} noteList - list of notes to play
   */
  playMelody(noteList) {
    const now = this.context.currentTime;

    noteList.forEach((note, index) => {
      this.oscillatorNode.frequency.setValueAtTime(this.getFrequency(note), now + (0.3 * index));
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Melody is done!');
      }, noteList.length * 300);
    });
  }

  /**
   * Get frequency of note
   * @param {String} note - new note (like A4)
   * @return {Number} frequency - frequency of note
   */
  getFrequency(note) {
    let noteColumn = 0;

    // Make pause, when user write one symbol ('.', '_', etc.)
    if (note.length === 1) {
      return 0.0;
    }

    const noteRow = Number(note[1]);

    switch (note[0]) {
      case 'C':
        noteColumn = 0;
        break;
      case 'D':
        noteColumn = 1;
        break;
      case 'E':
        noteColumn = 2;
        break;
      case 'F':
        noteColumn = 3;
        break;
      case 'G':
        noteColumn = 4;
        break;
      case 'A':
        noteColumn = 5;
        break;
      case 'B':
        noteColumn = 6;
        break;
    }
    return noteFrequencies[noteRow][noteColumn];
  }

  /**
   * Connect oscillator to gainNode
   */
  startOscillator() {
    this.oscillatorNode.connect(this.gainNode);
    console.log('Connected to gainNode');
  }

  /**
   * Disconnect oscillator from gainNode
   */
  stopOscillator() {
    this.oscillatorNode.disconnect(this.gainNode);
    console.log('Disconnected from gainNode');
  }
}

export default Instrument;
