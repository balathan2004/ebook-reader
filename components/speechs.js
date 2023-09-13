function StartSpeech(data, voiceNum) {
  var voices = window.speechSynthesis.getVoices();
  var word = new SpeechSynthesisUtterance();
  word.text = data;
  word.voice = voices[voiceNum];
  window.speechSynthesis.speak(word);
}

function StopSpeech() {
  window.speechSynthesis.pause();
}

function ResumeSpeech() {
  window.speechSynthesis.resume();
}

function GetVoicesSpeech() {
  console.log(window.speechSynthesis.getVoices());
}

function StartOver() {
  window.speechSynthesis.cancel();
}
export { StartSpeech, StopSpeech, ResumeSpeech, GetVoicesSpeech, StartOver };
