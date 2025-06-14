"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceGenie = exports.ItemType = exports.ProfitLevel = exports.CAPEXType = exports.OPEXType = exports.PricingType = void 0;
exports.parseCostingItemForGemini = parseCostingItemForGemini;
exports.formatPercentage = formatPercentage;
exports.formatAmountCurrency = formatAmountCurrency;
/**
 * Defines the different types of pricing models available.
 */
var PricingType;
(function (PricingType) {
    /**
     * A flat, one-time price regardless of the unit quantity or size.
     * Example: PHP 9,999 for a disinfection session, irrespective of the area size.
     */
    PricingType["FIXED"] = "Fixed";
    /**
     * Pricing based on the quantity of units multiplied by the unit price.
     * Example:
     * - If the unit price is PHP 50 per square meter and the unit quantity is 30 sqm, the total price is PHP 1,500.
     */
    PricingType["PER_UNIT"] = "Per Unit";
    /**
     * Pricing with a base price for an initial quantity, followed by an additional unit price for any excess.
     * Example:
     * - Base price: PHP 100 for the first 30 sqm.
     * - Unit price: PHP 50 for every sqm beyond 30 sqm.
     * - If the area is 50 sqm, the total price is PHP 100 + (20 * PHP 50) = PHP 1,100.
     *
     * The difference from PER_UNIT is that the base price acts as a minimum starting cost,
     * and additional charges apply only for quantities exceeding the base threshold.
     */
    PricingType["PER_UNIT_BASE"] = "Base plus Per Unit";
})(PricingType || (exports.PricingType = PricingType = {}));
var OPEXType;
(function (OPEXType) {
    // Personnel Costs
    OPEXType["SALARIES_AND_WAGES"] = "Salaries and Wages";
    OPEXType["EMPLOYEE_BENEFITS"] = "Employee Benefits";
    OPEXType["STAFF_TRAINING_AND_DEVELOPMENT"] = "Staff Training and Development";
    OPEXType["RECRUITMENT_EXPENSES"] = "Recruitment Expenses";
    // Occupancy Costs
    OPEXType["RENT"] = "Rent";
    OPEXType["UTILITIES"] = "Utilities";
    OPEXType["PROPERTY_TAXES"] = "Property Taxes";
    OPEXType["BUILDING_MAINTENANCE"] = "Building Maintenance and Repairs";
    // Administrative Expenses
    OPEXType["OFFICE_SUPPLIES"] = "Office Supplies";
    OPEXType["POSTAGE_AND_DELIVERY"] = "Postage and Delivery";
    OPEXType["BANK_CHARGES"] = "Bank Charges";
    OPEXType["LEGAL_FEES"] = "Legal and Professional Fees";
    OPEXType["INSURANCE"] = "Insurance";
    OPEXType["SUBSCRIPTIONS_AND_DUES"] = "Subscriptions and Memberships";
    // Sales & Marketing
    OPEXType["ADVERTISING"] = "Advertising and Promotion";
    OPEXType["COMMISSIONS"] = "Sales Commissions";
    OPEXType["MARKETING_EVENTS"] = "Marketing Events and Sponsorships";
    OPEXType["CUSTOMER_RELATIONS"] = "Customer Service and Loyalty Programs";
    // IT & Communication
    OPEXType["SOFTWARE_SUBSCRIPTIONS"] = "Software Subscriptions (SaaS)";
    OPEXType["IT_SERVICES"] = "IT Support and Maintenance";
    OPEXType["INTERNET_AND_COMMUNICATIONS"] = "Internet and Communication Costs";
    OPEXType["CLOUD_SERVICES"] = "Cloud Hosting and Services";
    // Travel & Transportation
    OPEXType["TRAVEL_EXPENSES"] = "Travel Expenses";
    OPEXType["VEHICLE_EXPENSES"] = "Company Vehicle Costs";
    OPEXType["TRANSPORTATION_ALLOWANCES"] = "Transportation Allowances";
    // Production/Operations
    OPEXType["RAW_MATERIALS"] = "Raw Materials (non-inventory)";
    OPEXType["SUPPLIES_AND_CONSUMABLES"] = "Operational Supplies and Consumables";
    OPEXType["EQUIPMENT_RENTAL"] = "Equipment Rental and Leasing";
    OPEXType["QUALITY_CONTROL"] = "Quality Control and Testing";
    // Outsourced Services
    OPEXType["CONTRACTOR_FEES"] = "Contractor and Freelancer Fees";
    OPEXType["OUTSOURCED_SERVICES"] = "Outsourced Business Services";
    OPEXType["SECURITY_SERVICES"] = "Security Services";
    OPEXType["CLEANING_SERVICES"] = "Cleaning and Janitorial Services";
    // Depreciation & Amortization
    OPEXType["DEPRECIATION_EXPENSE"] = "Depreciation";
    OPEXType["AMORTIZATION_EXPENSE"] = "Amortization";
    // Taxes (non-income)
    OPEXType["BUSINESS_PERMITS_AND_FEES"] = "Business Permits and Licenses";
    OPEXType["LOCAL_TAXES"] = "Local Business Taxes";
    OPEXType["BIR_COMPLIANCE_FEES"] = "BIR Filing and Penalty Fees";
    // Miscellaneous
    OPEXType["ENTERTAINMENT"] = "Business Entertainment";
    OPEXType["DONATIONS"] = "Donations and CSR";
    OPEXType["CONTINGENCY_EXPENSES"] = "Contingency and Unexpected Costs";
    OPEXType["MISCELLANEOUS"] = "Miscellaneous";
})(OPEXType || (exports.OPEXType = OPEXType = {}));
var CAPEXType;
(function (CAPEXType) {
    // Land & Buildings
    CAPEXType["LAND_PURCHASE"] = "Land Purchase";
    CAPEXType["LAND_IMPROVEMENTS"] = "Land Improvements";
    CAPEXType["BUILDING_CONSTRUCTION"] = "Building Construction";
    CAPEXType["BUILDING_IMPROVEMENTS"] = "Building Renovation or Expansion";
    CAPEXType["LEASEHOLD_IMPROVEMENTS"] = "Leasehold Improvements";
    // Furniture, Fixtures & Equipment (FF&E)
    CAPEXType["OFFICE_FURNITURE"] = "Office Furniture";
    CAPEXType["FIXTURES"] = "Fixtures and Built-ins";
    CAPEXType["SPECIALIZED_EQUIPMENT"] = "Specialized Equipment";
    CAPEXType["TOOLS_AND_MACHINERY"] = "Tools and Machinery";
    // Technology & Infrastructure
    CAPEXType["COMPUTER_HARDWARE"] = "Computer Hardware";
    CAPEXType["NETWORK_INFRASTRUCTURE"] = "Network Infrastructure";
    CAPEXType["SECURITY_SYSTEMS"] = "Security Systems and CCTV";
    CAPEXType["TELECOMMUNICATION_EQUIPMENT"] = "Telecommunication Equipment";
    CAPEXType["DATA_CENTER_EQUIPMENT"] = "Data Center and Server Equipment";
    // Vehicles
    CAPEXType["COMPANY_VEHICLES"] = "Company Vehicles";
    CAPEXType["DELIVERY_VEHICLES"] = "Delivery or Service Vehicles";
    CAPEXType["HEAVY_EQUIPMENT"] = "Heavy Equipment (e.g., forklifts, loaders)";
    // Intangible Assets
    CAPEXType["SOFTWARE_LICENSES"] = "Software Licenses (Perpetual)";
    CAPEXType["PATENTS_AND_TRADEMARKS"] = "Patents and Trademarks";
    CAPEXType["BRANDING_AND_IP"] = "Brand Development and Intellectual Property";
    CAPEXType["WEBSITE_DEVELOPMENT"] = "Capitalized Website or Platform Development";
    // Construction & Development
    CAPEXType["CONSTRUCTION_IN_PROGRESS"] = "Construction in Progress";
    CAPEXType["ARCHITECTURE_AND_ENGINEERING"] = "Architecture and Engineering Fees";
    CAPEXType["PERMITS_AND_FEES"] = "Construction Permits and Government Fees";
    CAPEXType["SITE_PREPARATION"] = "Site Preparation and Excavation";
    // Lease & Acquisition Costs
    CAPEXType["ASSET_ACQUISITION_FEES"] = "Asset Acquisition Costs";
    CAPEXType["LEGAL_FEES_FOR_CAPEX"] = "Legal Fees for Asset Acquisition";
    CAPEXType["DUE_DILIGENCE_COSTS"] = "Due Diligence and Surveys";
    // Environmental & Safety
    CAPEXType["ENERGY_SYSTEMS"] = "Renewable Energy Systems (e.g., Solar Panels)";
    CAPEXType["FIRE_PROTECTION_SYSTEMS"] = "Fire Protection and Emergency Systems";
    CAPEXType["WASTE_MANAGEMENT_SYSTEMS"] = "Waste and Water Treatment Systems";
    // Other Capitalized Assets
    CAPEXType["R_AND_D_EQUIPMENT"] = "R&D Equipment and Lab Instruments";
    CAPEXType["LIBRARY_COLLECTIONS"] = "Capitalized Library or Media Collections";
    CAPEXType["LEARNING_AND_TRAINING_ASSETS"] = "Training Infrastructure and Simulators";
    // Miscellaneous
    CAPEXType["CAPITALIZED_INTEREST"] = "Capitalized Interest";
    CAPEXType["CONTINGENCY_RESERVES"] = "Contingency Reserves for Capex";
    CAPEXType["OTHER_CAPITAL_EXPENSES"] = "Other Capital Expenditures";
})(CAPEXType || (exports.CAPEXType = CAPEXType = {}));
/**
 * Enum representing different profit margin strategies.
 */
