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
btn.innerText = `${emoji}`;

let counter: number = 0;
let growthRate = 0;

// Counter display
const counterDiv = document.createElement("div");
counterDiv.id = "counter-display";
counterDiv.textContent = `${counter} apples`;

// Growth rate display
const growthDisplay = document.createElement("div");
growthDisplay.id = "growth-display";
growthDisplay.textContent = `Growth rate: ${growthRate.toFixed(2)} apples/sec`;

// Upgrade data
type Upgrade = {
  name: string;
  baseCost: number;
  cost: number;
  growth: number;
  count: number;
  button: HTMLButtonElement;
  costDisplay: HTMLSpanElement;
  countDisplay: HTMLSpanElement;
};

const upgrades: Upgrade[] = [
  {
    name: "A",
    baseCost: 10,
    cost: 10,
    growth: 0.1,
    count: 0,
    button: null!,
    costDisplay: null!,
    countDisplay: null!,
  },
  {
    name: "B",
    baseCost: 100,
    cost: 100,
    growth: 2.0,
    count: 0,
    button: null!,
    costDisplay: null!,
    countDisplay: null!,
  },
  {
    name: "C",
    baseCost: 1000,
    cost: 1000,
    growth: 50.0,
    count: 0,
    button: null!,
    costDisplay: null!,
    countDisplay: null!,
  },
];

// uttons for each upgrade
const upgradesContainer = document.createElement("div");
upgradesContainer.id = "upgrades-container";

upgrades.forEach((u) => {
  const div = document.createElement("div");
  div.className = "upgrade-item";

  const button = document.createElement("button");
  button.id = `upgrade-${u.name}`;
  button.innerText = `Buy Upgrade ${u.name}`;
  button.disabled = true;

  const costSpan = document.createElement("span");
  costSpan.textContent = `Cost: ${u.cost.toFixed(2)}`;

  const countSpan = document.createElement("span");
  countSpan.textContent = `  Owned: ${u.count}`;
  countSpan.style.marginLeft = "12px";

  button.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      growthRate += u.growth;
      u.count++;
      // Price increases by 15% each purchas
      u.cost *= 1.15;

      updateCounterDisplay();
      updateUpgradeButtons();
    }
  });

  u.button = button;
  u.costDisplay = costSpan;
  u.countDisplay = countSpan;

  div.append(button, costSpan, countSpan);
  upgradesContainer.appendChild(div);
});

// Main click: increases counter manually
btn.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// Update displays
function updateCounterDisplay() {
  counterDiv.textContent = `${Math.floor(counter)} apples`;
  growthDisplay.textContent = `Growth rate: ${
    growthRate.toFixed(2)
  } apples/sec`;
  upgrades.forEach((u) => {
    u.costDisplay.textContent = `Cost: ${u.cost.toFixed(2)}`;
    u.countDisplay.textContent = `Owned: ${u.count}`;
  });
}

function updateUpgradeButtons() {
  upgrades.forEach((u) => {
    u.button.disabled = counter < u.cost;
  });
}

// Continuous growth (Step 4 logic preserved)
let lastTime = performance.now();
function update(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  counter += growthRate * dt;
  updateCounterDisplay();
  updateUpgradeButtons();

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

// Add elements to page
const container = document.createElement("div");
container.className = "magic-container";
container.append(btn);
document.body.append(counterDiv, growthDisplay, upgradesContainer, container);
