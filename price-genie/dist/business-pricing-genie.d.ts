/**
 * Represents a suggested optimization for a specific costing or expense item
 * in a pricing breakdown. This includes insights on how it can be improved
 * based on current unit price and quantity, and how it affects overall totals.
 */
export interface ItemSuggestion {
    /**
     * Unique identifier or name of the costing item.
     */
    id: string;
    /**
     * Text summary explaining how this item can be optimized based on current
     * quantity and unit price, and its impact on total supply cost and SRP.
     */
    output: string;
    /**
     * Suggested optimized multipliers for this item:
     * - `quantity`: Recommended factor to adjust the current quantity.
     * - `unitPrice`: Recommended factor to adjust the current unit price.
     */
    multiplier: {
        /**
         * Suggested multiplier to optimize the quantity of this item.
         */
        quantity: number;
        /**
         * Suggested multiplier to optimize the unit price of this item.
         */
        unitPrice: number;
    };
}
/**
 * Main response returned by the PriceGenie analysis tool. Contains a general
 * insight summary and specific recommendations for optimizing costs and pricing.
 */
export interface GeminiOutputPriceGenie {
    /**
     * General summary text that encapsulates the overall insight derived from the data,
     * including optimization opportunities and pricing strategy effectiveness.
     */
    summary: string;
    suggestions: {
        /**
         * List of specific optimization suggestions for each costing item.
         */
        costing: ItemSuggestion[];
        /**
         * Suggested global multipliers:
         * - `totalSupply`: Recommended adjustment factor for the total cost of supply.
         * - `srp`: Recommended adjustment factor for the overall suggested retail price (SRP).
         */
        multipliers: {
            /**
             * Multiplier suggestion for optimizing total supply cost.
             */
            totalSupply: number;
            /**
             * Multiplier suggestion for adjusting the SRP for better margin or market competitiveness.
             */
            srp: number;
        };
        /**
         * Summary of efficiency and effectiveness of the current profit margin based on the
         * product's nature and its estimated margins, including strategic recommendations.
         */
        insight: string;
    };
}
/**
 * Represents gross and net amounts for a value.
 */
export interface GrossNet {
    gross: number;
    net: number;
}
/**
 * Defines the different types of pricing models available.
 */
