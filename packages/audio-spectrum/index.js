import AudioSpectrum from "./src/AudioSpectrum.vue";

AudioSpectrum.install = function(Vue) {
  Vue.component(AudioSpectrum.name, AudioSpectrum);
};

export default AudioSpectrum;
