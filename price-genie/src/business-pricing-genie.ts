


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
export enum PricingType {
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
    PER_UNIT_BASE = "Base plus Per Unit",
}



export enum OPEXType {
    // Personnel Costs
    SALARIES_AND_WAGES = 'Salaries and Wages',
    EMPLOYEE_BENEFITS = 'Employee Benefits',
    STAFF_TRAINING_AND_DEVELOPMENT = 'Staff Training and Development',
    RECRUITMENT_EXPENSES = 'Recruitment Expenses',

    // Occupancy Costs
    RENT = 'Rent',
    UTILITIES = 'Utilities',
    PROPERTY_TAXES = 'Property Taxes',
    BUILDING_MAINTENANCE = 'Building Maintenance and Repairs',

    // Administrative Expenses
    OFFICE_SUPPLIES = 'Office Supplies',
    POSTAGE_AND_DELIVERY = 'Postage and Delivery',
    BANK_CHARGES = 'Bank Charges',
    LEGAL_FEES = 'Legal and Professional Fees',
    INSURANCE = 'Insurance',
    SUBSCRIPTIONS_AND_DUES = 'Subscriptions and Memberships',

    // Sales & Marketing
    ADVERTISING = 'Advertising and Promotion',
    COMMISSIONS = 'Sales Commissions',
    MARKETING_EVENTS = 'Marketing Events and Sponsorships',
    CUSTOMER_RELATIONS = 'Customer Service and Loyalty Programs',

    // IT & Communication
    SOFTWARE_SUBSCRIPTIONS = 'Software Subscriptions (SaaS)',
    IT_SERVICES = 'IT Support and Maintenance',
    INTERNET_AND_COMMUNICATIONS = 'Internet and Communication Costs',
    CLOUD_SERVICES = 'Cloud Hosting and Services',

    // Travel & Transportation
    TRAVEL_EXPENSES = 'Travel Expenses',
    VEHICLE_EXPENSES = 'Company Vehicle Costs',
    TRANSPORTATION_ALLOWANCES = 'Transportation Allowances',

    // Production/Operations
    RAW_MATERIALS = 'Raw Materials (non-inventory)',
    SUPPLIES_AND_CONSUMABLES = 'Operational Supplies and Consumables',
    EQUIPMENT_RENTAL = 'Equipment Rental and Leasing',
    QUALITY_CONTROL = 'Quality Control and Testing',

    // Outsourced Services
    CONTRACTOR_FEES = 'Contractor and Freelancer Fees',
    OUTSOURCED_SERVICES = 'Outsourced Business Services',
    SECURITY_SERVICES = 'Security Services',
    CLEANING_SERVICES = 'Cleaning and Janitorial Services',

    // Depreciation & Amortization
    DEPRECIATION_EXPENSE = 'Depreciation',
    AMORTIZATION_EXPENSE = 'Amortization',

    // Taxes (non-income)
    BUSINESS_PERMITS_AND_FEES = 'Business Permits and Licenses',
    LOCAL_TAXES = 'Local Business Taxes',
    BIR_COMPLIANCE_FEES = 'BIR Filing and Penalty Fees',

    // Miscellaneous
    ENTERTAINMENT = 'Business Entertainment',
    DONATIONS = 'Donations and CSR',
    CONTINGENCY_EXPENSES = 'Contingency and Unexpected Costs',
    MISCELLANEOUS = 'Miscellaneous'
}


export enum CAPEXType {
    // Land & Buildings
    LAND_PURCHASE = 'Land Purchase',
    LAND_IMPROVEMENTS = 'Land Improvements',
    BUILDING_CONSTRUCTION = 'Building Construction',
    BUILDING_IMPROVEMENTS = 'Building Renovation or Expansion',
    LEASEHOLD_IMPROVEMENTS = 'Leasehold Improvements',

