import React, { useEffect, useState } from 'react';

import styled from "styled-components";
import { DEFAULT_IMAGE } from '@/assets/assets';
import { formatAmountCurrency, formatPercentage, isDevEnvironment } from '@/utils/helper';

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import RowTextItem from '@/components/foundations/RowTextItem';

import { DividerGlobal, SectionTitleFrame } from '@/globals/styled-components';

import { ItemType, PriceGenie } from '@/SDK/tools/business/business-pricing-genie';
import CBaseCostingItem from '@/components/functional/CostingManager/CBaseCostingItem';


import StyledIconButton from '@/components/foundations/StyledIconButton';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import theme from '@/globals/theme';
import CustomToggleSwitch from '@/components/foundations/CustomToggleSwitch';
import VerticalSlider from '@/components/functional/VerticalSlider';
import HorizontalSlider from '@/components/functional/HorizontalSlider';
import HelperHover from '@/components/foundations/HelperHover';

import { toast } from 'sonner';
import { ButtonPrimaryConfirm } from '@/globals/buttons';
import CustomDropdown from '@/components/foundations/CustomDropdown';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ReduxSupabaseUSessionRootState } from '@/redux/slices/usession-supabase';
import { User } from '@supabase/supabase-js';

import EditableText from '@/components/foundations/EditableText';

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 10px;
  padding: 10px;
 
  
    @media (max-width: 768px) {
        margin: 0px;
        padding: 0px;

    }
`;

const ControllerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 100%;
  width: 100%;
  padding: 35px;
  margin: 0px 30px;
  max-width: 950px;

  border: 1px solid ${({ theme }) => theme.colors.primary};


    @media (max-width: 768px) {
    margin: 0px;
      padding: 0px;
      border: 1px solid transparent};
    }
`;


const BodyColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  gap: 5px;
 
  

`;

const ItemInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 65%;
  gap: 5px;

 
  
    @media (max-width: 768px) {
        width: 100%;
          margin-top: 10px;
    }
`;



const ItemInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 5px;

 
  
    @media (max-width: 768px) {
    flex-direction: column;

    }
`;

// const ImageColumn = styled.div`
//   display: flex;

//   width: 100%;
//   max-width: 250px;

//   justify-content: flex-start;
//   flex-direction: column;
//   align-items: center;
//   gap: 15px;

// `;

const ItemImage = styled.div`
  height: 250px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 250px;
  background-color: transparent;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);

   @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

`;



const ItemCategoryText = styled.p`
font-size: 14px;
margin: unset;
color: ${({ theme }) => theme.colors.textPrimary};
   text-overflow: ellipsis;
   overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const ItemTypeText = styled.div`
font-size: 14px;
padding: 3px 10px;
border-radius: 8px;
margin: unset;
border: 1px solid rgba(255,255,255,0.4);
background-color: ${({ theme }) => theme.colors.brand.red};
color: ${({ theme }) => theme.colors.textPrimary};
`;

const ItemDescriptionText = styled.p`
font-size: 14px;
margin: unset;
color: ${({ theme }) => theme.colors.textSecondary};
text-align: justify;
`;





const RowMerger = styled.div`
  display: flex;

  width: 100%;

  flex-direction: row;
  align-items: center;
  gap: 10px;

`;

const RowBody = styled.div`
  display: flex;

  width: 100%;

  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;

  }

`;

const MobileHeader = styled.div`
  display: none;
  height: 100%;
  width: 100%;
  flex-direction: column;
 
  
    @media (max-width: 768px) {
display: flex;
    }
`;

const DesktopHeader = styled.div`


  height: 100%;
  width: 100%;

  
    @media (max-width: 768px) {
display: none;
    }
