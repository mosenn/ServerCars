import { useEffect, useState } from "react";
import "./App.css";
import Speech from "react-speech";
import { useSpeechRecognition } from "react-speech-kit";
import { postQustionForChatGPT } from "./services/chatGPTApi/chatapi";
function App() {
  const [newMethod, SetnewMethod] = useState({});

  // console.log(textarea);
  const [value, setValue] = useState("");
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
  console.log(value, "in 19 line code ");
  //* is new method with window function.
  const sendDataToApi = async () => {
    console.log(value, "sound value");

    console.log(newMethod, "be fore set");
    await postQustionForChatGPT(
      // "https://you-chat-gpt.p.rapidapi.com/",
      JSON.stringify({
        question: value,

        max_response_time: 30,
      })
    ).then((data) =>
      console.log(data, SetnewMethod(JSON.parse(data)))
    );

    console.log(newMethod.answer, "after then");
  };

  // console.log(newMethod.answer, "out side fucntion");
  useEffect(() => {
    sendDataToApi();
  }, [value]);
  const msg = new SpeechSynthesisUtterance();
  console.log(msg, "SpeechSynthesisUtterance");
  msg.text = newMethod.answer;
  console.log(window.speechSynthesis , 'speechSynthesis');
  const readTextWithSpeechSy = () => {
    window.speechSynthesis.speak(msg);
  };
  return (
    <div className="App">
      {/* this read result chatGPT
      <form action="">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => {
            getTextFromTextArea(e);
          }}
        />
        <Speech
          className="btn-readText"
          text={textarea ? textarea : ""}
          voice="Google UK English Female"
        />
      </form> */}
      {/* this most go to chatgpt api */}
      <div>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button onMouseDown={listen} onMouseUp={stop}>
          🎤
        </button>
      </div>
      {/* new method this like speech  */}
      <div className="ReadDataFromChatGPT">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={newMethod.answer}
          // onChange={(e) => {
          //   SetnewMethod(e.target.value);
          // }}
        ></textarea>
        <button
          onClick={(e) => {
            readTextWithSpeechSy(e);
          }}
        >
          Click for Read Text speechSynthesis
        </button>
      </div>
    </div>
  );
}

export default App;
