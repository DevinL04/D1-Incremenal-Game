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
btn.style.fontSize = "48px";
btn.style.width = "120px";
btn.style.height = "120px";
btn.style.borderRadius = "50%";
btn.style.backgroundColor = "#e63946";
btn.style.border = "4px solid #6a994e";
btn.style.color = "white";
btn.style.cursor = "pointer";

let counter: number = 0;
let growthRate = 0;

// Counter display
const counterDiv = document.createElement("div");
counterDiv.id = "counter-display";
counterDiv.textContent = `${counter} apples`;

//Theme of game
const lore = document.createElement("p");
lore.textContent =
  "Welcome to the Apple Orchard! Plant saplings, grow trees, and expand your orchard to harvest more apples!";
//document.body.insertBefore(lore, counterDiv);

// Growth rate display
const growthDisplay = document.createElement("div");
growthDisplay.id = "growth-display";
growthDisplay.textContent = `Growth rate: ${growthRate.toFixed(2)} apples/sec`;

// Upgrade data
type Upgrade = {
  name: string;
  themedName: string;
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
    themedName: "Sapling",
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
    themedName: "Apple Tree",
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
    themedName: "Orchard",
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
  button.innerText = `Buy ${u.themedName}`;
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

  //div.append(button, costSpan, countSpan);
  const infoSpan = document.createElement("span");
  infoSpan.style.display = "inline-flex";
  infoSpan.style.gap = "12px";
  infoSpan.append(costSpan, countSpan);

  div.append(button, infoSpan);

  upgradesContainer.appendChild(div);
});

// Main click: increases counter manually
btn.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// Update displays
function updateCounterDisplay() {
  counterDiv.textContent = `Harvested Apples: ${Math.floor(counter)} apples`;
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
    u.button.style.backgroundColor = u.button.disabled ? "#777" : "#4CAF50";
    u.button.style.color = "white";
    u.button.style.padding = "8px";
    u.button.style.borderRadius = "8px";
    u.button.style.margin = "4px";
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
container.append(lore, btn, counterDiv, growthDisplay, upgradesContainer);
document.body.appendChild(container);
