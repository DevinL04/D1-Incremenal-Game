import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// Add example image without overwriting body
const exampleImg = document.createElement("img");
exampleImg.src = exampleIconUrl;
exampleImg.className = "icon";

const exampleP = document.createElement("p");
exampleP.textContent = "Example image asset: ";
exampleP.appendChild(exampleImg);

document.body.appendChild(exampleP);

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

// Growth rate display
const growthDisplay = document.createElement("div");
growthDisplay.id = "growth-display";
growthDisplay.textContent = `Growth rate: ${growthRate.toFixed(2)} apples/sec`;

// Step 6–9: Upgrade data
interface Item {
  name: string;
  cost: number;
  growth: number;
  count: number;
  description: string;
  button?: HTMLButtonElement;
  costSpan?: HTMLSpanElement;
  countSpan?: HTMLSpanElement;
}

const availableItems: Item[] = [
  {
    name: "Sapling",
    cost: 10,
    growth: 0.1,
    count: 0,
    description: "A tiny apple sapling to start your orchard",
  },
  {
    name: "Apple Tree",
    cost: 100,
    growth: 2,
    count: 0,
    description: "A mature apple tree producing steady apples",
  },
  {
    name: "Orchard",
    cost: 1000,
    growth: 50,
    count: 0,
    description: "A full orchard yielding lots of apples",
  },
  //two new items
  {
    name: "Greenhouse",
    cost: 5000,
    growth: 250,
    count: 0,
    description: "A warm greenhouse to grow apples faster",
  },
  {
    name: "Automated Picker",
    cost: 20000,
    growth: 1200,
    count: 0,
    description: "Robots that harvest apples for you automatically",
  },
];

// uttons for each upgrade
const upgradesContainer = document.createElement("div");
upgradesContainer.id = "upgrades-container";

availableItems.forEach((item) => {
  const div = document.createElement("div");
  div.className = "upgrade-item";

  const button = document.createElement("button");
  button.id = `upgrade-${item.name}`;
  button.innerText = `Buy ${item.name}`;
  button.disabled = true;

  const costSpan = document.createElement("span");
  costSpan.textContent = `Cost: ${item.cost.toFixed(2)}`;

  const countSpan = document.createElement("span");
  countSpan.textContent = `  Owned: ${item.count}`;
  countSpan.style.marginLeft = "12px";

  const descriptionSpan = document.createElement("span"); // Step 10
  descriptionSpan.textContent = item.description;
  descriptionSpan.style.marginLeft = "12px";
  descriptionSpan.style.fontStyle = "italic";

  // info span to keep cost and owned separate
  const infoSpan = document.createElement("span");
  infoSpan.style.display = "inline-flex";
  infoSpan.style.gap = "12px";
  infoSpan.append(costSpan, countSpan, descriptionSpan);

  button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.growth;
      item.count++;
      // Price increases by 15% each purchas
      item.cost *= 1.15;

      updateDisplays();
    }
  });

  div.append(button, infoSpan);
  upgradesContainer.appendChild(div);

  item.button = button;
  item.costSpan = costSpan;
  item.countSpan = countSpan;
});

// Main click: increases counter manually
btn.addEventListener("click", () => {
  counter++;
  updateDisplays();
});

// Update displays
function updateDisplays() {
  counterDiv.textContent = `Harvested Apples: ${Math.floor(counter)} apples`;
  growthDisplay.textContent = `Growth rate: ${
    growthRate.toFixed(2)
  } apples/sec`;

  availableItems.forEach((item) => {
    if (item.costSpan && item.countSpan && item.button) {
      item.costSpan.textContent = `Cost: ${item.cost.toFixed(2)}`;
      item.countSpan.textContent = `Owned: ${item.count}`;
      item.button.disabled = counter < item.cost;
      item.button.style.backgroundColor = item.button.disabled
        ? "#777"
        : "#4CAF50";
      item.button.style.color = "white";
      item.button.style.padding = "8px";
      item.button.style.borderRadius = "8px";
      item.button.style.margin = "4px";
    }
  });
}

// Continuous growth (Step 4 logic preserved)
let lastTime = performance.now();
function update(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  counter += growthRate * dt;
  updateDisplays();

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

// Add elements to page
const container = document.createElement("div");
container.className = "magic-container";
container.append(lore, btn, counterDiv, growthDisplay, upgradesContainer);
document.body.appendChild(container);
