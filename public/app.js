document.addEventListener("DOMContentLoaded", () => {

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const button = document.getElementById("send-btn");

function addMessage(text, sender) {
const div = document.createElement("div");
div.classList.add("message", sender);
div.textContent = text;
chatBox.appendChild(div);
chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
const text = input.value.trim();
if (!text) return;

addMessage(text, "user");
input.value = "";

try {
const res = await fetch("/api/agent", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ prompt: text }),
});


const data = await res.json();
addMessage(data.response, "bot");
playCharacterAnimation();

} catch (err) {
addMessage("Error talking to server", "bot");
console.error("📱error after trying to POSR a message from user:",err);
}
}

button.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
if (e.key === "Enter") {
sendMessage();
}
});

});