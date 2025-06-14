'use client';








import { PriceGenie } from '@/SDK/tools/business/business-pricing-genie';
import FormPriceGenie from './FormPriceGenie';
import ControllerPriceGenie from './ControllerPriceGenie';


const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4em 1em;
  width: 100%;



  gap: 15px;
  background-color: transparent;
  align-items: center;

    /* Hide scrollbar for Webkit browsers (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */


  @media (max-width: 768px) {
  padding: 0px 10px;
   margin: 5em 0.4em;
      margin-top: 1em;
    max-width: 380px;
      
  }
  
`;



const RowContainer = styled.div`
  display: flex;
    padding: 5px 25px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

`;

const HeaderCTAColumn = styled.div`
display: flex;

flex-direction: column;
gap: 10px;
align-items: flex-end;

width: 100%;
 @media (max-width: 768px) {
    width: 100%;
    }

`;



const CTARowContainer = styled.div`
  display: flex;
  
  flex-direction: row;
  gap: 10px;
  max-width: 800px;
  max-height: 50px;


    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
          max-height: unset;
    }

`;



// Styled components based on the provided CSS
const StyledDialogOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  width: inherit;
  backdrop-filter: blur(5px);
  z-index: 300;
  
`;

const ScrollContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // IMPORTANT for iOS
  touch-action: pan-y; // Allows drag scroll
  display: flex;
  flex-direction: column;

  position: relative;


    @media (max-width: 768px) {
        padding: 0px;
    }
`;


const StyledDialogContent = styled(Drawer.Content)`
     background:  linear-gradient(90deg, rgba(20,75,191,0) 0%, rgba(117,12,12,1) 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-left: 25px;

  position: fixed;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 700px;
  top: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  backdrop-filter: blur(45px);

  @media (max-width: 768px) {
background-color:  ${({ theme }) => theme.colors.primaryBackground};
    width: 100%;
    right: 0;

    margin-left: 0px;
    margin-right: 0px;
  }
`;

const StyledDialogTitle = styled(Drawer.Title)`
height: 0px;
display: none;
`;



const StyledDialogDescription = styled(Drawer.Description)`
height: 0px;
display: none;
`;



const CloseButton = styled(ButtonPrimaryConfirm)`
  width: 100%;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 0px transparent;
  border-radius: 0px;
  padding: 5px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.14);
  transition: height 0.18s ease-in, box-shadow 0.3s ease-in, background-color 0.1s ease-in;

  &:hover {
    height: 40px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryBackground};
    box-shadow: 0 5px 9px rgba(0, 0, 0, 0.24);
  
  }
`;




const TitleHeader = styled.h1`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.header};
  font-weight: ${({ theme }) => theme.typography.weights.title};
  text-align: left;
  min-width: 270px;

  text-overflow: ellipsis;
    user-select: none;

      @media (max-width: 768px) {
      text-align: center;
        min-width: 200px;
  font-size: ${({ theme }) => theme.typography.sizes.subject};
  }
`;





const HeaderTitleColumn = styled.div`
display: flex;

flex-direction: column;
gap: 10px;
align-items: flex-start;
width: 60%;
 @media (max-width: 768px) {
    width: 80%;
    }

`;

const ToolDescription = styled.p`
text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
 font-size: 12px;


 @media (max-width: 768px) {
    font-size: 10px;
    text-align: center;
    }

`;



const TitleBackButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  max-height: 50px;



    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
          max-height: unset;
    }

`;



const GoBackContainer = styled.div`

    @media (max-width: 768px) {
   display: none;
  }
`;


const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;


`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
   align-items: center;
   width: 100%;
   max-width: 900px;
   color: ${({ theme }) => theme.colors.textPrimary};


`;

const ComingSoonText = styled.div`
text-align: left;
  color: ${({ theme }) => theme.colors.brand.green};
 font-size: 16px;


 @media (max-width: 768px) {
    font-size: 12px;

    }

`;

const globalToolID = ZelijahToolsID.BUSINESS_PRICE_GENIE;

