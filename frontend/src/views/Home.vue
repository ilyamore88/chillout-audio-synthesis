<template>
  <div>
    <component
      :is="player"
      v-for="(player,index) in players"
      :key="index"
      ref="player"
    />
    <button
      v-if="players.length>0 && countOfPlaying === 0"
      @click="playAll"
    >
      Play All
    </button>
    <button
      v-if="players.length>0 && countOfPlaying !== 0"
      @click="stopAll"
    >
      Stop All
    </button>
    <button @click="addPlayer">
      +
    </button>
  </div>
</template>

<script>
  import Player from '../components/Player';

  export default {
    name: 'Home',
    components: {
      Player
    },
    data() {
      return {
        players: [],
        countOfPlaying: 0
      };
    },
    methods: {
      addPlayer() {
        this.players.push('Player');
      },
      playAll() {
        this.$refs.player.map((player) => {
          player.$refs.playButton.click();
          return player;
        });
      },
      stopAll() {
        this.$refs.player.map((player) => {
          player.$refs.stopButton.click();
          return player;
        });
      }
    }
  };
</script>