`;



const ControlDeckCenterRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;

  /* ——— Mobile ——— */
  @media (max-width: 768px) {
    flex-wrap: wrap;        /* allow items to break to a second “row” */
    gap: 10px;

    /* child1 (left column) */
    & > :nth-child(1) {
      order: 1;             /* first on the flex line          */
      width: calc(50% - 5px);
    }

    /* child3 (right column) */
    & > :nth-child(3) {
      order: 2;             /* second on the flex line         */
      width: calc(50% - 5px);
    }

    /* child2 (centerpiece) */
    & > :nth-child(2) {
      order: 3;             /* pushed to “next line”           */
      width: 100%;          /* takes full width below the pair */
    }
  }
`;


const TitleRow = styled.div`
  display: flex;

  width: 100%;

  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;


const TitleRowColumn = styled.div`
  display: flex;

  width: 100%;

  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 15px;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
        align-items: flex-start;
    }
`;


const ToggleTrimmer = styled.div`
  display: flex;

  width: 100%;
  max-width: 170px;

  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  gap: 15px;


    @media (max-width: 768px) {
       max-width: unset;
    }`;



const FrameTitle = styled.h3`
  font-size: 16px;

  margin: 0px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
 
`;


const HighlightedValue = styled.p < { $color?: string }> `
  font-size: 24px;

  margin: 0px;
  text-align: center;
  color: ${({ theme, $color }) => (!!$color && $color.trim() !== "") ? $color : theme.colors.brand.green};
 
`;

const DifferenceValue = styled.p < { $color?: string }> `
  font-size: 24px;
     text-shadow: 0 0 12px rgba(255, 255, 255, 0.75);
  margin: 0px;
  text-align: center;
  color: ${({ theme, $color }) => (!!$color && $color.trim() !== "") ? $color : theme.colors.brand.green};
 
`;



const FrameContainer = styled.div`
display: flex;
width: 100%;

flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 12px;
padding: 25px;

height: 150px;
 
`;

const FrameCenterContainer = styled.div`
display: flex;
width: 100%;

flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 12px;
padding: 25px;
max-width: 150px;
height: 150px;


  @media (max-width: 768px) {
   max-width: unset;

  }
 
`;


const FrameInsights = styled.div`
display: flex;
width: 100%;

flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 12px;
padding: 5px 10px;
 
`;

const InsightProfitLevelDescription = styled.p`
font-size: 14px;
margin: unset;
color: ${({ theme }) => theme.colors.textPrimary};
text-align: justify;
padding: 0px 10px;
`;


const StackColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 5px;
  margin-top: 10px;
 
  
    @media (max-width: 768px) {

    }
`;



const MobileList = styled.div`
  display: none;
  gap: 10px;

  height: 100%;
  width: 100%;
 
  
    @media (max-width: 768px) {
display: flex;
flex-direction: column;
    }
`;

const DesktopList = styled.div`


  height: 100%;
  width: 100%;

  
    @media (max-width: 768px) {
display: none;
    }
`;

const ClearGenieMagicButton = styled(ButtonPrimaryConfirm)`
width: 100%;
max-width: 240px;



  font-weight: 500;
  font-size: 16px;

    @media (max-width: 768px) {
        max-width: unset;
    }
 
`;


const ApplyGenieMagicButton = styled(ButtonPrimaryConfirm)`
width: 100%;
max-width: 240px;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.75);
  color: ${({ theme }) => theme.colors.primaryBackground};
  background-color: ${({ theme }) => theme.colors.brand.green};
  font-weight: 500;
  font-size: 16px;

    @media (max-width: 768px) {
        max-width: unset;
    }
 
`;

const DropdownTrimmer = styled.div`
  width: 100%;
  max-width: 230px;

   @media (max-width: 768px) {
        max-width: unset;
    }

  
`;




interface ControllerPriceGenieProps {
    data: PriceGenie;
    isSimulating?: boolean;
    onUpdate?(data: PriceGenie): void;
    onSwitchMode?: (bool: boolean) => void;
    onSaveSnapshot?(): void;
}


