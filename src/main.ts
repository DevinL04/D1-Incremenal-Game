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

// Step 5: Growth rate
let growthRate = 0;

// When the button is clicked, the counter increases
btn.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  updateUpgradeButtons();
});

// Step 6: Multiple upgrades
type Upgrade = {
  name: string;
  cost: number;
  rate: number;
  button: HTMLButtonElement;
};

// The upgrades
const upgrades: Upgrade[] = [
  { name: "A", cost: 10, rate: 0.1, button: document.createElement("button") },
  { name: "B", cost: 100, rate: 2.0, button: document.createElement("button") },
  { name: "C", cost: 1000, rate: 50, button: document.createElement("button") },
];

// upgrade buttons
for (const upgrade of upgrades) {
  upgrade.button.type = "button";
  upgrade.button.id = `upgrade-${upgrade.name}`;
  upgrade.button.innerText = `Buy Upgrade ${upgrade.name} for ${upgrade.cost} 🍎 (+${upgrade.rate}/sec)`;
  upgrade.button.disabled = true;
  upgrade.button.style.margin = "4px";
  upgrade.button.style.padding = "8px";
  upgrade.button.style.borderRadius = "8px";

  // Click behavior
  upgrade.button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.rate;

      updateCounterDisplay();
      updateUpgradeButtons();
    }
  });
}

// Function: update upgrade buttons 
function updateUpgradeButtons() {
  for (const upgrade of upgrades) {
    if (counter < upgrade.cost) {
      upgrade.button.disabled = true;
      upgrade.button.style.backgroundColor = "#777"; 
      upgrade.button.style.color = "white";
    } else {
      upgrade.button.disabled = false;
      upgrade.button.style.backgroundColor = "#4CAF50"; 
      upgrade.button.style.color = "white";
    }
  }
}

// Function: update counter display
function updateCounterDisplay() {
  counterDiv.textContent = `${Math.floor(counter)} apples`;
}

// Step 4: Continuous growth
let lastTime = performance.now();

function update(time: number) {
  const dt = (time - lastTime) / 1000; // delta time in seconds
  lastTime = time;

  counter += growthRate * dt;
  updateCounterDisplay();
  updateUpgradeButtons();

  requestAnimationFrame(update); // next frame
}

// Start animation loop
requestAnimationFrame(update);

// Add everything to the page
const container = document.createElement("div");
container.className = "magic-container";
container.appendChild(btn);
document.body.appendChild(counterDiv);

for (const upgrade of upgrades) {
  container.appendChild(upgrade.button);
}

document.body.appendChild(container);

