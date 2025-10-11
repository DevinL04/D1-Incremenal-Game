import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

/* --- existing content --- */
document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// Step 1: Button
const emoji = "🍎";
const btn = document.createElement("button");

btn.id = "magic-button";
btn.type = "button";
btn.innerText = `${emoji}`; // emoji inside the button

// Step 2: Counter
let counter: number = 0;
const counterDiv = document.createElement("div");
counterDiv.id = "counter-display";
counterDiv.textContent = `${counter} apples`;

// When the button is clicked the counter increases
btn.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter} apples`; // update the number of apples displayed
});

// Step 3: Auto clicking every second
setInterval(() => {
  counter++; //+1
  counterDiv.textContent = `${counter} apples`;
}, 1000); // 1000ms == 1s

//Add to the page
const container = document.createElement("div");
container.className = "magic-container";
container.appendChild(btn);
document.body.appendChild(container);
document.body.appendChild(counterDiv);
