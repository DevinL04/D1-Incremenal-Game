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
// Step 5:
let growthRate = 0;
// When the button is clicked the counter increases
btn.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter} apples`; // update the number of apples displayed
});

// Step 3: Auto clicking every second
/*
setInterval(() => {
  counter++; //+1
  counterDiv.textContent = `${counter} apples`;
}, 1000); // 1000ms == 1s
*/

//Step 5: Upgrade
const upgradeBtn = document.createElement("button");
upgradeBtn.id = "upgrade-button";
upgradeBtn.type = "button";
upgradeBtn.innerText = "Buy Upgrade for 10 🍎's ";
upgradeBtn.disabled = true; // not enabled till they can afford it

upgradeBtn.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1; // increses auto growth rate

    updateCounterDisplay();
    updateUpgradeButton();
  }
});

// function that updates counter display
function updateCounterDisplay() {
  counterDiv.textContent = `${Math.floor(counter)} apples`;
}

// function that enables & disables the upgrade button
function updateUpgradeButton() {
  upgradeBtn.disabled = counter < 10;
}
// Step 4: Continuous growth with requestAnimationFrame
let lastTime = performance.now();

function update(time: number) {
  const dt = (time - lastTime) / 1000; //delta time inseconds
  lastTime = time;

  // +1 per second, but scaled by dt
  counter += growthRate * dt;
  //Updating the display
  updateCounterDisplay();
  updateUpgradeButton(); // enables and disables basned on counter

  requestAnimationFrame(update); // schedules the next fram
}
// start animation loop
requestAnimationFrame(update);

//Add to the page
const container = document.createElement("div");
container.className = "magic-container";
container.appendChild(btn);
document.body.appendChild(counterDiv);
container.appendChild(upgradeBtn);
document.body.appendChild(container);
