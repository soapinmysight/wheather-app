// const userId = crypto.randomUUID();

// // helper function for chat UI
// function addMessage(role, text) {
//     const chatLog = document.getElementById("chat_log");

//     const messageDiv = document.createElement("div");
//     messageDiv.classList.add("message", role);

//     chatLog.appendChild(messageDiv);

//     chatLog.scrollTop = chatLog.scrollHeight;
// }

// //doe een post request met fetch naar "/api/agent" met een prompt in de body en log de response
// async function sendPrompt() {
//     button.classList.add("loading") //add a loading class to the button to show that it's loading
//     button.innerText = "Loading..." //change the button text to show that it's loading
//     const prompt = document.getElementById("prompt_field").value //get the value of the input field with id "prompt_field"
//     console.log("Sending prompt:", prompt) //log the prompt for debugging
//     const response = await fetch("/api/agent", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//    body: JSON.stringify({ prompt }),
//     })
//     const result = await response.json() //parse the response as json
//     console.log("This is the response:", result) //log the response from the server

//     console.log("Tokens used:", result.tokens); //log the total tokens used for the request

//         // document.getElementById("response").innerHTML = result.airesponse //display the response in the HTML element with id "response"
//         document.getElementById("tokens").innerHTML = result.tokens //display the response in the HTML element with id "response"

// button.classList.remove("loading") //remove the loading class from the button
// button.innerText = "Generate" //change the button text back to the original text
// }

// const button = document.getElementById("generate_button")
// button.addEventListener("click", async (e) => {
//     e.preventDefault()
//     await sendPrompt()
// })
