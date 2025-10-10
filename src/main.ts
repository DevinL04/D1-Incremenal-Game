import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

/* --- existing content --- */
document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

/* --- new: create a button entirely from TypeScript --- */
const emoji = "🍎"; // fun emoji (not a cookie)
const btn = document.createElement("button");

btn.id = "magic-button";
btn.type = "button";
btn.innerText = `${emoji}`; // emoji inside the button

// append the button and message to the page (no HTML edit)
const container = document.createElement("div");
container.className = "magic-container";
container.appendChild(btn);
document.body.appendChild(container);
