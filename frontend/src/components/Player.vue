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
    <input
      v-model="noteList"
      type="text"
    >
  </div>
</template>

<script>
  import Instrument from '../../audio/instrument';

  export default {
    name: 'Player',
    data() {
      return {
        audioCtx: new (AudioContext || window.webkitAudioContext)(),
        currentInstrument: null,
        gainValue: 0.35,
        noteList: 'C4 D4 E4 F4 G4 A4 B4 B4 A4 G4 F4 E4 D4 C4',
        isPlaying: false,
        waveType: 'sine',
        waves: ['sine', 'square', 'sawtooth', 'triangle']
      };
    },
    mounted() {
      this.currentInstrument = new Instrument(this.audioCtx);
      this.currentInstrument.setGainValue(this.gainValue);
      this.currentInstrument.setWave(this.waveType);
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
        this.currentInstrument.startOscillator();
        while (this.isPlaying) {
          await this.currentInstrument.playMelody(this.noteList.split(' '));
        }
      },
      stopMusic() {
        this.isPlaying = false;
        this.$parent.countOfPlaying--;
        this.currentInstrument.stopOscillator();
      }
    }
  };
</script>