export const WindowPriceGenie = () => {


    const router = useRouter();

    const [isDrawerOpen, setToggleDrawer] = useState<boolean>(false);
    const [sheetView, setSheetView] = useState<string | null>(null);

    const [simulationMode, setSimulationMode] = useState<boolean>(false);


    const [contentInstance, setContentInstance] = useState<PriceGenie>(
        () => PriceGenie.initialize()
    );



    useEffect(() => {
        const debouncedLoad = debounce(async () => {
            const autosaveData = await idbLoadBlob(globalToolID);
            if (!!autosaveData?.data) {
                const blobFile = autosaveData.data;
                const loadedZWorldData = await loadSavedZWorldData(blobFile);

                if (loadedZWorldData.t !== globalToolID) {
                    toast.error("Incompatible autosave file detected.");
                    return;
                }

                const parsedNewInstance = PriceGenie.parseFromJSON(loadedZWorldData.j as object).toggleSimulation(false);

                setSimulationMode(false);

                setContentInstance(parsedNewInstance);
                console.log('Autosave successfully loaded.');
                toast.success('Autosave Loaded', {
                    description: 'Your previous session has been restored successfully.'
                });

            } else {
                const newSessionInstance = PriceGenie.initialize();

                setContentInstance(newSessionInstance);
            }
        }, 150); // Debounce delay in ms

        debouncedLoad();

        return () => {
            debouncedLoad.cancel(); // Cancel on cleanup
        };

    }, []);


    // Autosave every time content changes
    useEffect(() => {
        const timeout = setTimeout(() => {
            const jsonDocument = contentInstance.toJSON();
            const autosaveBlob = autoSaveZWorldData(jsonDocument, globalToolID, `${contentInstance.metadata.name} - Price Genie`, toolData?.version)

            idbSaveBlob(globalToolID, autosaveBlob);
            console.log('Autosaved changes.');
            toast.success('Changes Autosaved', {
                description: 'Your latest updates have been saved automatically.'
            });

        }, 1000); // Autosave every 1s after typing stops

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentInstance]);







    useEffect(() => {
        trackEvent("views", `Tools_View_${globalToolID}`, 1);
    }, []);



    const handleGoBack = () => {
        if (isDevEnvironment()) console.log("Going Back Button");
        router.push('/tools');
    }


    const handleManageEditFillOut = () => {
        if (isDevEnvironment()) console.log("Handling Fill Out Button");
        setSheetView("manage-edit");
        setToggleDrawer(true)

    };









    const handleCloseDrawer = () => {
        if (isDevEnvironment()) console.log("Closing Drawer");
        setToggleDrawer(false);

        setSheetView(null);

    };


    const handleSaveChanges = (data: PriceGenie) => {
        if (isDevEnvironment()) console.log("Save Changes");
        setContentInstance(data);
        setToggleDrawer(false);

        setSheetView(null);

    };




    const handleUpdateGenieMode = (input: boolean) => {
        if (isDevEnvironment()) console.log("Toggling Genie Mode");


        const updatedInstance = contentInstance.toggleSimulation(input);
        setContentInstance(updatedInstance);
        setSimulationMode(input);
    }







    const getSheetViewWindow = (sheetView: string | null) => {
        switch (sheetView) {
            case "manage-edit":
                return (
                    <FormPriceGenie
                        formData={contentInstance}
                        onSave={handleSaveChanges}
                        onSubmit={handleSaveChanges}
                        onCancel={handleCloseDrawer}
                    />

                );

            case "view-instance":
                return (
                    null
                );

            default:
                return null;
        }
    };






   



    const handleRefreshInstance = (data: PriceGenie) => {

        const updatedInstance = PriceGenie.parseFromJSON(data);
        setContentInstance(updatedInstance);

    }











    return (
        <RootContainer className='rootWindowPriceGenie'>
            <RowContainer>
                <HeaderTitleColumn>
                    <TitleBackButtonRow>
                        <GoBackContainer>
                            <GoBackButton onClick={handleGoBack} />
                        </GoBackContainer>

                        <TitleHeader>{toolData?.metadata.name || "Unknown Tool"}</TitleHeader>
                    </TitleBackButtonRow>

                    <ToolDescription>
                        {toolData?.metadata.description || "No description available for this tool yet."}
                    </ToolDescription>
                </HeaderTitleColumn>

                <HeaderCTAColumn>


                    <CTARowContainer>
                        <ButtonPrimaryConfirm onClick={() => document.getElementById(`file-upload-invoice`)?.click()}>
                            Import
                        </ButtonPrimaryConfirm>
                        <input
                            id={`file-upload-invoice`}
                            type="file"
                            accept=".zworld"
                            onChange={handleReadFile}
                            style={{ display: 'none' }}
                        />


                        <ButtonPrimaryConfirm
                            onClick={handleDownloadZWorldFile}
                        >
                            Export
                        </ButtonPrimaryConfirm>

                        <ButtonPrimaryConfirm
                            onClick={handleManageEditFillOut}
                        >
                            Edit
                        </ButtonPrimaryConfirm>


                        <ButtonPrimaryConfirm
                            onClick={handleClearSession}
                        >
                            Restart
                        </ButtonPrimaryConfirm>



                        <ButtonPrimaryConfirm

                            onClick={handleDownloadPDF}

                        >

                            Download PDF
                        </ButtonPrimaryConfirm>

                    </CTARowContainer>


                </HeaderCTAColumn>


            </RowContainer>




            <DividerGlobal />
            {
                !!contentInstance

                    ?
                    <ControllerPriceGenie
                        data={contentInstance}
                        isSimulating={simulationMode}
                        onUpdate={handleRefreshInstance}
                        onSwitchMode={handleUpdateGenieMode}
                    />

                    :
                    <DynamicPlaceholder>
                        Preparing the magic...
                    </DynamicPlaceholder>

            }


        </RootContainer >
    );

};
export default WindowPriceGenie;

