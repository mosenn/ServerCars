var myHeaders = new Headers();
myHeaders.append("X-RapidAPI-Key", "7dd74cd7a2msh0e2a4735fbeda53p1be3b5jsneb3d21a5a190");
myHeaders.append("Content-Type", "application/json");

export const postQustionForChatGPT = async (url = "", question) => {
  console.log(question, "in postQustionForChatGPT function");
  try {
    const sendQuest = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: myHeaders,
      body: question,
    });
    return sendQuest.text();
  } catch (err) {
    console.log(err, "chatgpt api have a proplem");
  }
};
