'use client';

import React, { useState } from 'react';



// Styled components
const BodyContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  user-select: none;
  height: auto;
  gap: 5px;
  min-width: 420px;
  background-color: ${({ theme }) => theme.colors.primaryBackground};

    @media (max-width: 768px) {
    min-width: 280px;
    }

`;

const FormTrimmer = styled.div`
  width: inherit;
  max-width: 600px;
  padding: 55px 25px;
  gap: 15px;

  display: flex;
  height: auto;
    margin: 20px 25px;
    align-items: center;

  border: 1px solid transparent;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
    padding: 55px 15px;
    }
`;


const FormBodyEvent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 100%;
  flex-grow: 1; /* Allows it to grow and take available space */
  gap: 15px;
  padding: 15px;
  box-sizing: border-box; /* Include padding and borders in width/height */

`;


const HelperColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  align-items: flex-end;


`;

const HelperText = styled.p`
  font-size: 12px;
  text-align: right;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.7;
  font-weight: 300;

`;





interface FormPriceGenieProps {
    onSubmit?: (formData: PriceGenie) => void;
    onSave?: (formData: PriceGenie) => void;
    onCancel?: () => void;
    formData?: PriceGenie;
}



export const FormPriceGenie: React.FC<FormPriceGenieProps> = ({ onSubmit, onSave, onCancel, formData }) => {



    const [formDataInstance, setPriceGenieInstance] = useState<PriceGenie>(
        () => !!formData
            ? PriceGenie.parseFromJSON(formData)
            : PriceGenie.initialize()
    );




    const [isProceedEnabled, setIsProceedEnabled] = useState<boolean>(!!formData);

    const [currentItemType, setItemType] = useState<ItemType>(!!formData ? formData.metadata.type : ItemType.PRODUCT);
    const [currentPricingModel, setPricingModel] = useState<PricingType>(!!formData ? formData.metadata.pricing.type : PricingType.FIXED);

    const validateForm = () => {

        return (formDataInstance.validateSelf(false)) || false
    };


    const handleCancel = () => {
        console.log("Cancelling Form");
        onCancel?.();

    }




    // Item Metadata Updates


    const handleChangeItemName = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {


                const updatedPriceGenieInstance = formDataInstance.setItemName(input);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Item Name: ", updatedPriceGenieInstance.metadata.name);
            } catch (error) {
                toast.error(`There's a problem updating the items's name. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };


    const handleChangeItemPhoto = (input: UploadedImageFile | null) => {

        if (!!input && !!formDataInstance) {
            try {


                const updatedPriceGenieInstance = formDataInstance.setItemPhoto(input.base64);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Item Photo: ", updatedPriceGenieInstance.metadata.image);



            } catch (error) {
                toast.error(`There's a problem updating the item's photo. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };

    const handleChangeItemDescription = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {


                const updatedPriceGenieInstance = formDataInstance.setItemDescription(input);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Item Description: ", updatedPriceGenieInstance.metadata.description);
            } catch (error) {
                toast.error(`There's a problem updating the item's description. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };


    const handleChangeItemCategory = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {


                const updatedPriceGenieInstance = formDataInstance.setItemCategory(input);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Item Category: ", updatedPriceGenieInstance.metadata.category);
            } catch (error) {
                toast.error(`There's a problem updating the item's category. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };


    const handleChangeItemType = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {

                setItemType(input as ItemType);
                const updatedPriceGenieInstance = formDataInstance.setItemType(input as ItemType);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Item Type ", updatedPriceGenieInstance.metadata.type);
            } catch (error) {
                toast.error(`There's a problem updating the item's type. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };







    const handleChangeCompanyName = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {


                const updatedPriceGenieInstance = formDataInstance.setCompanyName(input);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Company Name: ", updatedPriceGenieInstance.metadata.company.name);
            } catch (error) {
                toast.error(`There's a problem updating the company's name. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };

    const handleChangeCompanyDescription = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {


                const updatedPriceGenieInstance = formDataInstance.setCompanyDescription(input);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Company Description: ", updatedPriceGenieInstance.metadata.company.description);
            } catch (error) {
                toast.error(`There's a problem updating the company's description. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };



    const handleChangeCompanyLogo = (input: UploadedImageFile | null) => {

        if (!!input && !!formDataInstance) {
            try {


                const updatedPriceGenieInstance = formDataInstance.setCompanyLogo(input.base64);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Company Logo: ", updatedPriceGenieInstance.metadata.company.image);



            } catch (error) {
                toast.error(`There's a problem updating the company's logo. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };

    // Pricing


    const handleChangeCurrency = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {


                const updatedPriceGenieInstance = formDataInstance.setCurrency(input);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Currency: ", updatedPriceGenieInstance.metadata.currency);
            } catch (error) {
                toast.error(`There's a problem updating the item's currency. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };


    const handleItemPricingUnitChange = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {

                const updatedPriceGenieInstance = formDataInstance.setPricingUnit(input);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Pricing Unit: ", updatedPriceGenieInstance.metadata.pricing.unit);


            } catch (error) {
                toast.error(`There's a problem updating this item's pricing model unit. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };

    const handleItemPricingTypeChange = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {

                setPricingModel(input as PricingType);
                const updatedPriceGenieInstance = formDataInstance.setPricingType(input as PricingType);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Pricing Type: ", updatedPriceGenieInstance.metadata.pricing.type);


            } catch (error) {
                toast.error(`There's a problem updating this service's pricing type. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };


    const handleItemUnitPriceChange = (input: string) => {
        if (!!input && !!formDataInstance) {
            try {

                const updatedPriceGenieInstance = formDataInstance.setUnitPrice(parseFloat(input));

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Pricing Unit Price: ", updatedPriceGenieInstance.metadata.pricing.unitPrice);

            } catch (error) {
                toast.error(`There's a problem updating this item's unit price. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };


    const handleItemBasePriceChange = (input: string) => {
        if (!!input && !!formDataInstance) {
            try {

                const updatedPriceGenieInstance = formDataInstance.setBasePrice(parseFloat(input));

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Pricing Base Price: ", updatedPriceGenieInstance.metadata.pricing.basePrice);
            } catch (error) {
                toast.error(`There's a problem updating this service's base price. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };

    const handleItemUnitQuantityChange = (input: string) => {

        if (!!input && !!formDataInstance) {
            try {

                const updatedPriceGenieInstance = formDataInstance.setUnitQuantity(parseInt(input));

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Pricing Unit Quantity: ", updatedPriceGenieInstance.metadata.pricing.unitQuantity);
            } catch (error) {
                toast.error(`There's a problem updating this item's unit quantity. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };





    const handleUpdateCostingList = (input: CostingItem[]) => {
        if (isDevEnvironment()) console.log("Raw Update Input: ", input);

        if (!!input && input.length > 0) {

            try {

                const updatedPriceGenieInstance = formDataInstance.setListCostingBreakdown(input);

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Costing Items: ", updatedPriceGenieInstance.metadata.breakdown.costing.items);
            } catch (error) {
                toast.error(`There's a problem updating the list of costing items. Please try again or try refreshing. Error: ${error}`)
            }


        } else {

            const updatedPriceGenieInstance = formDataInstance.clearListCostingBreakdown();

            setPriceGenieInstance(updatedPriceGenieInstance);

            if (isDevEnvironment()) console.log("Current Costing Items: ", updatedPriceGenieInstance.metadata.breakdown.costing.items);
        }

    };




    const handleChangeTotalSupply = (input: string) => {
        if (!!input && !!formDataInstance) {
            try {

                const updatedPriceGenieInstance = formDataInstance.setTotalSupply(parseInt(input));

                setPriceGenieInstance(updatedPriceGenieInstance);

                if (isDevEnvironment()) console.log("Current Total Supply: ", updatedPriceGenieInstance.metadata.breakdown.costing.totalSupply);
            } catch (error) {
                toast.error(`There's a problem updating this item's estimated total supply. Please try again or try refreshing. Error: ${error}`)
            }
        }

        setIsProceedEnabled(validateForm());
    };















    const handleSubmitSave = () => {
        console.log("Submitting Form");

        try {
            formDataInstance.validateSelf(true);
        } catch (error) {
            toast.error(`Missing fields: ${error}`);
            return;
        }

        onSubmit?.(formDataInstance);
        onSave?.(formDataInstance);

    }


    const handleViewTestInstance = () => {
        console.log("Instance: ", formDataInstance);
        try {
            formDataInstance.validateSelf(true);
        } catch (error) {
            console.log("Error: ", error);
        }



    }



    const getPricingModelInfo = (method: PricingType): string => {
        switch (method) {
            case PricingType.FIXED:
                return "Use this when you're charging a flat, all-in price regardless of quantity, duration, or complexity. Ideal for packages or one-time services like a flat-rate consultation or bundled product.";
            case PricingType.PER_UNIT:
                return "Use this when you're charging based on a specific quantity or count. For example, price per item, per hour, per kilometer, or per square meter.";
            case PricingType.PER_UNIT_BASE:
                return "Use this when you have a base price that includes a certain number of units, and you charge extra for each additional unit. For example, ₱500 for the first 3 hours, then ₱100 per extra hour.";
            default:
                return "Choose the pricing model that best fits how you calculate your charges—fixed total, per unit, or with a base plus additional units.";
        }
    };


    const getItemTypeInfo = (method: ItemType): string => {
        switch (method) {
            case ItemType.PRODUCT:
                return "Select this if you're selling a tangible item or physical good. Examples include electronics, food items, clothing, or any merchandise that is delivered or handed over to the buyer.";
            case ItemType.SERVICE:
                return "Select this if you're offering a task, labor, or time-based activity. Examples include cleaning services, consultations, design work, repairs, or any activity performed for a client.";
            default:
                return "Choose the appropriate item type based on whether you're selling a physical product or providing a service.";
        }
    };




    const getPriceInputForm = (type: PricingType) => {
        switch (type) {
            case PricingType.FIXED:
                return (
                    <CustomInputField
                        required
                        label="Flat Rate"
                        isLabelHint={false}
                        regex='numbers'
                        onChange={handleItemBasePriceChange}
                        currentValue={formDataInstance.metadata?.pricing?.basePrice?.toString() || ""}
                    />
                );
            case PricingType.PER_UNIT:
                return (
                    <>
                        <CustomInputField
                            required
                            label="Unit"
                            isLabelHint={false}
                            onChange={handleItemPricingUnitChange}
                            currentValue={formDataInstance.metadata.pricing?.unit || ""}
                            maxChar={30}
                            capitalize="character"
                        />
                        <CustomInputField
                            required
                            label="Unit Price"
                            isLabelHint={false}
                            regex='numbers'
                            onChange={handleItemBasePriceChange}
                            currentValue={formDataInstance.metadata?.pricing.basePrice?.toString() ?? 0}
                        />
                        <CustomInputField
                            required
                            label="Unit Quantity"
                            isLabelHint={false}
                            regex='numbers'
                            onChange={handleItemUnitQuantityChange}
                            currentValue={formDataInstance.metadata?.pricing?.unitQuantity?.toString() ?? 0}
                        />
                    </>

                );
            case PricingType.PER_UNIT_BASE:
                return (
                    <>
                        <CustomInputField
                            required
                            label="Unit"
                            isLabelHint={false}
                            onChange={handleItemPricingUnitChange}
                            currentValue={formDataInstance.metadata.pricing?.unit || ""}
                            maxChar={30}
                            capitalize="character"
                        />
                        <CustomInputField
                            required
                            label="Base Price"
                            isLabelHint={false}
                            regex='numbers'
                            onChange={handleItemBasePriceChange}
                            currentValue={formDataInstance.metadata?.pricing?.basePrice?.toString() ?? 0}
                        />
                        <CustomInputField
                            required
                            label="Unit Price"
                            isLabelHint={false}
                            regex='numbers'
                            onChange={handleItemUnitPriceChange}
                            currentValue={formDataInstance.metadata?.pricing?.unitPrice?.toString() ?? 0}
                        />
                        <CustomInputField
                            required
                            label="Unit Quantity"
                            isLabelHint={false}
                            regex='numbers'
                            onChange={handleItemUnitQuantityChange}
                            currentValue={formDataInstance.metadata?.pricing?.unitQuantity?.toString() ?? 0}
                        />
                    </>
                );
            default:
                return null;
        }

    }









    return (
        <BodyContainer className='rootPriceGenieForm'>
            <FormTrimmer>


                <FormBodyEvent className='form-1-general-info'>
                    <SectionTitle>
                        General Information
                    </SectionTitle>
                    <DividerGlobal />


                    <UploaderImage
                        onUpload={handleChangeItemPhoto}
                        imgtype='square'
                        aSize={250}
                        currentValue={{ base64: formDataInstance.metadata.image as string }}
                    />
                    <HelperColumn>
                        <HelperText>
                            Upload a clear image of your {`${currentItemType === ItemType.PRODUCT ? "product" : "service"}`}. This helps customers visually understand what you’re offering.

                        </HelperText>
                    </HelperColumn>


                    <CustomDropdown
                        options={ItemType}
                        required
                        title="Type"
                        label="Type"
                        onChange={handleChangeItemType}
                        currentValue={currentItemType}
                        disabled
                    />
                    <HelperColumn>
                        <HelperText>
                            {getItemTypeInfo(currentItemType)}
                        </HelperText>
                    </HelperColumn>




                    <CustomInputField
                        required
                        label={`${currentItemType === ItemType.PRODUCT ? "Product" : "Service"} Name`}
                        isLabelHint={false}
                        onChange={handleChangeItemName}
                        currentValue={formDataInstance.metadata.name}
                        capitalize="word"
                        maxChar={200}
                    />
                    <HelperColumn>
                        <HelperText>
                            Give your {`${currentItemType === ItemType.PRODUCT ? "product" : "service"}`} a short and clear name.
                        </HelperText>
                    </HelperColumn>


                    <CustomInputField
                        required={false}
                        label="Category"
                        isLabelHint={false}
                        onChange={handleChangeItemCategory}
                        currentValue={formDataInstance.metadata.category || ""}
                        capitalize="word"
                        maxChar={200}
                    />
                    <HelperColumn>
                        <HelperText>
                            Select or describe the general category your item belongs to <i>(Ex: Food, Apparel, Service, Electronics)</i>.
                        </HelperText>
                    </HelperColumn>




                    <CustomInputField
                        required={false}
                        label="Description"
                        isLabelHint={false}
                        onChange={handleChangeItemDescription}
                        currentValue={formDataInstance.metadata?.description || ""}
                        capitalize="sentence"
                        maxChar={1500}
                    />
                    <HelperColumn>
                        <HelperText>
                            Provide a detailed yet concise description of the {`${currentItemType === ItemType.PRODUCT ? "product" : "service"}`}. Highlight key features, benefits, usage instructions, materials used, or any unique selling points. This helps customers understand what makes your {`${currentItemType === ItemType.PRODUCT ? "product" : "service"}`} valuable.
                        </HelperText>
                    </HelperColumn>

                </FormBodyEvent>



                <FormBodyEvent className='form-2-settings'>
                    <SectionTitle>
                        Pricing
                    </SectionTitle>
                    <DividerGlobal />


                    <HelperColumn>
                        <HelperText>
                            Specify the pricing model you plan to charge for this {`${currentItemType === ItemType.PRODUCT ? "product" : "service"}`}.
                        </HelperText>
                    </HelperColumn>


                    <CustomInputField
                        required
                        label="Currency"
                        isLabelHint={false}
                        onChange={handleChangeCurrency}
                        currentValue={formDataInstance.metadata.currency || "PHP"}
                        capitalize="character"
                        maxChar={3}
                    />
                    <HelperColumn>
                        <HelperText>
                            Select the currency you use for pricing and costing.
                        </HelperText>
                    </HelperColumn>

                    <CustomDropdown
                        options={PricingType}
                        required
                        title="Pricing Model"
                        label="Pricing Model"
                        onChange={handleItemPricingTypeChange}
                        currentValue={formDataInstance.metadata.pricing.type}
                        disabled
                    />
                    <HelperColumn>
                        <HelperText>
                            {getPricingModelInfo(currentPricingModel)}
                        </HelperText>
                    </HelperColumn>


                    {getPriceInputForm(currentPricingModel)}

                    {/* 
                    <CustomDropdown
                        options={ProfitLevel}
                        required
                        title="Profit Level"
                        label="Profit Level"
                        onChange={handleItemPricingTypeChange}
                        currentValue={formDataInstance.metadata.pricing.type}
                        disabled
                    />
                    <HelperColumn>
                        <HelperText>
           
                        </HelperText>
                    </HelperColumn> */}

                </FormBodyEvent>


                <FormBodyEvent className='form-3-company-info'>
                    <SectionTitle>
                        Company Information
                    </SectionTitle>
                    <DividerGlobal />

                    <UploaderImage
                        onUpload={handleChangeCompanyLogo}
                        imgtype='square'
                        aSize={150}
                    />





                    <CustomInputField
                        required
                        label="Company Name"
                        isLabelHint={false}
                        onChange={handleChangeCompanyName}
                        currentValue={formDataInstance.metadata.company.name}
                        capitalize="word"
                        maxChar={250}
                    />
                    <HelperColumn>
                        <HelperText>
                            Enter the official name of your company or brand.
                        </HelperText>
                    </HelperColumn>




                    <CustomInputField
                        required={false}
                        label="Description"
                        isLabelHint={false}
                        onChange={handleChangeCompanyDescription}
                        currentValue={formDataInstance.metadata.company?.description || ""}
                        capitalize="sentence"
                        maxChar={1500}
                    />
                    <HelperColumn>
                        <HelperText>
                            Briefly describe what your company does. This gives context to clients and partners.
                        </HelperText>
                    </HelperColumn>



                </FormBodyEvent>






                <FormBodyEvent className='form-4-costing'>
                    <SectionTitle>
                        Costing Breakdown
                    </SectionTitle>
                    <DividerGlobal />

                    <HelperColumn>
                        <HelperText>
                            List all costs <i>(Ex: materials, labor, logistics)</i> that go into your product or service. This powers Price Genie to generate business insights like suggested SRP, profit margin, and ROI.
                        </HelperText>
                    </HelperColumn>
                    <CostingManager
                        currentList={formDataInstance.metadata.breakdown.costing.items || []}
                        itemName='Item'
                        onUpdate={handleUpdateCostingList}
                    />

                    <CustomInputField
                        required
                        label="Total Supply"
                        isLabelHint={false}
                        onChange={handleChangeTotalSupply}
                        currentValue={formDataInstance.metadata.breakdown.costing.totalSupply.toString()}
                        regex='numbers'
                        maxChar={25}
                    />
                    <HelperColumn>
                        <HelperText>
                            This is the estimated number of units you can produce or sell based on your total available cost inputs and unit breakdown. Useful for planning inventory and forecasting sales.
                        </HelperText>
                    </HelperColumn>






                </FormBodyEvent>






                <DividerGlobal />

                <DuoButton
                    textButtonA='Cancel'
                    textButtonB={!!formData ? "Save Changes" : "Proceed"}
                    onClickButtonA={handleCancel}
                    onClickButtonB={handleSubmitSave}
                    isDisabledButtonB={!isProceedEnabled}
                    strictMode={true}
                />
                {isDevEnvironment() &&
                    <ButtonPrimaryConfirm
                        onClick={handleViewTestInstance}
                    >
                        View Class Instance
                    </ButtonPrimaryConfirm>
                }
            </FormTrimmer>
        </BodyContainer >
    );
}


export default FormPriceGenie;