var ProfitLevel;
(function (ProfitLevel) {
    ProfitLevel["BARE_MINIMUM"] = "Bare Minimum";
    ProfitLevel["STANDARD"] = "Standard";
    ProfitLevel["FAIR_ENOUGH"] = "Fair Enough";
    ProfitLevel["HIGH_DEMAND"] = "High Demand";
    ProfitLevel["RISKY"] = "Risky";
    ProfitLevel["CAPITALIST"] = "Capitalist";
    ProfitLevel["CUSTOM"] = "Custom"; // Custom percentage
})(ProfitLevel || (exports.ProfitLevel = ProfitLevel = {}));
/**
 * Enum to distinguish whether an item is a tangible product or a service.
 */
var ItemType;
(function (ItemType) {
    ItemType["PRODUCT"] = "Product";
    ItemType["SERVICE"] = "Service";
})(ItemType || (exports.ItemType = ItemType = {}));
/**
 * A class that encapsulates a generated pricing profile and all associated metadata.
 */
class PriceGenie {
    /**
     * Constructs a new instance of the PriceGenie class.
     *
     * @param id - A unique identifier string for the instance (optional).
     * @param metadata - Full item metadata object containing all pricing and breakdown data.
     * @param timestamp - Optional ISO 8601 timestamp. If not provided, current date can be used.
     */
    constructor(id, metadata, timestamp) {
        this.id = id || autogenerateID(metadata?.name || "price-genie");
        this.timestamp = timestamp || new Date().toISOString();
        this.metadata = metadata || {
            name: "My Product",
            description: "A new product",
            image: null,
            category: "Other",
            type: ItemType.PRODUCT,
            isSimulating: false,
            isGenieMagic: false,
            company: {
                name: "The Zelijah World",
                description: null,
                image: null,
                address: null
            },
            breakdown: {
                opex: {
                    items: [],
                    totalAmount: 0,
                },
                capex: {
                    items: [],
                    totalAmount: 0
                },
                income: {
                    income: {
                        gross: 0,
                        net: 0
                    },
                    profit: {
                        gross: 0,
                        net: 0
                    },
                    profitMargin: 0
                },
                costing: {
                    items: [],
                    totalAmount: 0,
                    totalSupply: 1,
                }
            },
            pricing: {
                type: PricingType.FIXED,
                unitQuantity: 1,
                unit: null,
                unitPrice: 0,
                basePrice: 0,
                profitLevel: ProfitLevel.STANDARD
            },
            currency: "PHP",
            multipliers: {
                totalSupply: 1,
                srp: 1
            }
        };
    }
    /**
    * Initializes and creates a new `PriceGenie` with default and null values.
    * @param type - Optional Item Type. If not provided, defaults to Product. Use Enum `ItemType`.
    * @returns A new `PriceGenie` instance.
    */
    static initialize(type = ItemType.PRODUCT) {
        const defaultMetadata = {
            name: type === ItemType.PRODUCT ? "My Product" : "My Service",
            description: type === ItemType.PRODUCT ? "A new product" : "A new service",
            image: null,
            category: "Other",
            type: type,
            isSimulating: false,
            isGenieMagic: false,
            company: {
                name: "The Zelijah World",
                description: null,
                image: null,
                address: null
            },
            multipliers: {
                totalSupply: 1,
                srp: 1
            },
            breakdown: {
                opex: {
                    items: [],
                    totalAmount: 0,
                },
                capex: {
                    items: [],
                    totalAmount: 0
                },
                income: {
                    income: {
                        gross: 0,
                        net: 0
                    },
                    profit: {
                        gross: 0,
                        net: 0
                    },
                    profitMargin: 0
                },
                costing: {
                    items: [],
                    totalAmount: 0,
                    totalSupply: 1
                }
            },
            pricing: {
                type: PricingType.FIXED,
                unitQuantity: 1,
                unit: null,
                unitPrice: 0,
                basePrice: 0,
                profitLevel: ProfitLevel.STANDARD
            },
            currency: "PHP",
        };
        // Create and return a new PriceGenie instance
        return new PriceGenie(undefined, defaultMetadata, undefined);
    }
    /**
      * Updates the item's name.
      * @param input - The new name to set. Must be a non-empty string.
      * @throws Will throw an error if the `input` is not provided or is not a string.
      */
    setItemName(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            throw new Error("Item Name must be a valid non-empty string.");
        }
        this.metadata.name = input;
        return this;
    }
    /**
      * Updates the item's category.
      * @param input - The new category to set. Must be a non-empty string.
      * @throws Will throw an error if the `input` is not provided or is not a string.
      */
    setItemCategory(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            throw new Error("Item Category must be a valid non-empty string.");
        }
        this.metadata.category = input;
        return this;
    }
    /**
    * Updates the Item Type.
    * @param input - The new Item Type to set. Use Enum `ItemType`.
    * @throws Will throw an error if the `input` is not provided or is not a string.
    */
    setItemType(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            throw new Error("Invoice Type must be a valid non-empty string.");
        }
        this.metadata.type = input;
        return this;
    }
    /**
    * Updates the currency.
    * @param input - The new currency to set. Must be a non-empty string.
    * @throws Will throw an error if the `input` is not provided or is not a string.
    */
    setCurrency(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            throw new Error("Currency must be a valid non-empty string.");
        }
        this.metadata.currency = input;
        return this;
    }
    /**
    * Updates the item's description.
    * @param input - The new description to set. Must be a non-empty string.
    * @throws Will throw an error if the `input` is not provided or is not a string.
    */
    setItemDescription(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            throw new Error("Item Description must be a valid non-empty string.");
        }
        this.metadata.description = input;
        return this;
    }
    /**
     * Updates the item's photo.
     * @param input - The new item photo to set. Must be a non-empty string.
     * @throws Will throw an error if the `input` is not provided or is not a string.
     */
    setItemPhoto(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            this.metadata.image = null;
            throw new Error("Company Logo must be a valid non-empty string.");
        }
        this.metadata.image = input;
        return this;
    }
    // Company
    /**
      * Updates the company's name.
      * @param input - The new company name to set. Must be a non-empty string.
      * @throws Will throw an error if the `input` is not provided or is not a string.
      */
    setCompanyName(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            throw new Error("Company Name must be a valid non-empty string.");
        }
        this.metadata.company.name = input;
        return this;
    }
    /**
     * Updates the company's logo.
     * @param input - The new company logo to set. Must be a non-empty string.
     * @throws Will throw an error if the `input` is not provided or is not a string.
     */
    setCompanyLogo(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            this.metadata.company.image = null;
            throw new Error("Company Logo must be a valid non-empty string.");
        }
        this.metadata.company.image = input;
        return this;
    }
    /**
     * Updates the company's description.
     * @param input - The new company description to set. Must be a non-empty string.
     * @throws Will throw an error if the `input` is not provided or is not a string.
     */
    setCompanyDescription(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            this.metadata.company.description = null;
            throw new Error("Company Description must be a valid non-empty string.");
        }
        this.metadata.company.description = input;
        return this;
    }
    /**
    * Updates the Profit Level.
    * @param input - The new profit level to set. Use Enum `ProfitLevel`.
    * @throws Will throw an error if the `input` is not provided or is not a string.
    */
    setProfitLevel(input) {
        if (!input || typeof input !== 'string' || input.trim() === "") {
            throw new Error("Profit Level must be a valid non-empty string.");
        }
        this.metadata.pricing.profitLevel = input;
        return this;
    }
    /**
    * Updates the SRP.
    * @param price The new price for the item.
    */
    setPrice(price) {
        this.metadata.pricing.basePrice = price;
        return this;
    }
    /**
    * Updates the pricing model of the item.
    * @param type The pricing type for the pricing model.
    * @param unit The unit type for the pricing model.
    * @param basePrice The base price.
    * @param unitQuantity The quantity of units.
    * @param unitPrice The price per unit.
    * @throws Error if the unit type is not valid or not within the UnitTypes enum.
    */
    setPricingModel(type, basePrice, unit, unitQuantity, unitPrice) {
        if (!type || type.trim() === "") {
            throw new Error("Invalid pricing type: must be a valid string.");
        }
        switch (type) {
            case PricingType.FIXED: {
                this.metadata.pricing = {
                    unit: null,
                    unitPrice: 0,
                    unitQuantity: 0,
                    basePrice: basePrice,
                    type: type,
                    profitLevel: this.metadata.pricing?.profitLevel || ProfitLevel.STANDARD
                };
                break;
            }
            case PricingType.PER_UNIT: {
                if (!unit || unit.trim() === "") {
                    throw new Error("Invalid unit type: must be a valid string.");
                }
                if (!unitQuantity || unitQuantity <= 0) {
                    throw new Error("Invalid unit quantity: must be a valid number.");
                }
                this.metadata.pricing = {
                    unit: unit,
                    unitPrice: basePrice,
                    unitQuantity: unitQuantity,
                    basePrice: basePrice,
                    type: type,
                    profitLevel: this.metadata.pricing?.profitLevel || ProfitLevel.STANDARD
                };
                break;
            }
            case PricingType.PER_UNIT_BASE: {
                if (!unitPrice || unitPrice <= 0) {
                    throw new Error("Invalid unit price: must be a valid number.");
                }
                if (!unit || unit.trim() === "") {
                    throw new Error("Invalid unit type: must be a valid string.");
                }
                if (!unitQuantity || unitQuantity <= 0) {
                    throw new Error("Invalid unit quantity: must be a valid number.");
                }
                this.metadata.pricing = {
                    unit: unit,
                    unitPrice: unitPrice,
                    unitQuantity: unitQuantity,
                    basePrice: basePrice,
                    type: type,
                    profitLevel: this.metadata.pricing?.profitLevel || ProfitLevel.STANDARD
                };
                break;
            }
            default: {
                throw new Error("Invalid pricing type.");
            }
        }
        return this;
    }
    /**
    * Updates the unit type for the item's pricing model.
    * @param unit The unit type for the pricing model, as a string.
    * @throws Error if the item is currently set to fixed pricing.
    */
    setPricingUnit(unit) {
        if (this.metadata.pricing.type === PricingType.FIXED) {
            throw new Error("Unit type is not applicable for fixed pricing.");
        }
        // Update the unit type in the pricing metadata
        this.metadata.pricing.unit = unit;
        return this;
    }
    /**
    * Updates the pricing type for the item's pricing model.
    * @param type The pricing type for the pricing model, as a string.
    * @throws Error if the pricing type is not valid or not within the PricingType enum.
    */
    setPricingType(type) {
        // Update the unit type in the pricing metadata
        this.metadata.pricing.type = type;
        if (type === PricingType.FIXED) {
            this.metadata.pricing.unit = null;
            this.metadata.pricing.unitPrice = 0;
            this.metadata.pricing.unitQuantity = 0;
        }
        return this;
    }
    /**
    * Updates the unit price for the item's pricing model.
    * @param unitPrice The price per unit, must be a number greater than zero.
    * @throws Error if the unit price is less than or equal to zero.
    */
    setUnitPrice(unitPrice) {
        if (unitPrice <= 0) {
            throw new Error("Unit price must be greater than zero.");
        }
        // Update the unit price in the pricing metadata
        this.metadata.pricing.unitPrice = unitPrice;
        return this;
    }
    /**
    * Updates the base price for the item's pricing model.
    * @param basePrice The base price, must be a number greater than zero.
    * @throws Error if the base price is less than or equal to zero.
    */
    setBasePrice(basePrice) {
        if (basePrice <= 0) {
            throw new Error("Base price must be greater than zero.");
        }
        // Update the unit price in the pricing metadata
        this.metadata.pricing.basePrice = basePrice;
        if (this.metadata.pricing.type === PricingType.PER_UNIT) {
            this.metadata.pricing.unitPrice = basePrice;
        }
        return this;
    }
    /**
    * Updates the unit quantity for the item's pricing model.
    * @param unitQuantity The quantity per unit, must be a number greater than zero.
    * @throws Error if the unit quantity is less than or equal to zero.
    */
    setUnitQuantity(unitQuantity) {
        if (unitQuantity <= 0) {
            throw new Error("Unit quantity must be greater than zero.");
        }
        // Update the unit quantity in the pricing metadata
        this.metadata.pricing.unitQuantity = unitQuantity;
        return this;
    }
    /**
    * Updates the approximated total supply that can be sold given the costing.
    * @param input The total supply, must be a number greater than zero.
    * @throws Error if the unit quantity is less than or equal to zero.
    */
    setTotalSupply(input) {
        if (input <= 0) {
            throw new Error("Total supply must be greater than zero.");
        }
        // Update the unit quantity in the pricing metadata
        this.metadata.breakdown.costing.totalSupply = input;
        return this;
    }
    // Costing Item Updates
    /**
    * Sets the list of Costing Items
    * @param list - The new list of CostingItem. Must be a `CostingItem[]`.
    */
    setListCostingBreakdown(list) {
        if (!list || list.length === 0) {
            this.metadata.breakdown.costing.items = [];
        }
        this.metadata.breakdown.costing.items = list;
        this.computeCostingBreakdown();
        this.computeTargetProfitMargin();
        return this;
    }
    /**
    * Clears the list of Costing Items
    */
    clearListCostingBreakdown() {
        this.metadata.breakdown.costing.items = [];
        this.computeCostingBreakdown();
        this.computeTargetProfitMargin();
        return this;
    }
    // OPEX Item Updates
    /**
    * Sets the list of OPEX Items
    * @param list - The new list of OPEXItem. Must be a `OPEXItem[]`.
    */
    setListOPEXBreakdown(list) {
        if (!list || list.length === 0) {
            this.metadata.breakdown.opex.items = [];
        }
        this.metadata.breakdown.opex.items = list;
        // this.computeBreakdown();
        return this;
    }
    /**
    * Clears the list of OPEX Items
    */
    clearListOPEXBreakdown() {
        this.metadata.breakdown.opex.items = [];
        // this.computeBreakdown();
        return this;
    }
    // CAPEX Item Updates
    /**
    * Sets the list of CAPEX Items
    * @param list - The new list of CAPEXItem. Must be a `CAPEXItem[]`.
    */
    setListCAPEXBreakdown(list) {
        if (!list || list.length === 0) {
            this.metadata.breakdown.capex.items = [];
        }
        this.metadata.breakdown.capex.items = list;
        // this.computeBreakdown();
        return this;
    }
    /**
    * Clears the list of CAPEX Items
    */
    clearListCAPEXBreakdown() {
        this.metadata.breakdown.capex.items = [];
        // this.computeBreakdown();
        return this;
    }
    /**
    * Returns the current profit margin
    */
    getProfitMargin() {
        this.computeTargetProfitMargin();
        const profitMargin = this.metadata.breakdown.income?.profitMargin || 0;
        return profitMargin;
    }
    /**
    * Recalculates the entire financial breakdown
    */
    refreshCalculations() {
        this.computeCostingBreakdown();
        this.computeTargetProfitMargin();
        return this;
    }
    /**
    * Finds and returns the single costing item with the highest `amount`.
    * If there are no items, it returns `null`.
    */
    getMostExpensiveCostItem() {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0) {
            return null;
        }
        return items.reduce((maxItem, currentItem) => currentItem.amount > maxItem.amount ? currentItem : maxItem);
    }
    /**
     * Returns the (possibly simulated) total supply.
     */
    getTotalSupply() {
        if (this.metadata.isSimulating) {
            const qMul = this.metadata.multipliers?.totalSupply ?? 1;
            const finalMultiplier = this.metadata.isGenieMagic && !!this.metadata.genie?.suggestions.multipliers.totalSupply
                ? this.metadata.genie.suggestions.multipliers.totalSupply
                : qMul;
            return +((this.metadata.breakdown.costing.totalSupply * finalMultiplier).toFixed(2));
        }
        return +(this.metadata.breakdown.costing.totalSupply.toFixed(2));
    }
    /**
    * Returns the (possibly simulated) SRP.
    */
    getSRP() {
        if (this.metadata.isSimulating) {
            const qMul = this.metadata.multipliers?.srp ?? 1;
            const finalMultiplier = this.metadata.isGenieMagic && !!this.metadata.genie?.suggestions.multipliers.srp
                ? this.metadata.genie.suggestions.multipliers.srp
                : qMul;
            return this.metadata.pricing.basePrice * finalMultiplier;
        }
        return this.metadata.pricing.basePrice;
    }
    /**
    * Returns the (possibly simulated) quantity of a costing item.
    * @param index – zero-based index in breakdown.costing.items
    * @returns number – 0 if list is empty, index is out of range, or item is null.
    */
    getCostItemQuantity(index) {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0 || index < 0 || index >= items.length) {
            return 0;
        }
        const item = items[index];
        if (!item)
            return 0;
        // Global factor (defaults to 1 when not simulating)
        let supplyFactor = this.metadata.isSimulating
            ? this.metadata.multipliers?.totalSupply ?? 1
            : 1;
        if (this.metadata.isGenieMagic && !!this.metadata.genie) {
            supplyFactor = this.metadata.genie.suggestions.multipliers.totalSupply;
        }
        if (this.metadata.isSimulating) {
            const qMul = item.multipliers?.quantity ?? 1;
            return +((item.quantity * qMul * supplyFactor).toFixed(2));
        }
        return +(item.quantity.toFixed(2));
    }
    /**
     * Returns the (possibly simulated) unit price of a costing item.
     * @param index – zero-based index in breakdown.costing.items
     * @returns number – 0 if list is empty, index is out of range, or item is null.
     */
    getCostItemUnitPrice(index) {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0 || index < 0 || index >= items.length) {
            return 0;
        }
        const item = items[index];
        if (!item)
            return 0;
        if (this.metadata.isSimulating) {
            const upMul = item.multipliers?.unitPrice ?? 1;
            return item.unitPrice * upMul;
        }
        return item.unitPrice;
    }
    /**
    * Toggles the simulation mode of Price Genie.
    * @param bool - Toggles the current value if unset.
    */
    toggleSimulation(bool) {
        this.metadata.isSimulating = bool ?? !this.metadata.isSimulating;
        if (!bool) {
            this.metadata.isGenieMagic = false;
            this.metadata.breakdown.costing.items.forEach(item => {
                item.multipliers = { unitPrice: 1, quantity: 1 };
                item.amount = +(item.unitPrice * item.quantity).toFixed(2);
            });
            this.metadata.multipliers.srp = 1;
            this.metadata.multipliers.totalSupply = 1;
        }
        this.refreshCalculations();
        return this;
    }
    /**
     * Update the *unit price* of a costing item at the given index.
     *
     * @param index        – zero-based position in `breakdown.costing.items`
     * @param newUnitPrice – new unit price (must be ≥ 0)
     * @returns `this` for fluent chaining
     * @throws Error if the costing list is empty or the index is out of range
     */
    updateCostItemUnitPrice(index, newUnitPrice) {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0) {
            throw new Error("Cannot update unit price: costing list is empty.");
        }
        if (index < 0 || index >= items.length) {
            throw new Error(`Cost item at index ${index} does not exist.`);
        }
        if (newUnitPrice < 0 || Number.isNaN(newUnitPrice)) {
            throw new Error("Unit price must be a non-negative number.");
        }
        const item = items[index];
        item.unitPrice = newUnitPrice;
        item.amount = +(item.unitPrice * item.quantity).toFixed(2);
        return this.refreshCalculations();
    }
    /**
     * Update the *quantity* of a costing item at the given index.
     *
     * @param index       – zero-based position in `breakdown.costing.items`
     * @param newQuantity – new quantity (must be ≥ 0)
     * @returns `this` for fluent chaining
     * @throws Error if the costing list is empty or the index is out of range
     */
    updateCostItemQuantity(index, newQuantity) {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0) {
            throw new Error("Cannot update quantity: costing list is empty.");
        }
        if (index < 0 || index >= items.length) {
            throw new Error(`Cost item at index ${index} does not exist.`);
        }
        if (newQuantity < 0 || Number.isNaN(newQuantity)) {
            throw new Error("Quantity must be a non-negative number.");
        }
        const item = items[index];
        item.quantity = newQuantity;
        item.amount = +(item.unitPrice * item.quantity).toFixed(2);
        return this.refreshCalculations();
    }
    /**
     * Updates the *Multiplier* of a costing item's *Unit Price* at the given index.
     *
     * @param index - The index number of the costing item to update.
     * @param multiplier – Multiplier value (must be ≥ 0)
     * @throws Error if the costing list is empty or the multiplier is a negative number.
     */
    updateCostItemUnitPriceMultiplier(index, multiplier = 1) {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0) {
            throw new Error("Cannot update unit price: costing list is empty.");
        }
        if (index < 0 || index >= items.length) {
            throw new Error(`Cost item at index ${index} does not exist.`);
        }
        if (multiplier < 0 || Number.isNaN(multiplier)) {
            throw new Error("Multiplier must be a non-negative number.");
        }
        const item = items[index];
        item.multipliers.unitPrice = multiplier;
        return this.refreshCalculations();
    }
    /**
     * Updates the *Multiplier* of a costing item's *Quantity* at the given index.
     *
     * @param index - The index number of the costing item to update.
     * @param multiplier – Multiplier value (must be ≥ 0)
     * @throws Error if the costing list is empty or the multiplier is a negative number.
     */
    updateCostItemQuantityMultiplier(index, multiplier = 1) {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0) {
            throw new Error("Cannot update unit price: costing list is empty.");
        }
        if (index < 0 || index >= items.length) {
            throw new Error(`Cost item at index ${index} does not exist.`);
        }
        if (multiplier < 0 || Number.isNaN(multiplier)) {
            throw new Error("Multiplier must be a non-negative number.");
        }
        const item = items[index];
        item.multipliers.quantity = multiplier;
        return this.refreshCalculations();
    }
    /**
    * Update the *Multiplier* of the global total supply at the given index.
    *
    * @param multiplier – Multiplier value (must be ≥ 0)
    * @throws Error if the multiplier is a negative number.
    */
    updateTotalSupplyMultiplier(multiplier = 1) {
        if (multiplier < 0 || Number.isNaN(multiplier)) {
            throw new Error("Multiplier must be a non-negative number.");
        }
        this.metadata.multipliers.totalSupply = multiplier;
        return this.refreshCalculations();
    }
    /**
     * Update the *Multiplier* of the global total supply at the given index.
     *
     * @param multiplier – Multiplier value (must be ≥ 0)
     * @throws Error if the multiplier is a negative number.
     */
    updateSRPMultiplier(multiplier = 1) {
        if (multiplier < 0 || Number.isNaN(multiplier)) {
            throw new Error("Multiplier must be a non-negative number.");
        }
        this.metadata.multipliers.srp = multiplier;
        return this.refreshCalculations();
    }
    /**
    * Validates and applies Genie results to the instance metadata.
    *
    * @param data - The Genie results to apply.
    * @throws Error if the data is invalid.
    */
    applyGenieResults(data) {
        if (!data ||
            typeof data !== "object" ||
            typeof data.summary !== "string" ||
            !data.suggestions ||
            !Array.isArray(data.suggestions.costing) ||
            typeof data.suggestions.multipliers?.totalSupply !== "number" ||
            typeof data.suggestions.multipliers?.srp !== "number") {
            throw new Error("Invalid Genie data provided");
        }
        this.metadata.genie = data;
        this.metadata.isSimulating = true;
        this.metadata.isGenieMagic = true;
        // this.setCostingItemMultipliersFromGenie();
        return this;
    }
    /**
    * Clears and removes all Genie results from the instance metadata.
    *
    */
    clearGenieResults() {
        this.metadata.genie = undefined;
        this.metadata.isGenieMagic = false;
        this.metadata.isSimulating = false;
        this.metadata.breakdown.costing.items.forEach(item => {
            item.multipliers = { unitPrice: 1, quantity: 1 };
            item.amount = +(item.unitPrice * item.quantity).toFixed(2);
        });
        this.metadata.multipliers.srp = 1;
        this.metadata.multipliers.totalSupply = 1;
        this.refreshCalculations();
        return this;
    }
    /**
    * Retrieves an ItemSuggestion by its `id` from the PriceGenie metadata, if available.
    * @param name - The `id` of the costing item to search for.
    * @returns The matching ItemSuggestion, or undefined if not found or genie data is unavailable.
    */
    getGenieCostingItemByName(name) {
        if (!!this.metadata?.genie) {
            return this.metadata.genie.suggestions.costing.find((item) => item.id === name);
        }
        return undefined;
    }
    /**
    * Updates every costing-item in `metadata.breakdown.costing.items`
    * with the quantity and unit-price multipliers suggested by Genie.
    *
    * - Does nothing when the costing list is empty or missing.
    * - Throws when Genie suggestions are not present in `metadata`.
    *
    * @throws Error if Genie data is absent.
    */
    setCostingItemMultipliersFromGenie() {
        const genie = this.metadata?.genie;
        if (!genie) {
            throw new Error("Genie results are not present");
        }
        const items = this.metadata?.breakdown?.costing?.items;
        if (!items?.length)
            return; // Nothing to update
        for (const item of items) {
            const suggestion = this.getGenieCostingItemByName(item.label);
            if (suggestion) {
                item.multipliers.quantity = suggestion.multiplier.quantity;
                item.multipliers.unitPrice = suggestion.multiplier.unitPrice;
            }
            // If no suggestion for this item, we silently leave its multipliers unchanged
        }
        this.computeCostingBreakdown();
        this.computeTargetProfitMargin();
    }
    /**
    * Builds a printable string of every CostingItem in the breakdown,
    * separated by a header line of equal signs.
    */
    parseCostingForGemini() {
        const items = this.metadata.breakdown.costing.items;
        if (items.length === 0) {
            throw new Error("There are currently no items added in the costing breakdown.");
        }
        const SEPARATOR = "=========";
        const formattedString = items
            .map((item, idx) => `${SEPARATOR}\n${parseCostingItemForGemini(item, idx)}`)
            .join("\n\n"); // blank line between blocks
        return formattedString.trimEnd();
    }
    parseForGemini() {
        const items = this.metadata.breakdown.costing.items;
        if (items.length === 0) {
            throw new Error("There are currently no items added in the costing breakdown.");
        }
        const formattedString = `
        
        
        
Total Supply (with multipliers): ${this.metadata.breakdown.costing.totalSupply}
Original SRP (with multipliers): ${this.metadata.currency} ${this.metadata.pricing.basePrice}
Estimated Gross Sales: ${this.metadata.breakdown.income.income.gross}
Estimated Total Cost: ${this.metadata.breakdown.costing.totalAmount}
Estimated Net Profit: ${this.metadata.breakdown.income.profit.net}
Profit Margin: ${formatPercentage(this.metadata.breakdown.income.profitMargin)}
SRP Multiplier: ${this.metadata.multipliers.srp}
Total Supply Multiplier: ${this.metadata.multipliers.totalSupply}
Simulation Mode: ${this.metadata.isSimulating ?? false}
Supply Factor: ${this.metadata.multipliers.totalSupply}


${this.parseCostingForGemini()}
        
        
        `;
        return formattedString.trimEnd();
    }
    /**
    * Computes the costing breakdown based on current costing items.
    */
    computeCostingBreakdown() {
        const costItems = this.metadata.breakdown.costing.items;
        // If no items, zero everything out
        if (!costItems || costItems.length === 0) {
            this.metadata.breakdown.costing = {
                items: [],
                totalAmount: 0,
                totalSupply: 0,
            };
            return;
        }
        const isGenieMagicMode = this.metadata.isGenieMagic && !!this.metadata.genie;
        if (!isGenieMagicMode) {
            // Global factor (defaults to 1 when not simulating)
            const supplyFactor = this.metadata.isSimulating
                ? this.metadata.multipliers?.totalSupply ?? 1
                : 1;
            costItems.forEach(item => {
                if (this.metadata.isSimulating) {
                    const { unitPrice: upMul = 1, quantity: qMul = 1 } = item.multipliers ?? {};
                    const simulatedUnitPrice = item.unitPrice * upMul;
                    const simulatedQuantity = item.quantity * qMul * supplyFactor;
                    // const simulatedQuantity = item.quantity * qMul;
                    item.amount = +(simulatedUnitPrice * simulatedQuantity).toFixed(2);
                }
                else {
                    item.multipliers = { unitPrice: 1, quantity: 1 };
                    item.amount = +(item.unitPrice * item.quantity).toFixed(2);
                }
            });
            // Get and sum the total amount from the orders
            const totalCost = costItems.reduce((acc, item) => acc + item.amount, 0);
            this.metadata.breakdown.costing.totalAmount = totalCost;
        }
        else {
            if (!!this.metadata.genie) {
                // Global factor (defaults to 1 when not simulating)
                const supplyFactor = this.metadata.isSimulating
                    ? this.metadata.genie.suggestions.multipliers.totalSupply ?? 1
                    : 1;
                costItems.forEach(item => {
                    if (this.metadata.isSimulating) {
                        const genieResult = this.getGenieCostingItemByName(item.label);
                        const { unitPrice: upMul = 1, quantity: qMul = 1 } = genieResult?.multiplier ?? {};
                        const simulatedUnitPrice = item.unitPrice * upMul;
                        const simulatedQuantity = item.quantity * qMul * supplyFactor;
                        // const simulatedQuantity = item.quantity * qMul;
                        item.amount = +(simulatedUnitPrice * simulatedQuantity).toFixed(2);
                    }
                    else {
                        item.multipliers = { unitPrice: 1, quantity: 1 };
                        item.amount = +(item.unitPrice * item.quantity).toFixed(2);
                    }
                });
                // Get and sum the total amount from the orders
                const totalCost = costItems.reduce((acc, item) => acc + item.amount, 0);
                this.metadata.breakdown.costing.totalAmount = totalCost;
            }
        }
        this.computeCostMarginForItems();
    }
    ;
    /**
     * Computes the cost-margin (relative share) for every
     * item in `this.metadata.breakdown.costing.items`.
     *
     * Each item receives a new/updated `costMargin` property:
     *   costMargin = item.amount / totalCost
     *
     * If there are no items, or totalCost is zero,
     * the method exits without modifying anything.
     */
    computeCostMarginForItems() {
        const costItems = this.metadata.breakdown.costing.items;
        // Nothing to do if the list is empty
        if (!costItems || costItems.length === 0) {
            return;
        }
        // Derive the grand-total cost
        const totalCost = costItems.reduce((sum, item) => sum + item.amount, 0);
        // Avoid division by zero
        if (totalCost === 0) {
            return;
        }
        // Store each item's cost margin
        costItems.forEach(item => {
            // Ensure your Item type/interface includes `costMargin: number`
            item.costMargin = item.amount / totalCost;
        });
    }
    /**
    * Computes the profit margin.
    */
    computeTargetProfitMargin() {
        const baseSRP = this.metadata.pricing.basePrice;
        const baseSupply = this.metadata.breakdown.costing.totalSupply;
        let srpMultiplier = this.metadata.isSimulating
            ? this.metadata.multipliers?.srp ?? 1
            : 1;
        let supplyMultiplier = this.metadata.isSimulating
            ? this.metadata.multipliers?.totalSupply ?? 1
            : 1;
        if (this.metadata.isGenieMagic && !!this.metadata.genie) {
            srpMultiplier = this.metadata.genie.suggestions.multipliers.srp;
            supplyMultiplier = this.metadata.genie.suggestions.multipliers.totalSupply;
        }
        const targetSRP = baseSRP * srpMultiplier;
        const totalSupply = baseSupply * supplyMultiplier;
        const estimatedIncome = targetSRP * totalSupply;
        const totalExpense = this.metadata.breakdown.costing.totalAmount;
        const netProfit = estimatedIncome - totalExpense;
        const profitMargin = estimatedIncome > 0 ? netProfit / estimatedIncome : 0;
        this.metadata.breakdown.income.profit.gross = estimatedIncome;
        this.metadata.breakdown.income.profit.net = netProfit;
        this.metadata.breakdown.income.profitMargin = profitMargin || 0;
    }
    ;
    /**
    * Validates the `PriceGenie` instance to ensure that all required fields are set.
    * If any required field is missing or invalid, the method will either throw an error
    * or return `false`, depending on the `throwError` parameter.
    *
    * @param throwError - Optional. If true, throws an error for the first missing or invalid property.
    *                     Defaults to false, in which case it returns a boolean indicating validity.
    * @returns {boolean} - Returns true if the instance is valid, or false if not when `throwError` is false.
    * @throws {Error} - Throws an error when a required field is missing or invalid, and `throwError` is true.
    */
    validateSelf(throwError = false) {
        const requiredFields = [
            { field: this.id, name: "ID" },
            // Metadata
            { field: this.metadata?.name, name: "Item Name" },
            { field: this.metadata?.category, name: "Item Category" },
            { field: this.metadata?.type, name: "Item Type" },
            { field: this.metadata?.currency, name: "Item Currency" },
            //Pricing
            { field: this.metadata?.pricing.basePrice.toString(), name: "Base Price" },
            { field: this.metadata?.pricing.type, name: "Pricing Type" },
        ];
        for (const { field, name } of requiredFields) {
            if (!field || field.trim() === "") {
                if (throwError) {
                    throw new Error(`Validation failed: Missing or invalid property - ${name}`);
                }
                return false;
            }
        }
        return true;
    }
    /**
    * Converts the current `PriceGenie` class to a plain JSON object and automatically generates an ID.
    * @returns {object} - A plain JSON object representation of the `PriceGenie` with an autogenerated ID.
    */
    finalize() {
        return {
            id: autogenerateID(this.metadata.name),
            metadata: this.metadata,
            timestamp: this.timestamp
        };
    }
    /**
    * Converts the current `PriceGenie` object to a plain JavaScript object (JSON).
    * @returns {object} - The plain object representation of the `PriceGenie` instance.
    */
    toJSON() {
        return {
            id: this.id,
            metadata: this.metadata,
            timestamp: this.timestamp
        };
    }
    /**
    * Static method to parse a JSON string or object into a `PriceGenie` instance.
    *
    * @param json - A JSON string or plain object to be parsed.
    * @returns {PriceGenie} - A new `PriceGenie` instance based on the parsed JSON.
    * @throws Will throw an error if required properties are missing.
    */
    static parseFromJSON(json) {
        // If the input is a string, parse it as JSON
        const parsedData = typeof json === 'string'
            ? JSON.parse(json)
            : structuredClone ? structuredClone(json) : JSON.parse(JSON.stringify(json));
        // Validate required properties
        if (!parsedData.id) {
            throw new Error("Missing required property: 'id'");
        }
        if (!parsedData.metadata) {
            throw new Error("Missing required property: 'metadata'");
        }
        // Create and return a new PriceGenie instance with the validated data
        return new PriceGenie(parsedData.id, parsedData.metadata, parsedData.timestamp);
    }
}
exports.PriceGenie = PriceGenie;
/**
 * Generates a unique ID based on a given input string and the current Unix timestamp.
 * Used as a fallback when no ID is provided for the invoice.
 *
 * @param input - Item name or any descriptive string to use in the ID.
 * @returns A unique string identifier in the format: invoice-[slug]-[timestamp]
 */