export const ControllerPriceGenie: React.FC<ControllerPriceGenieProps> = ({ data, isSimulating = false, onUpdate, onSwitchMode }) => {

    const router = useRouter();

    const userData: User = useSelector((state: ReduxSupabaseUSessionRootState) => state.usession.userData);
    const isAuthenticated = useSelector((state: ReduxSupabaseUSessionRootState) => state.usession.isAuthenticated);

    const [contentInstance, setContentInstance] = useState<PriceGenie>(
        () => PriceGenie.parseFromJSON(data)
    );

    const [simulationMode, setSimulationMode] = useState<boolean>(isSimulating);
    const [loading, setIsLoading] = useState<boolean>(false);

    const [originalProfitMargin, setOriginalProfitMargin] = useState<number>(data.metadata.breakdown.income?.profitMargin ?? 0);

    const [geminiLanguage, setGeminiLanguage] = useState<GeminiLanguage>(GeminiLanguage.ENGLISH);


    useEffect(() => {

        if (!!data) {
            const updatedInstance = PriceGenie.parseFromJSON(data)
            setContentInstance(updatedInstance);

            if (!updatedInstance.metadata.isSimulating) {
                setOriginalProfitMargin(updatedInstance.metadata.breakdown.income?.profitMargin ?? 0);
            }
        }

    }, [data]);

    useEffect(() => {


        setSimulationMode(isSimulating);


    }, [isSimulating]);





    const getCostingSummary = () => {

        return (
            <StackColumn className='!my-5'>
                <RowTextItem
                    textKey='Total Cost'
                    textValue={formatAmountCurrency(contentInstance.metadata.breakdown.costing.totalAmount, contentInstance.metadata.currency || "PHP")}
                    extend
                />

                <RowTextItem
                    textKey='Total Supply'
                    textValue={formatAmountCurrency(contentInstance.metadata.breakdown.costing.totalSupply, contentInstance.metadata.currency || "PHP")}

                    extend
                />



            </StackColumn>
        );

    }



    const handleClickRefreshCostingBreakdown = () => {

        if (!!contentInstance) {
            const updatedInstance = contentInstance.refreshCalculations();
            setContentInstance(updatedInstance);

            onUpdate?.(updatedInstance)
        }

    }

    // const handleClickSaveSnapshot = () => {

    //     if (!!contentInstance) {

    //         onSaveSnapshot?.();
    //     }

    // }






    const handleToggleSimulationMode = (bool: boolean) => {

        if (!!contentInstance) {
            console.log("Simulation Mode: ", bool);
            setSimulationMode(bool);
            onSwitchMode?.(bool);


            if (bool) {
                setOriginalProfitMargin(contentInstance.metadata.breakdown.income.profitMargin);
            }
        }

    }

    const handleSimDataQuantity = (multiplier: number, index?: number) => {

        if (!!contentInstance && index !== undefined) {


            const updatedInstance = contentInstance.updateCostItemQuantityMultiplier(index, multiplier);
            setContentInstance(updatedInstance);

            onUpdate?.(updatedInstance)
        }


    }



    const handleSimDataUnitPrice = (multiplier: number, index?: number) => {

        if (!!contentInstance && index !== undefined) {

            const updatedInstance = contentInstance.updateCostItemUnitPriceMultiplier(index, multiplier);
            setContentInstance(updatedInstance);

            onUpdate?.(updatedInstance)
        }


    }


    const handleSimDataTotalSupply = (multiplier: number) => {

        if (!!contentInstance) {
            const updatedInstance = contentInstance.updateTotalSupplyMultiplier(multiplier);
            setContentInstance(updatedInstance);

            onUpdate?.(updatedInstance)
        }

    }


    const handleSimDataSRP = (multiplier: number) => {

        if (!!contentInstance) {
            const updatedInstance = contentInstance.updateSRPMultiplier(multiplier);
            setContentInstance(updatedInstance);

            onUpdate?.(updatedInstance)
        }

    }




    const getProfitLevelLabel = (profitMarginRatio: number): string => {
        const percent = Math.max(0, Math.min(1, profitMarginRatio)) * 100;

        if (percent === 0) return "Unsustainable".toUpperCase();
        if (percent <= 10) return "Bare Minimum".toUpperCase();
        if (percent <= 20) return "Standard".toUpperCase();
        if (percent <= 35) return "Fair Enough".toUpperCase();
        if (percent <= 50) return "High Demand".toUpperCase();
        if (percent <= 70) return "Risky".toUpperCase();
        return "Capitalist".toUpperCase();
    };

    const getProfitLevelDescription = (profitMarginRatio: number): string => {
        const percent = Math.max(0, Math.min(1, profitMarginRatio)) * 100;

        if (percent === 0) {
            return "Warning: A 0% profit margin will likely make your business unsustainable. Please consider applying at least a minimal markup.";
        } else if (percent <= 10) {
            return "Applies the lowest possible markup — ideal for break-even pricing, bulk sales, or gaining market entry.";
        } else if (percent <= 20) {
            return "Uses a typical profit margin — safe, steady, and commonly used for most products and services.";
        } else if (percent <= 35) {
            return "Applies a slightly higher markup — reasonable profit with competitive pricing.";
        } else if (percent <= 50) {
            return "Takes advantage of high market demand — higher margin where customers are willing to pay more.";
        } else if (percent <= 70) {
            return "Applies a profit margin that compensates for uncertain outcomes, high costs, or volatile markets.";
        } else {
            return "Maximizes profit aggressively — best for niche products, exclusive offers, or luxury pricing strategies.";
        }
    };


    const handleChangeLanguage = (input: string) => {

        setGeminiLanguage(input as GeminiLanguage);
    }








    const renderMostExpensiveItemInsight = () => {
        const mostExpensiveItem = contentInstance.getMostExpensiveCostItem();
        if (!mostExpensiveItem) return null;

        return (
            <>
                <DividerGlobal />
                <InsightProfitLevelDescription>
                    <strong className='text-[#d6f500]'>{mostExpensiveItem.label}</strong> is your most expensive item in the costing breakdown amounting to <strong className='text-[#d6f500]'>{formatAmountCurrency(mostExpensiveItem.amount, contentInstance.metadata.currency)}</strong> taking up  <strong className='text-[#d6f500]'>{formatPercentage(mostExpensiveItem.costMargin)}</strong> of your total expenses. To improve your overall profit margin, consider lowering its unit price through supplier negotiations or reducing its quantity — but always balance cost-cutting with maintaining quality and production needs.
                </InsightProfitLevelDescription>
            </>
        );
    };


    //Editable Text Update Setters



    const handleChangeItemName = (input: string) => {

        if (!!input && !!contentInstance) {
            try {


                const updatedPriceGenieInstance = contentInstance.setItemName(input);

                setContentInstance(updatedPriceGenieInstance);
                onUpdate?.(updatedPriceGenieInstance)

                if (isDevEnvironment()) console.log("Current Item Name: ", updatedPriceGenieInstance.metadata.name);
            } catch (error) {
                toast.error(`There's a problem updating the items's name. Please try again or try refreshing. Error: ${error}`)
            }
        }
    };




    return (
        <RootContainer>

            <ControllerBody>
                <BodyColumn>
                    <SectionTitleFrame>
                        <TitleRowColumn>
                            <DropdownTrimmer>
                                <CustomDropdown
                                    title='Language'
                                    label={null}
                                    options={GeminiLanguage}
                                    currentValue={geminiLanguage}
                                    onChange={handleChangeLanguage}
                                />
                            </DropdownTrimmer>


                            {contentInstance.metadata.isSimulating


                                ?



                                contentInstance.metadata.isGenieMagic

                                    ?

                                    <ClearGenieMagicButton
                                        onClick={handleClearGemini}
                                        style={{ width: "100%" }}
                                    >

                                        Clear Genie Results
                                    </ClearGenieMagicButton>


                                    :

                                    <ApplyGenieMagicButton
                                        onClick={handleSendToGemini}
                                        disabled={contentInstance.metadata.isGenieMagic || !contentInstance.metadata.isSimulating || loading}
                                    >

                                        Begin Genie&apos;s Magic
                                    </ApplyGenieMagicButton>



                                :

                                null


                            }

                        </TitleRowColumn>
                    </SectionTitleFrame>




                    <ItemInfoRow>

                        <ItemImage>
                            <StyledImage src={contentInstance.metadata?.image || DEFAULT_IMAGE.src} />
                        </ItemImage>







                        <ItemInfoColumn>

                            <EditableText
                                required
                                label={`${contentInstance.metadata.type === ItemType.PRODUCT ? "Product" : "Service"} Name`}
                                isLabelHint={false}
                                onChange={handleChangeItemName}
                                currentValue={contentInstance.metadata.name}
                                capitalize="word"
                                maxChar={200}
                                fontTag="h2"
                                fontSize={24}
                                fontWeight={400}
                                alignment='left'
                                color={theme.colors.textPrimary}
                            />

                            <RowMerger>

                                <ItemTypeText>
                                    {contentInstance.metadata.type}
                                </ItemTypeText>
                                <ItemCategoryText>
                                    {contentInstance.metadata.category}
                                </ItemCategoryText>
                            </RowMerger>

                            <ItemDescriptionText>
                                {contentInstance.metadata.description}
                            </ItemDescriptionText>
                            <StackColumn>

                                <RowTextItem
                                    textKey="Your Target Selling Price"
                                    textValue={formatAmountCurrency(contentInstance.metadata.pricing.basePrice, contentInstance.metadata.currency || "PHP")}
                                    extend
                                    helper="This is the price you intend to sell your product or service for. It may be used to compare against Price Genie&apos;s suggested SRP and to compute projected profits."
                                />

                                <RowTextItem
                                    textKey='Total Supply'
                                    textValue={contentInstance.metadata.breakdown.costing.totalSupply.toString()}
                                    extend
                                    helper="This is the estimated number of units you can produce or sell based on your total available cost inputs and unit breakdown."
                                />

                                <RowTextItem
                                    textKey='Estimated Gross Sales'
                                    textValue={formatAmountCurrency(contentInstance.metadata.breakdown.income.profit.gross, contentInstance.metadata.currency || "PHP")}
                                    extend
                                    helper="Based on your Total Supply and SRP, this is your estimated income before any costs or deductions — a rough look at how much you could make in total."

                                />
                                <RowTextItem
                                    textKey='Estimated Net Profit'
                                    textValue={formatAmountCurrency(contentInstance.metadata.breakdown.income.profit.net, contentInstance.metadata.currency || "PHP")}
                                    extend
                                    helper="Your projected earnings after subtracting all costs from your selling price. This reflects how much you actually make per unit sold."
                                    highlight
                                    colorValue={theme.colors.brand.green}
                                />




                            </StackColumn>

                        </ItemInfoColumn>
                    </ItemInfoRow>






                </BodyColumn>


                <BodyColumn>
                    <SectionTitleFrame>
                        <TitleRowColumn>
                            Projected vs. Optimized Profit
                            <ToggleTrimmer>
                                <CustomToggleSwitch
                                    label="Genie Mode"

                                    onToggle={handleToggleSimulationMode}
                                    currentToggle={simulationMode}
                                    helper='Turn on Genie Mode to try out prices and costs without changing your real data. It’s a safe way to experiment and see how things work.'
                                    isHelperHover
                                    labelWeight={600}
                                />

                            </ToggleTrimmer>


                        </TitleRowColumn>

                    </SectionTitleFrame>

                    <DesktopHeader>

                        <RowBody>
                            <FrameContainer>

                                <HighlightedValue>
                                    {formatPercentage(originalProfitMargin)}
                                </HighlightedValue>

                                <DividerGlobal />
                                <FrameTitle>
                                    Your Target Margin
                                </FrameTitle>


                            </FrameContainer>


                            {isSimulating


                                ?

                                <>

                                    <FrameCenterContainer>
                                        <DifferenceValue
                                            $color={theme.colors.textPrimary}
                                        >
                                            {formatPercentage(contentInstance.getProfitMargin() - originalProfitMargin)}
                                        </DifferenceValue>

                                        <DividerGlobal />
                                        <FrameTitle>
                                            Difference
                                        </FrameTitle>


                                    </FrameCenterContainer>

                                    <FrameContainer>
                                        <HighlightedValue>
                                            {formatPercentage(contentInstance.getProfitMargin())}
                                        </HighlightedValue>

                                        <DividerGlobal />
                                        <FrameTitle>
                                            Genie’s Magic Margin
                                        </FrameTitle>



                                    </FrameContainer>

                                </>



                                :

                                <FrameContainer>

                                    <DifferenceValue
                                        $color={contentInstance.getProfitMargin() > 0 ? theme.colors.textPrimary : theme.colors.error}
                                    >
                                        {getProfitLevelLabel(contentInstance.getProfitMargin() || 0)}
                                    </DifferenceValue>

                                    <DividerGlobal />
                                    <InsightProfitLevelDescription>
                                        {getProfitLevelDescription(contentInstance.getProfitMargin() || 0)}
                                    </InsightProfitLevelDescription>



                                </FrameContainer>



                            }



                        </RowBody>
                    </DesktopHeader>


                    <MobileHeader>

                        <RowTextItem
                            textKey="Your Target Margin"
                            helper="This is your originally intended profit margin, based on your current costs and the SRP (Suggested Retail Price) you initially provided."
                            textValue={formatPercentage(originalProfitMargin)}
                            extend
                            highlight
                        />



                        <RowTextItem
                            textKey="Genie's Magic Margin"
                            helper="This is the simulated profit margin after Price Genie recalculates based on your simulation tweaks or adjusted pricing."
                            textValue={formatPercentage(contentInstance.getProfitMargin())}
                            extend

                            highlight
                        />

                        <RowTextItem
                            textKey="Difference"
                            helper="The difference between your original target margin and the Genie’s simulated margin. Positive means increased profit; negative means reduced margin."
                            textValue={formatPercentage(contentInstance.getProfitMargin() - originalProfitMargin)}
                            extend
                            colorValue={(contentInstance.getProfitMargin() - originalProfitMargin) >= 0 ? theme.colors.brand.green : theme.colors.error}
                            highlight
                        />
                    </MobileHeader>



                </BodyColumn>


                {
                    isSimulating


                        ?
                        <BodyColumn>

                            <ControlDeckCenterRow>


                                <VerticalSlider
                                    label='Total Supply'
                                    displayValue={contentInstance.getTotalSupply()}
                                    onChange={handleSimDataTotalSupply}
                                    incrementValue={0.5}
                                    currentValue={contentInstance.metadata.isGenieMagic ? contentInstance.metadata.genie?.suggestions.multipliers.totalSupply : contentInstance.metadata.multipliers.totalSupply}
                                    helper='Adjusting the total supply increases or reduces the quantity of each cost item proportionally. Increasing supply can reduce unit costs and boost profits — but make sure your distribution and sales can keep up.'
                                />

                                <FrameInsights>
                                    <SectionTitleFrame alignment='center'>
                                        Key Insights
                                    </SectionTitleFrame>
                                    <DifferenceValue
                                        $color={contentInstance.getProfitMargin() > 0 ? theme.colors.textPrimary : theme.colors.error}
                                    >
                                        {getProfitLevelLabel(contentInstance.getProfitMargin() || 0)}
                                    </DifferenceValue>

                                    <DividerGlobal />
                                    <InsightProfitLevelDescription>
                                        {getProfitLevelDescription(contentInstance.getProfitMargin() || 0)}
                                    </InsightProfitLevelDescription>

                                    {renderMostExpensiveItemInsight()}



                                    {contentInstance.metadata.isGenieMagic && !!contentInstance.metadata.genie?.summary
                                        ?

                                        <>
                                            <SectionTitleFrame alignment='center'>
                                                The Genie’s Reveal
                                            </SectionTitleFrame>
                                            <InsightProfitLevelDescription>
                                                {contentInstance.metadata.genie?.summary}
                                            </InsightProfitLevelDescription>
                                        </>

                                        :
                                        null

                                    }



                                </FrameInsights>

                                <VerticalSlider
                                    label='Selling Price'
                                    displayValue={formatAmountCurrency(contentInstance.getSRP(), contentInstance.metadata.currency)}
                                    onChange={handleSimDataSRP}
                                    incrementValue={0.5}
                                    currentValue={contentInstance.metadata.isGenieMagic ? contentInstance.metadata.genie?.suggestions.multipliers.srp : contentInstance.metadata.multipliers.srp}
                                    helper='Raising the SRP can improve profit margins — but be mindful of your market. Pricing too high may affect demand and make your product less competitive.'
                                />
                            </ControlDeckCenterRow>

                        </BodyColumn>

                        :

                        null
                }




                <DividerGlobal />



                <BodyColumn>

                    <SectionTitleFrame>
                        <TitleRow>
                            Costing Breakdown
                            <StyledIconButton
                                icon={ArrowPathIcon}
                                size={25}
                                onClick={handleClickRefreshCostingBreakdown}
                            />

                        </TitleRow>
                    </SectionTitleFrame>





                    <DividerGlobal />

                    <MobileList>
                        {contentInstance.metadata.breakdown.costing.items.map((item, index) => (
                            <CBaseCostingItem
                                index={index}
                                priceGenie={contentInstance}
                                genieMode={isSimulating}
                                itemData={item}
                                currency={contentInstance.metadata.currency}
                                key={index}
                                darkMode={true}
                                onUpdateSimulationDataQuantity={handleSimDataQuantity}
                                onUpdateSimulationDataUnitPrice={handleSimDataUnitPrice}
                            />
                        ))}

                        {getCostingSummary()}

                        <DividerGlobal />
                    </MobileList>

                    <DesktopList>
                        <CostingItemTable
                            data={contentInstance}
                            isSimulating={isSimulating}
                            onUpdateSimulationDataQuantity={handleSimDataQuantity}
                            onUpdateSimulationDataUnitPrice={handleSimDataUnitPrice}
                        />
                        <DividerGlobal />
                    </DesktopList>

                </BodyColumn>
            </ControllerBody>


        </RootContainer >
    );



};