    // Furniture, Fixtures & Equipment (FF&E)
    OFFICE_FURNITURE = 'Office Furniture',
    FIXTURES = 'Fixtures and Built-ins',
    SPECIALIZED_EQUIPMENT = 'Specialized Equipment',
    TOOLS_AND_MACHINERY = 'Tools and Machinery',

    // Technology & Infrastructure
    COMPUTER_HARDWARE = 'Computer Hardware',
    NETWORK_INFRASTRUCTURE = 'Network Infrastructure',
    SECURITY_SYSTEMS = 'Security Systems and CCTV',
    TELECOMMUNICATION_EQUIPMENT = 'Telecommunication Equipment',
    DATA_CENTER_EQUIPMENT = 'Data Center and Server Equipment',

    // Vehicles
    COMPANY_VEHICLES = 'Company Vehicles',
    DELIVERY_VEHICLES = 'Delivery or Service Vehicles',
    HEAVY_EQUIPMENT = 'Heavy Equipment (e.g., forklifts, loaders)',

    // Intangible Assets
    SOFTWARE_LICENSES = 'Software Licenses (Perpetual)',
    PATENTS_AND_TRADEMARKS = 'Patents and Trademarks',
    BRANDING_AND_IP = 'Brand Development and Intellectual Property',
    WEBSITE_DEVELOPMENT = 'Capitalized Website or Platform Development',

    // Construction & Development
    CONSTRUCTION_IN_PROGRESS = 'Construction in Progress',
    ARCHITECTURE_AND_ENGINEERING = 'Architecture and Engineering Fees',
    PERMITS_AND_FEES = 'Construction Permits and Government Fees',
    SITE_PREPARATION = 'Site Preparation and Excavation',

    // Lease & Acquisition Costs
    ASSET_ACQUISITION_FEES = 'Asset Acquisition Costs',
    LEGAL_FEES_FOR_CAPEX = 'Legal Fees for Asset Acquisition',
    DUE_DILIGENCE_COSTS = 'Due Diligence and Surveys',

    // Environmental & Safety
    ENERGY_SYSTEMS = 'Renewable Energy Systems (e.g., Solar Panels)',
    FIRE_PROTECTION_SYSTEMS = 'Fire Protection and Emergency Systems',
    WASTE_MANAGEMENT_SYSTEMS = 'Waste and Water Treatment Systems',

    // Other Capitalized Assets
    R_AND_D_EQUIPMENT = 'R&D Equipment and Lab Instruments',
    LIBRARY_COLLECTIONS = 'Capitalized Library or Media Collections',
    LEARNING_AND_TRAINING_ASSETS = 'Training Infrastructure and Simulators',

    // Miscellaneous
    CAPITALIZED_INTEREST = 'Capitalized Interest',
    CONTINGENCY_RESERVES = 'Contingency Reserves for Capex',
    OTHER_CAPITAL_EXPENSES = 'Other Capital Expenditures'
}


/**
 * Enum representing different profit margin strategies.
 */
export enum ProfitLevel {
    BARE_MINIMUM = "Bare Minimum",    // Very minimal profit, break-even or close
    STANDARD = "Standard",            // Average/typical profit level
    FAIR_ENOUGH = "Fair Enough",      // Slightly above standard
    HIGH_DEMAND = "High Demand",      // Higher profit due to market demand
    RISKY = "Risky",                  // Compensates for high-risk ventures
    CAPITALIST = "Capitalist",        // Maximized profit, aggressive markup
    CUSTOM = "Custom"                 // Custom percentage
}


/**
 * Enum to distinguish whether an item is a tangible product or a service.
 */