function autogenerateID(input) {
    const unixTime = Math.floor(Date.now() / 1000);
    const titleText = input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return `pricing-${titleText}-${unixTime}`;
}
// const round = (num: number) => Math.round(num * 100) / 100;
/**
 * Parses a costing item into a formatted string for Gemini.
 *
 * @param item - The costing item to format.
 * @param index - Optional index for the item. Defaults to 0.
 * @param currency - The currency to use. Defaults to PHP.
 * @returns A formatted string with item details.
 */
function parseCostingItemForGemini(item, index = 0, currency = "PHP") {
    return `
Index: ${index}
Name: ${item.label}
Unit Price: ${formatAmountCurrency(item.unitPrice, currency)}
Quantity: ${item.quantity}
Unit: ${item.unit}
Subtotal Amount: ${formatAmountCurrency(item.amount, currency)}
Cost Margin: ${formatPercentage(item.costMargin)}
Unit Price Multiplier: ${item.multipliers.unitPrice}
Quantity Multiplier: ${item.multipliers.quantity}
`.trim();
}
function formatPercentage(value, override = false) {
    const processed = override ? value : Math.max(-1, Math.min(1, value));
    const percentage = +(processed * 100).toFixed(2);
    return `${percentage}%`;
}
function formatAmountCurrency(amount, currency = 'PHP') {
    let finalAmount = amount ? amount : 0;
    if (amount == null) {
        finalAmount = 0;
    }
    if (typeof amount === 'string') {
        amount = parseFloat(amount);
    }
    if (!amount) {
        return `${currency} 0.00`;
    }
    else {
        const formattedAmount = finalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return `${currency} ${formattedAmount}`;
    }
}