export declare enum PricingType {
    /**
     * A flat, one-time price regardless of the unit quantity or size.
     * Example: PHP 9,999 for a disinfection session, irrespective of the area size.
     */
    FIXED = "Fixed",
    /**
     * Pricing based on the quantity of units multiplied by the unit price.
     * Example:
     * - If the unit price is PHP 50 per square meter and the unit quantity is 30 sqm, the total price is PHP 1,500.
     */
    PER_UNIT = "Per Unit",
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
    PER_UNIT_BASE = "Base plus Per Unit"
}
export declare enum OPEXType {
    SALARIES_AND_WAGES = "Salaries and Wages",
    EMPLOYEE_BENEFITS = "Employee Benefits",
    STAFF_TRAINING_AND_DEVELOPMENT = "Staff Training and Development",
    RECRUITMENT_EXPENSES = "Recruitment Expenses",
    RENT = "Rent",
    UTILITIES = "Utilities",
    PROPERTY_TAXES = "Property Taxes",
    BUILDING_MAINTENANCE = "Building Maintenance and Repairs",
    OFFICE_SUPPLIES = "Office Supplies",
    POSTAGE_AND_DELIVERY = "Postage and Delivery",
    BANK_CHARGES = "Bank Charges",
    LEGAL_FEES = "Legal and Professional Fees",
    INSURANCE = "Insurance",
    SUBSCRIPTIONS_AND_DUES = "Subscriptions and Memberships",
    ADVERTISING = "Advertising and Promotion",
    COMMISSIONS = "Sales Commissions",
    MARKETING_EVENTS = "Marketing Events and Sponsorships",
    CUSTOMER_RELATIONS = "Customer Service and Loyalty Programs",
    SOFTWARE_SUBSCRIPTIONS = "Software Subscriptions (SaaS)",
    IT_SERVICES = "IT Support and Maintenance",
    INTERNET_AND_COMMUNICATIONS = "Internet and Communication Costs",
    CLOUD_SERVICES = "Cloud Hosting and Services",
    TRAVEL_EXPENSES = "Travel Expenses",
    VEHICLE_EXPENSES = "Company Vehicle Costs",
    TRANSPORTATION_ALLOWANCES = "Transportation Allowances",
    RAW_MATERIALS = "Raw Materials (non-inventory)",
    SUPPLIES_AND_CONSUMABLES = "Operational Supplies and Consumables",
    EQUIPMENT_RENTAL = "Equipment Rental and Leasing",
    QUALITY_CONTROL = "Quality Control and Testing",
    CONTRACTOR_FEES = "Contractor and Freelancer Fees",
    OUTSOURCED_SERVICES = "Outsourced Business Services",
    SECURITY_SERVICES = "Security Services",
    CLEANING_SERVICES = "Cleaning and Janitorial Services",
    DEPRECIATION_EXPENSE = "Depreciation",
    AMORTIZATION_EXPENSE = "Amortization",
    BUSINESS_PERMITS_AND_FEES = "Business Permits and Licenses",
    LOCAL_TAXES = "Local Business Taxes",
    BIR_COMPLIANCE_FEES = "BIR Filing and Penalty Fees",
    ENTERTAINMENT = "Business Entertainment",
    DONATIONS = "Donations and CSR",
    CONTINGENCY_EXPENSES = "Contingency and Unexpected Costs",
    MISCELLANEOUS = "Miscellaneous"
}
export declare enum CAPEXType {
    LAND_PURCHASE = "Land Purchase",
    LAND_IMPROVEMENTS = "Land Improvements",
    BUILDING_CONSTRUCTION = "Building Construction",
    BUILDING_IMPROVEMENTS = "Building Renovation or Expansion",
    LEASEHOLD_IMPROVEMENTS = "Leasehold Improvements",
    OFFICE_FURNITURE = "Office Furniture",
    FIXTURES = "Fixtures and Built-ins",
    SPECIALIZED_EQUIPMENT = "Specialized Equipment",
    TOOLS_AND_MACHINERY = "Tools and Machinery",
    COMPUTER_HARDWARE = "Computer Hardware",
    NETWORK_INFRASTRUCTURE = "Network Infrastructure",
    SECURITY_SYSTEMS = "Security Systems and CCTV",
    TELECOMMUNICATION_EQUIPMENT = "Telecommunication Equipment",
    DATA_CENTER_EQUIPMENT = "Data Center and Server Equipment",
    COMPANY_VEHICLES = "Company Vehicles",
    DELIVERY_VEHICLES = "Delivery or Service Vehicles",
    HEAVY_EQUIPMENT = "Heavy Equipment (e.g., forklifts, loaders)",
    SOFTWARE_LICENSES = "Software Licenses (Perpetual)",
    PATENTS_AND_TRADEMARKS = "Patents and Trademarks",
    BRANDING_AND_IP = "Brand Development and Intellectual Property",
    WEBSITE_DEVELOPMENT = "Capitalized Website or Platform Development",
    CONSTRUCTION_IN_PROGRESS = "Construction in Progress",
    ARCHITECTURE_AND_ENGINEERING = "Architecture and Engineering Fees",
    PERMITS_AND_FEES = "Construction Permits and Government Fees",
    SITE_PREPARATION = "Site Preparation and Excavation",
    ASSET_ACQUISITION_FEES = "Asset Acquisition Costs",
    LEGAL_FEES_FOR_CAPEX = "Legal Fees for Asset Acquisition",
    DUE_DILIGENCE_COSTS = "Due Diligence and Surveys",
    ENERGY_SYSTEMS = "Renewable Energy Systems (e.g., Solar Panels)",
    FIRE_PROTECTION_SYSTEMS = "Fire Protection and Emergency Systems",
    WASTE_MANAGEMENT_SYSTEMS = "Waste and Water Treatment Systems",
    R_AND_D_EQUIPMENT = "R&D Equipment and Lab Instruments",
    LIBRARY_COLLECTIONS = "Capitalized Library or Media Collections",
    LEARNING_AND_TRAINING_ASSETS = "Training Infrastructure and Simulators",
    CAPITALIZED_INTEREST = "Capitalized Interest",
    CONTINGENCY_RESERVES = "Contingency Reserves for Capex",
    OTHER_CAPITAL_EXPENSES = "Other Capital Expenditures"
}
/**
 * Enum representing different profit margin strategies.
 */
