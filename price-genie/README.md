# Price Genie 🧞

**Price Genie** is a simple yet powerful pricing calculator that helps entrepreneurs, freelancers, and small businesses determine fair, profitable rates for their products or services. Designed with cost-based pricing principles, Price Genie empowers you to make informed decisions based on your actual costs, expenses, and target profit margins.

> 💡 *“Take control of your pricing with logic, not guesswork.”*

---

### 🌐 Live Demo

[![Price Genie Thumbnail](https://www.thezelijah.world/_next/static/media/WA_Tools_Business_PriceGenie.11f65fde.webp)](https://www.thezelijah.world/tools/business-price-genie)

> Click the image to try the interactive pricing calculator.

---

## ✨ Features

- **Calculate ideal prices** based on costing breakdown  
- **Transparent computation logic** with per-item control  
- Built for freelancers, creatives, startups, and service providers  
- Written in **TypeScript** — fully typed, no runtime dependencies  
- Supports **fixed markup**, **profit targets**, or **manual override**  
- Modular and extensible class structure  
- Lightweight — zero dependencies  

---

##  [Full API Docs](https://www.thezelijah.word/price-genie/docs)
---

## 📦 Installation

```bash
npm install @thezelijah/price-genie
```

---

## 🛠 Usage

**Step 1: Initialize and Setup Price Genie**

### Basic Setup
```ts
import { PriceGenie, type CostingItem } from '@thezelijah/price-genie';


const genie = PriceGenie.initialize();


const sampleCostingItems: CostingItem[] = [
  {
    label: "Labor",
    description: "Skilled worker wages for assembly and packaging",
    quantity: 20,
    unit: "hrs",
    unitPrice: 250,
    amount: 5000,
    costMargin: 0.25,
    multipliers: {
      quantity: 1,
      unitPrice: 1,
    },
  },
  {
    label: "Raw Materials",
    description: "High-quality wood used for furniture production",
    quantity: 10,
    unit: "pcs",
    unitPrice: 750,
    amount: 7500,
    costMargin: 0.2,
    multipliers: {
      quantity: 1,
      unitPrice: 1,
    },
  },
  {
    label: "Logistics",
    description: "Delivery and transportation of finished goods",
    quantity: 2,
    unit: "trips",
    unitPrice: 1200,
    amount: 2400,
    costMargin: 0.15,
    multipliers: {
      quantity: 1,
      unitPrice: 1,
    },
  },
  {
    label: "Packaging",
    description: "Custom printed boxes and wrapping materials",
    quantity: 100,
    unit: "sets",
    unitPrice: 35,
    amount: 3500,
    costMargin: 0.1,
    multipliers: {
      quantity: 1,
      unitPrice: 1,
    },
  },
];


// Set Name
let updatedInstance = genie.setItemName("My Product")
.setItemDescription("A new product to add")
.setBasePrice(parseFloat("12345.50"))
.setTotalSupply(parseInt("100"))
.setListCostingBreakdown(sampleCostingItems);
```

### Helper: Clear all costing items breakdown
```ts
// Clear and empty List of Items included in the costing breakdown
let updatedInstance = genie.clearListCostingBreakdown();
```

### Helper: Get the most expensive item from the costing breakdown
```ts
// Returns the most expensive item from the costing breakdown
const mostExpensiveItem = genie.getMostExpensiveCostItem();

```


---

## 🎛️ Step 2: Simulation Mode & Slider Implementation

PriceGenie allows you to **simulate pricing strategies** without affecting your original data. You can plug these into a visual UI using sliders for dynamic experimentation.

### 🔄 2.1 Toggle Simulation Mode

Enable or disable simulation mode for visual controls like sliders:

```ts
const handleToggleSimulationMode = (bool: boolean) => {
const updatedInstance = genie.toggleSimulation(bool);
 setGenieInstance(updatedInstance);
};
```

When enabled, simulated values (e.g., quantity, unit price) override base values only in calculations and UI, not in stored data.

---

### 🎚️ 2.2 Update Simulation Multipliers via Sliders

Each of these methods updates simulated multipliers that affect pricing computation in real time:

#### 🔢 Cost Item Quantity

```ts
const handleSimDataQuantity = (multiplier: number, index?: number) => {
  if (!!genie && index !== undefined) {
    const updatedInstance = genie.updateCostItemQuantityMultiplier(index, multiplier);
    setGenieInstance(updatedInstance);
 
  }
};
```

#### 💰 Cost Item Unit Price

```ts
const handleSimDataUnitPrice = (multiplier: number, index?: number) => {
  if (!!genie && index !== undefined) {
    const updatedInstance = genie.updateCostItemUnitPriceMultiplier(index, multiplier);
    setGenieInstance(updatedInstance);
  }
};
```

#### 📦 Global Total Supply

```ts
const handleSimDataTotalSupply = (multiplier: number) => {
  if (!!genie) {
    const updatedInstance = genie.updateTotalSupplyMultiplier(multiplier);
    setGenieInstance(updatedInstance);
  }
};
```

#### 🏷️ Global SRP (Suggested Retail Price)

```ts
const handleSimDataSRP = (multiplier: number) => {
  if (!!genie) {
    const updatedInstance = genie.updateSRPMultiplier(multiplier);
    setGenieInstance(updatedInstance);
  }
};
```



---

### 🧠 Use Cases

- Freelancers quoting custom projects
- Product makers computing ideal selling price
- Startups experimenting with cost inputs
- Visual apps needing real-time pricing logic

---

## 🚧 Coming Soon

- **CAPEX / OPEX breakdown support**  
- **Tax-aware calculations** (e.g., VAT, withholding)  

These features are **not yet available** in the current release but are in active development.

---

## 📁 Project Structure

```
.
├── src/               # Source TypeScript file
├── dist/              # Build output (generated)
├── demo/              # Optional usage demo (ignored in build)
├── README.md
├── package.json
└── tsconfig.json
```

> 📌 The `/demo` folder contains illustrative `.tsx` usage examples. It is excluded from the npm package and TypeScript build.

---


## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome! Feel free to fork and open a pull request.

---

## 🧾 License

[ISC](LICENSE) — free for personal and commercial use.

---

## 🔗 Author

Made with 💙 by [@thezelijah](https://github.com/thezelijah)


## About the Developer

- **Developer**: Josef Elijah Fabian  
- **GitHub**: [https://github.com/jedlsf](https://github.com/jedlsf)  
- **Project Repository**: [https://github.com/jedlsf/thezelijah-world](https://github.com/jedlsf/thezelijah-world)  

---

## Contact

- **Business Email**: [business@thezelijah.world](mailto:business@thezelijah.world)  
- **Official Website**: [https://www.thezelijah.world](https://www.thezelijah.world)  

---
