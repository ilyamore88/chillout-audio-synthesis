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
    this.setupGain(this.gainNode, 0.35);
    this.setupOscillator(440);
    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.connect(context.destination);
  }

  /**
   * Setup gainNode's value
   * @param {GainNode} gainNode - gain for this instrument
   * @param {Number} value - new value for gainNode
   */
  setupGain(gainNode, value) {
    gainNode.gain.value = value;
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
   * Play one note
   * @param {String} note - note to play (like A4)
   */
  playSound(note) {
    this.oscillatorNode.start(0);
  }

  /**
   * Stop playing note
   */
  stop() {
    this.oscillatorNode.stop(0);
  }
}

export default Instrument;
