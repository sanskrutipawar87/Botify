const API_KEY = "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"

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + `${API_KEY}`);
myHeaders.append("Cookie", "__cf_bm=WnFoGNBqrngzvuLfX8mdtlJVffBQ0rtsAJc2n0NN3y0-1709014306-1.0-Ad8MIIBvOXcIvJORqBh7xDndNCj1cmJiQWPF52Gg7EWfm6J2Qeeh9BdBUetjb0RE1BLg5M5n0EUKgxnn4RVmNww=; _cfuvid=3I9CQ_7qQXpBh2hHebeXG_d9eLGdQ6XQ7mcZDwn0h9E-1709014306331-0.0-604800000");

const form = document.getElementById("myForm");
const userMessageInput = document.getElementById("userMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const userMessage = userMessageInput.value;

  const raw = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
      { "role": "user", "content": userMessage }
    ]
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const parsedData = JSON.parse(result);
      console.log(parsedData);
      const responseText = parsedData.choices[0].message.content;

      // Create outgoing message element
      const outgoingMessage = document.createElement("li");
      outgoingMessage.classList.add("chat", "outgoing");
      outgoingMessage.innerHTML = `<p>${userMessage}</p>`;
      document.querySelector(".chatbox").appendChild(outgoingMessage);

      // Create incoming message element
      const incomingMessage = document.createElement("li");
      incomingMessage.classList.add("chat", "incoming");
      incomingMessage.innerHTML = `<span class="incoming bi bi-robot"></span><p>${responseText}</p>`;
      document.querySelector(".chatbox").appendChild(incomingMessage);

      // Clear user message input for next interaction
      userMessageInput.value = "";

      console.log("Incomming Message : " + responseText);
      console.log("Outgoing Message : " + userMessage);
    })
    .catch((error) => console.error(error));
});