export enum ItemType {
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
    multipliers: SimulationCostingItemMultipliers
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
export class PriceGenie {

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
    constructor(
        id: string | undefined,
        metadata?: ItemMetadata,
        timestamp?: string
    ) {
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
    static initialize(
        type: ItemType = ItemType.PRODUCT
    ): PriceGenie {

        const defaultMetadata: ItemMetadata = {
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
        return new PriceGenie(
            undefined,
            defaultMetadata,
            undefined
        );
    }










    /**
      * Updates the item's name.
      * @param input - The new name to set. Must be a non-empty string.
      * @throws Will throw an error if the `input` is not provided or is not a string.
      */
    setItemName(input: string): this {

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
    setItemCategory(input: string): this {

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
    setItemType(input: ItemType): this {

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
    setCurrency(input: string): this {

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
    setItemDescription(input: string): this {

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
    setItemPhoto(input: string): this {

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
    setCompanyName(input: string): this {

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
    setCompanyLogo(input: string): this {

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
    setCompanyDescription(input: string): this {

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
    setProfitLevel(input: ProfitLevel): this {

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
    setPrice(price: number): this {
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
    setPricingModel(type: PricingType, basePrice: number, unit?: string, unitQuantity?: number, unitPrice?: number): this {


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
    setPricingUnit(unit: string): this {


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
    setPricingType(type: PricingType): this {

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
    setUnitPrice(unitPrice: number): this {

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
    setBasePrice(basePrice: number): this {

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
    setUnitQuantity(unitQuantity: number): this {

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
    setTotalSupply(input: number): this {

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
    setListCostingBreakdown(list: CostingItem[]): this {

        if (!list || list.length === 0) {
            this.metadata.breakdown.costing.items = [];
        }

        this.metadata.breakdown.costing.items = list;

        this.computeCostingBreakdown();
        this.computeTargetProfitMargin()
        return this;
    }


    /**
    * Clears the list of Costing Items
    */
    clearListCostingBreakdown(): this {
        this.metadata.breakdown.costing.items = [];
        this.computeCostingBreakdown();
        this.computeTargetProfitMargin()
        return this;
    }




    // OPEX Item Updates

    /**
    * Sets the list of OPEX Items
    * @param list - The new list of OPEXItem. Must be a `OPEXItem[]`.
    */
    setListOPEXBreakdown(list: OPEXItem[]): this {

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
    clearListOPEXBreakdown(): this {
        this.metadata.breakdown.opex.items = [];
        // this.computeBreakdown();

        return this;
    }




    // CAPEX Item Updates

    /**
    * Sets the list of CAPEX Items
    * @param list - The new list of CAPEXItem. Must be a `CAPEXItem[]`.
    */
    setListCAPEXBreakdown(list: CAPEXItem[]): this {

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
    clearListCAPEXBreakdown(): this {
        this.metadata.breakdown.capex.items = [];
        // this.computeBreakdown();

        return this;
    }



    /**
    * Returns the current profit margin
    */
    getProfitMargin(): number {
        this.computeTargetProfitMargin();

        const profitMargin = this.metadata.breakdown.income?.profitMargin || 0;

        return profitMargin;
    }



    /**
    * Recalculates the entire financial breakdown
    */
    refreshCalculations(): this {
        this.computeCostingBreakdown();
        this.computeTargetProfitMargin();

        return this;
    }


    /**
    * Finds and returns the single costing item with the highest `amount`.
    * If there are no items, it returns `null`.
    */
    getMostExpensiveCostItem(): CostingItem | null {
        const items = this.metadata.breakdown.costing.items;

        if (!items || items.length === 0) {
            return null;
        }

        return items.reduce((maxItem, currentItem) =>
            currentItem.amount > maxItem.amount ? currentItem : maxItem
        );
    }

    /**
     * Returns the (possibly simulated) total supply.
     */
    getTotalSupply(): number {


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
    getSRP(): number {


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
    getCostItemQuantity(index: number): number {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0 || index < 0 || index >= items.length) {
            return 0;
        }

        const item = items[index];
        if (!item) return 0;

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
    getCostItemUnitPrice(index: number): number {
        const items = this.metadata.breakdown.costing.items;
        if (!items || items.length === 0 || index < 0 || index >= items.length) {
            return 0;
        }

        const item = items[index];
        if (!item) return 0;


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
    toggleSimulation(bool?: boolean): this {

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
    updateCostItemUnitPrice(index: number, newUnitPrice: number): this {
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
    updateCostItemQuantity(index: number, newQuantity: number): this {
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
    updateCostItemUnitPriceMultiplier(index: number, multiplier: number = 1): this {
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
    updateCostItemQuantityMultiplier(index: number, multiplier: number = 1): this {
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
    updateTotalSupplyMultiplier(multiplier: number = 1): this {


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
    updateSRPMultiplier(multiplier: number = 1): this {


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
    applyGenieResults(data: GeminiOutputPriceGenie): this {
        if (
            !data ||
            typeof data !== "object" ||
            typeof data.summary !== "string" ||
            !data.suggestions ||
            !Array.isArray(data.suggestions.costing) ||
            typeof data.suggestions.multipliers?.totalSupply !== "number" ||
            typeof data.suggestions.multipliers?.srp !== "number"
        ) {
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
    clearGenieResults(): this {
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
    getGenieCostingItemByName(name: string): ItemSuggestion | undefined {
        if (!!this.metadata?.genie) {
            return this.metadata.genie.suggestions.costing.find(
                (item) => item.id === name
            );
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
    setCostingItemMultipliersFromGenie(): void {
        const genie = this.metadata?.genie;
        if (!genie) {
            throw new Error("Genie results are not present");
        }

        const items = this.metadata?.breakdown?.costing?.items;
        if (!items?.length) return; // Nothing to update

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
    parseCostingForGemini(): string {
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

    parseForGemini(): string {


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
    private computeCostingBreakdown(): void {

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

        const isGenieMagicMode = this.metadata.isGenieMagic && !!this.metadata.genie



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
                } else {
                    item.multipliers = { unitPrice: 1, quantity: 1 };
                    item.amount = +(item.unitPrice * item.quantity).toFixed(2);
                }
            });


            // Get and sum the total amount from the orders
            const totalCost = costItems.reduce((acc, item) => acc + item.amount, 0);



            this.metadata.breakdown.costing.totalAmount = totalCost;
        } else {

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
                    } else {
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
    };

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
    private computeCostMarginForItems(): void {
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
    private computeTargetProfitMargin(): void {
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
    };

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
    validateSelf(throwError: boolean = false): boolean {
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
    finalize(): object {
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
    toJSON(): object {

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
    static parseFromJSON(json: string | object): PriceGenie {
        // If the input is a string, parse it as JSON
        const parsedData =
            typeof json === 'string'
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
        return new PriceGenie(
            parsedData.id,
            parsedData.metadata,
            parsedData.timestamp
        );
    }




}


/**
 * Generates a unique ID based on a given input string and the current Unix timestamp.
 * Used as a fallback when no ID is provided for the invoice.
 *
 * @param input - Item name or any descriptive string to use in the ID.
 * @returns A unique string identifier in the format: invoice-[slug]-[timestamp]
 */
function autogenerateID(input: string): string {
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
export function parseCostingItemForGemini(item: CostingItem, index: number = 0, currency: string = "PHP"): string {
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

export function formatPercentage(value: number, override = false): string {
    const processed = override ? value : Math.max(-1, Math.min(1, value));
    const percentage = +(processed * 100).toFixed(2);
    return `${percentage}%`;
}



export function formatAmountCurrency(amount: string | number | null | undefined, currency: string = 'PHP'): string {
    let finalAmount: number | string = amount ? amount : 0;
    if (amount == null) {
        finalAmount = 0;
    }

    if (typeof amount === 'string') {
        amount = parseFloat(amount);
    }

    if (!amount) {
        return `${currency} 0.00`;
    } else {
        const formattedAmount = finalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return `${currency} ${formattedAmount}`;
    }


}