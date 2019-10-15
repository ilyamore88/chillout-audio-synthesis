<template>
  <div class="player">
    <button
      v-if="!isPlaying"
      ref="playButton"
      @click="playMusic"
    >
      Play
    </button>
    <button
      v-if="isPlaying"
      ref="stopButton"
      @click="stopMusic"
    >
      Stop
    </button>
    <select v-model="waveType">
      <option
        v-for="(waveType, index) in waves"
        :key="index"
      >
        {{ waveType }}
      </option>
    </select>
    <input
      v-model="noteList"
      type="text"
    >
    <input
      :id="$id('gain-value')"
      v-model="gainValue"
      type="range"
      min="0"
      max="1"
      step="0.01"
    >
    <label
      :for="$id('gain-value')"
      class="player__gain-value"
    >
      {{ Math.round(gainValue * 100) }}
    </label>
  </div>
</template>

<script>
  import Instrument from '../../audio/instrument';

  export default {
    name: 'Player',
    data() {
      return {
        audioCtx: null,
        currentInstrument: null,
        gainValue: 0.35,
        noteList: 'E4 G4 A4 B4 G4 B4 B4 A4 A4 G4 G4 E4 E4',
        isPlaying: false,
        waveType: 'sine',
        waves: ['sine', 'square', 'sawtooth', 'triangle', 'piano', 'organ', 'bass', 'bass_sub', 'guitar'],
        playerResolver: null
      };
    },
    mounted() {
      const AudioContext = window.AudioContext || // Default
        window.webkitAudioContext || // Safari and old versions of Chrome
        false;

      if (AudioContext) {
        // Do whatever you want using the Web Audio API
        this.audioCtx = new AudioContext();
        this.currentInstrument = new Instrument(this.audioCtx);
        this.currentInstrument.setGainValue(this.gainValue);
        this.currentInstrument.setWave(this.waveType);
      } else {
        /*
         * Web Audio API is not supported
         * Alert the user
         */
        alert('Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox');
      }
    },
    updated() {
      if (this.currentInstrument) {
        this.currentInstrument.setGainValue(this.gainValue);
        this.currentInstrument.setWave(this.waveType);
      }
    },
    methods: {
      async playMusic() {
        this.isPlaying = true;
        this.$parent.countOfPlaying++;
        while (this.isPlaying) {
          await this.currentInstrument.playMelody(this.noteList.split(' '));
        }
      },
      stopMusic() {
        this.isPlaying = false;
        this.currentInstrument.stopOscillator();
        this.$parent.countOfPlaying--;
      }
    }
  };
</script>
