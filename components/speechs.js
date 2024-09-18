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

function downloadSpeech(text) {
  var word = new SpeechSynthesisUtterance();
  word.text = text;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const destination = audioContext.createMediaStreamDestination();
  const mediaRecorder = new MediaRecorder(destination.stream);

  mediaRecorder.ondataavailable = (event) => {
    const audioBlob = event.data;
    const Url = URL.createObjectURL(audioBlob);

    const a = document.createElement("a");
    a.href = Url;
    a.download = "speech.wav"; // Specify the filename for download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(Url);
  };

  mediaRecorder.start();

  const source = audioContext.createMediaStreamSource(destination.stream);
  source.connect(audioContext.destination);

  word.onend = () => {
    mediaRecorder.stop();
  };

  window.speechSynthesis.speak(word);
}

export {
  StartSpeech,
  StopSpeech,
  downloadSpeech,
  ResumeSpeech,
  GetVoicesSpeech,
  StartOver,
};
