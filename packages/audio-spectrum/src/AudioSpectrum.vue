<template>
  <div class="audio-spectrum">
    <canvas
      ref="canvas"
      :style="{
        width: options.width + 'px',
        height: options.height + 'px'
      }"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: "AudioSpectrum",
  props: {
    options: {
      type: Object,
      default: () => ({
        is_start: false,
        analyzer: {},
        width: 200,
        height: 50,
        colors: {
          up: [
            { pos: 0.0, clr: "#ccc" },
            { pos: 0.5, clr: "#069" },
            { pos: 1.0, clr: "#f6f" }
          ],
          down: [
            { pos: 0.0, clr: "#ccc" },
            { pos: 0.5, clr: "#069" },
            { pos: 1.0, clr: "#f6f" }
          ]
        }
      })
    }
  },
  computed: {
    is_start() {
      return this.options.is_start;
    }
  },
  watch: {
    is_start(flag) {
      if (flag) {
        this.Spectrum(this.options.colors);
      }
    }
  },
  methods: {
    Spectrum(colors) {
      if (!this.options.analyzer) return;

      const canvas = this.$refs["canvas"];
      const analyzer = this.options.analyzer;

      const ctx = canvas.getContext("2d");
      canvas.width = this.options.width * 2;
      canvas.height = this.options.height * 4;
      const oW = canvas.width;
      const oH = canvas.height;
      const color1 = ctx.createLinearGradient(
        oW / 2,
        oH / 2 - 30,
        oW / 2,
        oH / 2 - 100
      );
      const color2 = ctx.createLinearGradient(
        oW / 2,
        oH / 2 + 30,
        oW / 2,
        oH / 2 + 100
      );

      colors.up.forEach(item => {
        color1.addColorStop(item.pos, item.clr);
      });

      colors.down.forEach(item => {
        color2.addColorStop(item.pos, item.clr);
      });

      const count = oW / 4;
      const voiceHeight = new Uint8Array(analyzer.frequencyBinCount);

      (function draw() {
        analyzer.getByteFrequencyData(voiceHeight);
        const step = Math.round(voiceHeight.length / count);
        ctx.clearRect(0, 0, oW, oH);
        for (let i = 0; i < count; i++) {
          const audioHeight = voiceHeight[step * i];
          ctx.fillStyle = color1;
          ctx.fillRect(oW / 2 + i * 10, oH / 2, 7, -audioHeight);
          ctx.fillRect(oW / 2 - i * 10, oH / 2, 7, -audioHeight);
          ctx.fillStyle = color2;
          ctx.fillRect(oW / 2 + i * 10, oH / 2, 7, audioHeight);
          ctx.fillRect(oW / 2 - i * 10, oH / 2, 7, audioHeight);
        }
        window.requestAnimationFrame(draw);
      })();
    }
  }
};
</script>