export declare enum ProfitLevel {
    BARE_MINIMUM = "Bare Minimum",// Very minimal profit, break-even or close
    STANDARD = "Standard",// Average/typical profit level
    FAIR_ENOUGH = "Fair Enough",// Slightly above standard
    HIGH_DEMAND = "High Demand",// Higher profit due to market demand
    RISKY = "Risky",// Compensates for high-risk ventures
    CAPITALIST = "Capitalist",// Maximized profit, aggressive markup
    CUSTOM = "Custom"
}
/**
 * Enum to distinguish whether an item is a tangible product or a service.
 */
export declare enum ItemType {
    PRODUCT = "Product",
    SERVICE = "Service"
}
export interface GenieSimulationControlInputs {
    supply?: number;
    price?: number;
}
/**
 * Contains the multipliers for each costing item
 */
export interface SimulationCostingItemMultipliers {
    unitPrice: number;
    quantity: number;
}
/**
 * Represents an individual costing item used in cost computation.
 */
export interface CostingItem {
    /** Short name or label for the item. */
    label: string;
    /** Optional detailed description of the item. */
    description: string | null;
    /** Number of units used or ordered. */
    quantity: number;
    /** Unit of measurement (e.g., pcs, kg, hrs). */
    unit: string;
    /** Cost per unit. */
    unitPrice: number;
    /** Total amount = quantity × unitPrice. */
    amount: number;
    /** Cost margin used in pricing strategy (as a decimal, e.g., 0.3 for 30%). */
    costMargin: number;
    /** Contains the multipliers for this specific costing item */
    multipliers: SimulationCostingItemMultipliers;
}
/**
 * Represents an Operating Expense (OPEX) line item.
 */
export interface OPEXItem {
    /** Short name or label for the OPEX item. */
    label: string;
    /** Optional detailed description. */
    description: string | null;
    /** The category/type of OPEX (e.g., utilities, rent). */
    type: OPEXType;
    /**
    * Monetary amount associated with the OPEX item.
    * This is a direct value representing the expense for the given period or project scope.
    */
    amount: number;
}
/**
 * Represents a Capital Expenditure (CAPEX) line item.
 */
export interface CAPEXItem {
    /** Short name or label for the CAPEX item. */
    label: string;
    /** Optional detailed description. */
    description: string | null;
    /** The category/type of CAPEX (e.g., equipment, assets). */
    type: CAPEXType;
    /**
    * Monetary amount spent on acquiring the capital asset.
    * This typically reflects one-time purchases or long-term investments.
    */
    amount: number;
}
/**
 * Aggregates the financial breakdown of a product/service offering.
 */
export interface FinancialBreakdown {
    opex: OPEXBreakdown;
    capex: CAPEXBreakdown;
    income: IncomeBreakdown;
    costing: CostingBreakdown;
}
/**
 * Breakdown of income and profit calculations.
 */
export interface IncomeBreakdown {
    /** Income gross and net values. */
    income: GrossNet;
    /** Profit gross and net values. */
    profit: GrossNet;
    /** Profit margin percentage (e.g., 0.25 = 25%). */
    profitMargin: number;
}
/**
 * Aggregates individual costing items and computes the total.
 */
export interface CostingBreakdown {
    /** Line items in the costing breakdown. */
    items: CostingItem[];
    /** Sum of all item amounts. */
    totalAmount: number;
    /** Total supply or stock used for the computation. */
    totalSupply: number;
}
/**
 * Breakdown of all operating expenses.
 */