export default ControllerPriceGenie;

const CellColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 0px;

  
`;


const GenieText = styled.span`
    width: 100%;
  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;
  font-size: 10px;
`;




interface CostingItemTableProps {
    data: PriceGenie;
    isSimulating?: boolean;
    onUpdateSimulationDataQuantity?: (multiplier: number, index?: number) => void;
    onUpdateSimulationDataUnitPrice?: (multiplier: number, index?: number) => void;
}

const CostingItemTable: React.FC<CostingItemTableProps> = ({ data, isSimulating, onUpdateSimulationDataQuantity, onUpdateSimulationDataUnitPrice }) => {


    const handleUpdateSimulationDataQuantity = (input: number, index?: number) => {
        if (isDevEnvironment()) console.log("Quantity Index from Cell Data: ", index);

        onUpdateSimulationDataQuantity?.(input, index)
    }

    const handleUpdateSimulationDataUnitPrice = (input: number, index?: number) => {

        if (isDevEnvironment()) console.log("Uprice Index from Cell Data: ", index);

        onUpdateSimulationDataUnitPrice?.(input, index)
    }


    return (
        <Table>
            <TableHeader>
                <TableRow className='hover:bg-[#1e2021]'>
                    <TableHead className="w-[100px] text-white !px-2" colSpan={2}>Item</TableHead>
                    <TableHead className="text-white !px-2 text-center">
                        <RowMerger>
                            Quantity
                            <HelperHover>
                                Reducing the quantity of specific cost items may lower overall costs. However, ensure this won&apos;t compromise product quality or production capacity.
                            </HelperHover>
                        </RowMerger>

                    </TableHead>
                    <TableHead className="text-white !px-2 text-center">Unit</TableHead>
                    <TableHead className="text-right text-white !px-2 text-center">
                        <RowMerger>
                            Unit Price
                            <HelperHover>
                                Consider sourcing from alternative suppliers or negotiating better deals to lower unit prices. Even small savings per item can significantly improve your margins.
                            </HelperHover>
                        </RowMerger>
                    </TableHead>
                    <TableHead className="text-right text-white !px-2 text-center">Amount</TableHead>
                    <TableHead className="text-right text-white !px-2">Cost Margin</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.metadata.breakdown.costing.items.map((item, index) => (


                    <TableRow key={index} className='h-10 hover:bg-[#750c0c]'>


                        <TableCell className="text-white !px-2" colSpan={2}>
                            <CellColumn>
                                <p className='font-medium'>
                                    {item.label}
                                </p>
                                {
                                    data.metadata.isGenieMagic && data.metadata.isSimulating

                                        ?

                                        <GenieText>
                                            {data.getGenieCostingItemByName(item.label)?.output}
                                        </GenieText>

                                        :

                                        null

                                }


                            </CellColumn>

                        </TableCell>
                        <TableCell className="text-white !px-2 text-center">

                            {isSimulating

                                ?

                                <HorizontalSlider
                                    displayValue={data.getCostItemQuantity(index)}
                                    index={index}
                                    showGuides={false}
                                    onChange={handleUpdateSimulationDataQuantity}
                                    incrementValue={0.5}
                                    currentValue={item.multipliers.quantity}

                                />


                                :
                                <>
                                    {item.quantity}
                                </>


                            }



                        </TableCell>
                        <TableCell className="text-white !px-2 text-center">{item.unit}</TableCell>
                        <TableCell className="text-center text-white !px-2">


                            {isSimulating

                                ?

                                <HorizontalSlider
                                    displayValue={formatAmountCurrency(data.getCostItemUnitPrice(index), data.metadata.currency)}
                                    index={index}
                                    showGuides={false}
                                    onChange={handleUpdateSimulationDataUnitPrice}
                                    incrementValue={0.5}
                                    currentValue={item.multipliers.unitPrice}

                                />


                                :
                                <>
                                    {formatAmountCurrency(item.unitPrice, data.metadata.currency)}
                                </>


                            }

                        </TableCell>
                        <TableCell className="text-right text-white !px-2 text-center">{formatAmountCurrency(item.amount, data.metadata.currency)}</TableCell>
                        <TableCell className="text-right text-white !px-2">{formatPercentage(item.costMargin)}</TableCell>






                    </TableRow>





                ))}
            </TableBody>
            <TableFooter style={{ marginTop: 12, paddingTop: 12 }}>

                <TableRow className='h-12 bg-gray-100 hover:bg-[#750c0c] group'>
                    <TableCell className="!px-2 group-hover:text-gray-100" colSpan={6}>Total Cost</TableCell>
                    <TableCell className="text-right !px-2 group-hover:text-gray-100">{formatAmountCurrency(data.metadata.breakdown.costing.totalAmount, data.metadata.currency)}</TableCell>
                </TableRow>

                <TableRow className='h-12 bg-gray-100 hover:bg-[#750c0c] group'>
                    <TableCell className="!px-2 group-hover:text-gray-100" colSpan={6}>Total Supply</TableCell>
                    <TableCell className="text-right !px-2 group-hover:text-gray-100">{data.metadata.breakdown.costing.totalSupply}</TableCell>
                </TableRow>


            </TableFooter>
        </Table >
    )
}



