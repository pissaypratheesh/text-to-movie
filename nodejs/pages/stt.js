import { useWhisper } from '../libs/use-whisper/srcjs/index'

const App = () => {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: "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"//process.env.OPENAI_API_TOKEN, // YOUR_OPEN_AI_TOKEN
  })

  return (
    <div>
      <p>Recording: {recording}</p>
      <p>Speaking: {speaking}</p>
      <p>Transcribing: {transcribing}</p>
      <p>Transcribed Text: {transcript.text}</p>
      <button onClick={() => startRecording()}>Start</button>
      <button onClick={() => pauseRecording()}>Pause</button>
      <button onClick={() => stopRecording()}>Stop</button>
    </div>
  )
}

/* import { useWhisper } from '@chengsokdara/use-whisper'

const App = () => {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: "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"//process.env.OPENAI_API_TOKEN, // YOUR_OPEN_AI_TOKEN
})

  return (
    <div>
      <p>Recording: {recording}</p>
      <p>Speaking: {speaking}</p>
      <p>Transcribing: {transcribing}</p>
      <p>Transcribed Text: {transcript.text}</p>
      <button onClick={() => startRecording()}>Start</button>
      <button onClick={() => pauseRecording()}>Pause</button>
      <button onClick={() => stopRecording()}>Stop</button>
    </div>
  )
}
 */


export default App;