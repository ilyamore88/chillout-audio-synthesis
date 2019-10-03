<template>
  <div class="player">
    <button @click="playMusic">
      Play
    </button>
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
        audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
        currentInstrument: null,
        gainValue: 0.35,
        noteList: 'C4 D4 E4 F4 G4 A4 B4 B4 A4 G4 F4 E4 D4 C4'
      };
    },
    mounted() {
      this.currentInstrument = new Instrument(this.audioCtx);
      this.currentInstrument.setGainValue(this.gainValue);
    },
    updated() {
      if (this.currentInstrument) {
        this.currentInstrument.setGainValue(this.gainValue);
      }
    },
    methods: {
      playMusic() {
        this.currentInstrument.playMelody(this.noteList.split(' '));
      }
    }
  };
</script>