export interface OPEXBreakdown {
    items: OPEXItem[];
    totalAmount: number;
}
/**
 * Breakdown of all capital expenditures.
 */
export interface CAPEXBreakdown {
    items: CAPEXItem[];
    totalAmount: number;
}
/**
 * Represents the pricing model for a specific unit of measurement.
 * This model defines how pricing is calculated based on unit type, unit price, quantity, and base price.
 */
export interface PricingModel {
    /**
     * Defines the pricing type.
     * For example:
     * - FIXED - A flat, one-time price regardless of the unit quantity or size.
     * - PER UNIT - Pricing based on the quantity of units multiplied by the unit price.
     * - PER UNIT BASE - Pricing with a base price for an initial quantity, followed by an additional unit price for any excess.
     */
    type: PricingType;
    /**
     * The unit type for the pricing model.
     * Examples include:
     * - Square meters (sqm) for area.
     * - Kilograms (kg) for weight.
     * - Hours (hr) for time-based pricing.
     */
    unit: string | null;
    /**
     * The cost per unit of the specified unit type.
     * For instance:
     * - PHP 1,299 per square meter.
     * - PHP 500 per kilogram.
     * - PHP 200 per hour.
     */
    unitPrice: number;
    /**
     * The number of units to be multiplied by the unitPrice to calculate the total cost.
     * For example:
     * - 20 sqm for area-based pricing.
     * - 5 kg for weight-based pricing.
     * - 2 hours for time-based pricing.
     */
    unitQuantity: number;
    /**
     * The minimum starting price for the service or product.
     * - For fixed pricing, this is the flat rate.
     * - For per-unit pricing, this may act as the starting cost for a minimum quantity.
     */
    basePrice: number;
    /**Profit level strategy to guide pricing recommendations. */
    profitLevel: ProfitLevel;
}
/**
 * Represents the output from an AI or smart pricing computation.
 */
export interface GenieOutput {
    /** Suggested retail price or selling price. */
    srp: number;
    /** Computed quantity based on costing or capacity. */
    quantity: number;
}
/**
 * Container for all metadata and computations related to the company/organization.
 */
export interface CompanyMetadata {
    /**
    * Registered business name
    */
    name: string;
    /** Detailed description or notes. */
    description: string | null;
    /** Optional image URL or path for the item. */
    image: string | null;
    /**
      * Business or mailing address
      */
    address: string | null;
    /**
    * Contact number
    */
    contactNumber?: string | null;
    /**
    * Business or personal email address
    */
    emailAddress?: string | null;
    /**
    * Business or personal website URL
    */
    website?: string | null;
}
/**
 * Contains the multipliers for the global parameters total supply and SRP
 */
export interface SimulationGlobalMultipliers {
    totalSupply: number;
    srp: number;
}
/**
 * Container for all metadata and computations related to a product/service item.
 */
export interface ItemMetadata {
    /** Display name or title of the item. */
    name: string;
    isSimulating: boolean;
    isGenieMagic: boolean;
    /** Detailed description or notes. */
    description: string | null;
    /** Optional image URL or path for the item. */
    image: string | null;
    /** Item category (e.g., "cleaning", "consulting"). */
    category: string;
    /** Item type (PRODUCT or SERVICE). */
    type: ItemType;
    company: CompanyMetadata;
    /** Complete financial breakdown object. */
    breakdown: FinancialBreakdown;
    /** Pricing configuration for the item. */
    pricing: PricingModel;
    /** Currency code (e.g., "PHP", "USD"). */
    currency: string;
    /** Contains the multipliers for the global parameters total supply and SRP */
    multipliers: SimulationGlobalMultipliers;
    /** AI generated output for insight and suggestions. */
    genie?: GeminiOutputPriceGenie;
}
/**
 * A class that encapsulates a generated pricing profile and all associated metadata.
 */
