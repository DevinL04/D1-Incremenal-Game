import "./style.css";

// --- Tooltip ---
const tooltip = document.createElement("div");
tooltip.id = "tooltip";
tooltip.textContent = "Click to harvest apples";
tooltip.style.position = "absolute";
tooltip.style.padding = "6px 10px";
tooltip.style.background = "black";
tooltip.style.color = "white";
tooltip.style.borderRadius = "6px";
tooltip.style.fontSize = "14px";
tooltip.style.pointerEvents = "none";
tooltip.style.visibility = "hidden";
tooltip.style.zIndex = "1000";
document.body.appendChild(tooltip);

// --- Harvest Button ---
const emoji = "🍎";
const harvestButton = document.createElement("button");
harvestButton.id = "magic-button";
harvestButton.type = "button";
harvestButton.innerText = `${emoji}`;
harvestButton.classList.add("harvest-button"); // CSS class for styles

// --- Game State ---
let counter: number = 0;
let growthRate = 0;

// --- UI Elements ---
const counterDiv = document.createElement("div");
counterDiv.id = "counter-display";
counterDiv.textContent = `${counter} apples`;

const lore = document.createElement("p");
lore.textContent =
  "Welcome to the Apple Orchard! Plant saplings, grow trees, and expand your orchard to harvest more apples!";

const growthDisplay = document.createElement("div");
growthDisplay.id = "growth-display";
growthDisplay.textContent = `Growth rate: ${growthRate.toFixed(2)} apples/sec`;

// --- Upgrade Data ---
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

// --- Upgrades Container ---
const upgradesContainer = document.createElement("div");
upgradesContainer.id = "upgrades-container";

availableItems.forEach((item) => {
  const div = document.createElement("div");
  div.className = "upgrade-item";

  const button = document.createElement("button");
  button.id = `upgrade-${item.name}`;
  button.innerText = `Buy ${item.name}`;
  button.disabled = true;
  button.classList.add("upgrade-button");

  const costSpan = document.createElement("span");
  costSpan.textContent = `Cost: ${item.cost.toFixed(2)}`;

  const countSpan = document.createElement("span");
  countSpan.textContent = `  Owned: ${item.count}`;
  countSpan.style.marginLeft = "12px";

  const descriptionSpan = document.createElement("span");
  descriptionSpan.textContent = item.description;
  descriptionSpan.style.marginLeft = "12px";
  descriptionSpan.style.fontStyle = "italic";

  const infoSpan = document.createElement("span");
  infoSpan.style.display = "inline-flex";
  infoSpan.style.gap = "12px";
  infoSpan.append(costSpan, countSpan, descriptionSpan);

  button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.growth;
      item.count++;
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

// --- Harvest Button Click ---
harvestButton.addEventListener("click", () => {
  counter++;
  updateDisplays();

  harvestButton.style.transform = "scale(1.2)";
  setTimeout(() => {
    harvestButton.style.transform = "scale(1)";
  }, 120);
});

// --- Update Displays ---
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
    }
  });
}

// --- Continuous Growth ---
let lastTime = performance.now();
function gameLoop(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  counter += growthRate * dt;
  updateDisplays();

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// --- Tooltip Events ---
harvestButton.addEventListener("mouseenter", () => {
  tooltip.style.visibility = "visible";
});
harvestButton.addEventListener("mousemove", (e) => {
  tooltip.style.left = `${e.pageX + 12}px`;
  tooltip.style.top = `${e.pageY + 12}px`;
});
harvestButton.addEventListener("mouseleave", () => {
  tooltip.style.visibility = "hidden";
});

// --- Append Elements ---
const container = document.createElement("div");
container.className = "magic-container";
container.append(
  lore,
  harvestButton,
  counterDiv,
  growthDisplay,
  upgradesContainer,
);
document.body.appendChild(container);
