<template>
  <div id="app">
    <button @click="Toggle">
      {{ options.is_start ? "正在录音" : "开始录音" }}
    </button>
    <AudioSpectrum :options="options" />
  </div>
</template>

<script>
import HZRecorder from "./HZRecorder";

export default {
  name: "app",
  data() {
    return {
      recorder: {},
      options: {
        is_start: false,
        analyzer: {},
        width: 300,
        height: 100,
        colors: {
          up: [
            { pos: 0.0, clr: "#333" },
            { pos: 0.5, clr: "#333" },
            { pos: 1.0, clr: "#333" }
          ],
          down: [
            { pos: 0.0, clr: "#ccc" },
            { pos: 0.5, clr: "#ccc" },
            { pos: 1.0, clr: "#ccc" }
          ]
        }
      }
    };
  },
  mounted() {},
  methods: {
    Toggle() {
      if (this.options.is_start) {
        this.StopRecording();
      } else {
        this.StartRecording();
      }
    },
    StartRecording() {
      HZRecorder.get(rec => {
        this.recorder = rec;
        rec.start();
        const context = rec.context;
        const audioInput = rec.audioInput;
        const analyzer = context.createAnalyser();
        audioInput.connect(analyzer);

        console.log("Recording...");
        this.options.is_start = true;
        this.options.analyzer = analyzer;
      });
    },
    StopRecording() {
      if (this.recorder) {
        this.recorder.stop();
        this.recorder.audioInput.disconnect();

        console.log("Stopped.");
        this.options.is_start = false;
        this.options.analyzer = {};
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