export declare class PriceGenie {
    /** Unique identifier for the generated pricing instance. */
    id: string;
    /** Comprehensive item metadata, including pricing, breakdown, and categorization. */
    metadata: ItemMetadata;
    /** ISO 8601 timestamp of when the pricing was generated or recorded. */
    timestamp: string;
    /**
     * Constructs a new instance of the PriceGenie class.
     *
     * @param id - A unique identifier string for the instance (optional).
     * @param metadata - Full item metadata object containing all pricing and breakdown data.
     * @param timestamp - Optional ISO 8601 timestamp. If not provided, current date can be used.
     */
    constructor(id: string | undefined, metadata?: ItemMetadata, timestamp?: string);
    /**
    * Initializes and creates a new `PriceGenie` with default and null values.
    * @param type - Optional Item Type. If not provided, defaults to Product. Use Enum `ItemType`.
    * @returns A new `PriceGenie` instance.
    */
    static initialize(type?: ItemType): PriceGenie;
    /**
      * Updates the item's name.
      * @param input - The new name to set. Must be a non-empty string.
      * @throws Will throw an error if the `input` is not provided or is not a string.
      */
    setItemName(input: string): this;
    /**
      * Updates the item's category.
      * @param input - The new category to set. Must be a non-empty string.
      * @throws Will throw an error if the `input` is not provided or is not a string.
      */
    setItemCategory(input: string): this;
    /**
    * Updates the Item Type.
    * @param input - The new Item Type to set. Use Enum `ItemType`.
    * @throws Will throw an error if the `input` is not provided or is not a string.
    */
    setItemType(input: ItemType): this;
    /**
    * Updates the currency.
    * @param input - The new currency to set. Must be a non-empty string.
    * @throws Will throw an error if the `input` is not provided or is not a string.
    */
    setCurrency(input: string): this;
    /**
    * Updates the item's description.
    * @param input - The new description to set. Must be a non-empty string.
    * @throws Will throw an error if the `input` is not provided or is not a string.
    */
    setItemDescription(input: string): this;
    /**
     * Updates the item's photo.
     * @param input - The new item photo to set. Must be a non-empty string.
     * @throws Will throw an error if the `input` is not provided or is not a string.
     */
    setItemPhoto(input: string): this;
    /**
      * Updates the company's name.
      * @param input - The new company name to set. Must be a non-empty string.
      * @throws Will throw an error if the `input` is not provided or is not a string.
      */
    setCompanyName(input: string): this;
    /**
     * Updates the company's logo.
     * @param input - The new company logo to set. Must be a non-empty string.
     * @throws Will throw an error if the `input` is not provided or is not a string.
     */
    setCompanyLogo(input: string): this;
    /**
     * Updates the company's description.
     * @param input - The new company description to set. Must be a non-empty string.
     * @throws Will throw an error if the `input` is not provided or is not a string.
     */
    setCompanyDescription(input: string): this;
    /**
    * Updates the Profit Level.
    * @param input - The new profit level to set. Use Enum `ProfitLevel`.
    * @throws Will throw an error if the `input` is not provided or is not a string.
    */
    setProfitLevel(input: ProfitLevel): this;
    /**
    * Updates the SRP.
    * @param price The new price for the item.
    */
    setPrice(price: number): this;
    /**
    * Updates the pricing model of the item.
    * @param type The pricing type for the pricing model.
    * @param unit The unit type for the pricing model.
    * @param basePrice The base price.
    * @param unitQuantity The quantity of units.
    * @param unitPrice The price per unit.
    * @throws Error if the unit type is not valid or not within the UnitTypes enum.
    */
    setPricingModel(type: PricingType, basePrice: number, unit?: string, unitQuantity?: number, unitPrice?: number): this;
    /**
    * Updates the unit type for the item's pricing model.
    * @param unit The unit type for the pricing model, as a string.
    * @throws Error if the item is currently set to fixed pricing.
    */
    setPricingUnit(unit: string): this;
    /**
    * Updates the pricing type for the item's pricing model.
    * @param type The pricing type for the pricing model, as a string.
    * @throws Error if the pricing type is not valid or not within the PricingType enum.
    */
    setPricingType(type: PricingType): this;
    /**
    * Updates the unit price for the item's pricing model.
    * @param unitPrice The price per unit, must be a number greater than zero.
    * @throws Error if the unit price is less than or equal to zero.
    */
    setUnitPrice(unitPrice: number): this;
    /**
    * Updates the base price for the item's pricing model.
    * @param basePrice The base price, must be a number greater than zero.
    * @throws Error if the base price is less than or equal to zero.
    */
    setBasePrice(basePrice: number): this;
    /**
    * Updates the unit quantity for the item's pricing model.
    * @param unitQuantity The quantity per unit, must be a number greater than zero.
    * @throws Error if the unit quantity is less than or equal to zero.
    */
    setUnitQuantity(unitQuantity: number): this;
    /**
    * Updates the approximated total supply that can be sold given the costing.
    * @param input The total supply, must be a number greater than zero.
    * @throws Error if the unit quantity is less than or equal to zero.
    */
    setTotalSupply(input: number): this;
    /**
    * Sets the list of Costing Items
    * @param list - The new list of CostingItem. Must be a `CostingItem[]`.
    */
    setListCostingBreakdown(list: CostingItem[]): this;
    /**
    * Clears the list of Costing Items
    */
    clearListCostingBreakdown(): this;
    /**
    * Sets the list of OPEX Items
    * @param list - The new list of OPEXItem. Must be a `OPEXItem[]`.
    */
    setListOPEXBreakdown(list: OPEXItem[]): this;
    /**
    * Clears the list of OPEX Items
    */
    clearListOPEXBreakdown(): this;
    /**
    * Sets the list of CAPEX Items
    * @param list - The new list of CAPEXItem. Must be a `CAPEXItem[]`.
    */
    setListCAPEXBreakdown(list: CAPEXItem[]): this;
    /**
    * Clears the list of CAPEX Items
    */
    clearListCAPEXBreakdown(): this;
    /**
    * Returns the current profit margin
    */
    getProfitMargin(): number;
    /**
    * Recalculates the entire financial breakdown
    */
    refreshCalculations(): this;
    /**
    * Finds and returns the single costing item with the highest `amount`.
    * If there are no items, it returns `null`.
    */
    getMostExpensiveCostItem(): CostingItem | null;
    /**
     * Returns the (possibly simulated) total supply.
     */
    getTotalSupply(): number;
    /**
    * Returns the (possibly simulated) SRP.
    */
    getSRP(): number;
    /**
    * Returns the (possibly simulated) quantity of a costing item.
    * @param index – zero-based index in breakdown.costing.items
    * @returns number – 0 if list is empty, index is out of range, or item is null.
    */
    getCostItemQuantity(index: number): number;
    /**
     * Returns the (possibly simulated) unit price of a costing item.
     * @param index – zero-based index in breakdown.costing.items
     * @returns number – 0 if list is empty, index is out of range, or item is null.
     */
    getCostItemUnitPrice(index: number): number;
    /**
    * Toggles the simulation mode of Price Genie.
    * @param bool - Toggles the current value if unset.
    */
    toggleSimulation(bool?: boolean): this;
    /**
     * Update the *unit price* of a costing item at the given index.
     *
     * @param index        – zero-based position in `breakdown.costing.items`
     * @param newUnitPrice – new unit price (must be ≥ 0)
     * @returns `this` for fluent chaining
     * @throws Error if the costing list is empty or the index is out of range
     */
    updateCostItemUnitPrice(index: number, newUnitPrice: number): this;
    /**
     * Update the *quantity* of a costing item at the given index.
     *
     * @param index       – zero-based position in `breakdown.costing.items`
     * @param newQuantity – new quantity (must be ≥ 0)
     * @returns `this` for fluent chaining
     * @throws Error if the costing list is empty or the index is out of range
     */
    updateCostItemQuantity(index: number, newQuantity: number): this;
    /**
     * Updates the *Multiplier* of a costing item's *Unit Price* at the given index.
     *
     * @param index - The index number of the costing item to update.
     * @param multiplier – Multiplier value (must be ≥ 0)
     * @throws Error if the costing list is empty or the multiplier is a negative number.
     */
    updateCostItemUnitPriceMultiplier(index: number, multiplier?: number): this;
    /**
     * Updates the *Multiplier* of a costing item's *Quantity* at the given index.
     *
     * @param index - The index number of the costing item to update.
     * @param multiplier – Multiplier value (must be ≥ 0)
     * @throws Error if the costing list is empty or the multiplier is a negative number.
     */
    updateCostItemQuantityMultiplier(index: number, multiplier?: number): this;
    /**
    * Update the *Multiplier* of the global total supply at the given index.
    *
    * @param multiplier – Multiplier value (must be ≥ 0)
    * @throws Error if the multiplier is a negative number.
    */
    updateTotalSupplyMultiplier(multiplier?: number): this;
    /**
     * Update the *Multiplier* of the global total supply at the given index.
     *
     * @param multiplier – Multiplier value (must be ≥ 0)
     * @throws Error if the multiplier is a negative number.
     */
    updateSRPMultiplier(multiplier?: number): this;
    /**
    * Validates and applies Genie results to the instance metadata.
    *
    * @param data - The Genie results to apply.
    * @throws Error if the data is invalid.
    */
    applyGenieResults(data: GeminiOutputPriceGenie): this;
    /**
    * Clears and removes all Genie results from the instance metadata.
    *
    */
    clearGenieResults(): this;
    /**
    * Retrieves an ItemSuggestion by its `id` from the PriceGenie metadata, if available.
    * @param name - The `id` of the costing item to search for.
    * @returns The matching ItemSuggestion, or undefined if not found or genie data is unavailable.
    */
    getGenieCostingItemByName(name: string): ItemSuggestion | undefined;
    /**
    * Updates every costing-item in `metadata.breakdown.costing.items`
    * with the quantity and unit-price multipliers suggested by Genie.
    *
    * - Does nothing when the costing list is empty or missing.
    * - Throws when Genie suggestions are not present in `metadata`.
    *
    * @throws Error if Genie data is absent.
    */
    setCostingItemMultipliersFromGenie(): void;
    /**
    * Builds a printable string of every CostingItem in the breakdown,
    * separated by a header line of equal signs.
    */
    parseCostingForGemini(): string;
    parseForGemini(): string;
    /**
    * Computes the costing breakdown based on current costing items.
    */
    private computeCostingBreakdown;
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
    private computeCostMarginForItems;
    /**
    * Computes the profit margin.
    */
    private computeTargetProfitMargin;
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
    validateSelf(throwError?: boolean): boolean;
    /**
    * Converts the current `PriceGenie` class to a plain JSON object and automatically generates an ID.
    * @returns {object} - A plain JSON object representation of the `PriceGenie` with an autogenerated ID.
    */
    finalize(): object;
    /**
    * Converts the current `PriceGenie` object to a plain JavaScript object (JSON).
    * @returns {object} - The plain object representation of the `PriceGenie` instance.
    */
    toJSON(): object;
    /**
    * Static method to parse a JSON string or object into a `PriceGenie` instance.
    *
    * @param json - A JSON string or plain object to be parsed.
    * @returns {PriceGenie} - A new `PriceGenie` instance based on the parsed JSON.
    * @throws Will throw an error if required properties are missing.
    */
    static parseFromJSON(json: string | object): PriceGenie;
}
/**
 * Parses a costing item into a formatted string for Gemini.
 *
 * @param item - The costing item to format.
 * @param index - Optional index for the item. Defaults to 0.
 * @param currency - The currency to use. Defaults to PHP.
 * @returns A formatted string with item details.
 */
export declare function parseCostingItemForGemini(item: CostingItem, index?: number, currency?: string): string;
export declare function formatPercentage(value: number, override?: boolean): string;
export declare function formatAmountCurrency(amount: string | number | null | undefined, currency?: string): string;
