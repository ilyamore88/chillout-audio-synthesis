<template>
  <button @click="playSound">
    Play
  </button>
</template>

<script>
  import Instrument from '../../audio/instrument';
  export default {
    name: 'Player',
    methods: {
      playSound() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const newInstrument = new Instrument(audioCtx);

        newInstrument.playSound('A4');
        setTimeout(() => {
          newInstrument.stop();
        }, 500);
      }
    }
  };
</script>
