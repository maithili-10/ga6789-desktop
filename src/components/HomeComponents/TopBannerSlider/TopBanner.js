import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import arrowRight from "../../../assets/HomeImages/ArrowRight.webp";
import arrowLeft from "../../../assets/HomeImages/ArrowLeft.webp";
import banner1 from "../../../assets/HomeImages/b-1.webp";
import banner2 from "../../../assets/HomeImages/b-2.jpg";
import banner3 from "../../../assets/HomeImages/b-3.webp";
import banner4 from "../../../assets/HomeImages/b-4.webp";
import banner5 from "../../../assets/HomeImages/b-5.webp";
import banner6 from "../../../assets/HomeImages/b-6.jpg";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { autoPlay } from "react-swipeable-views-utils";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    id: 1,
    image: banner6,
  },
  {
    id: 2,
    image: banner2,
  },
  {
    id: 3,
    image: banner3,
  },
  {
    id: 4,
    image: banner4,
  },
  {
    id: 5,
    image: banner5,
  },
  {
    id: 6,
    image: banner1,
  },
];

export default function TopBanner() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    if (activeStep === 5) {
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      setActiveStep(5);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  // console.log(activeStep);
  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x" : "x-reverse"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step) => (
          <div key={step.id}>
            <Box
              component="img"
              sx={{
                height: "auto",
                display: "block",
                overflow: "hidden",
                width: "100%",
              }}
              src={step.image}
              alt={step.label}
            />
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{
          ".MuiMobileStepper-dots": {
            position: "relative",
            marginTop: "-70px ",
          },
          ".MuiMobileStepper-dotActive": {
            backgroundColor: "white",
          },
        }}
        style={{ padding: "0 8%" }}
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            // disabled={activeStep === maxSteps - 1}
            style={{ marginTop: "-40%", cursor: "pointer" }}
          >
            <img src={arrowRight} alt="right" />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            // disabled={activeStep === 0}
            style={{ marginTop: "-40%", cursor: "pointer" }}
          >
            <img src={arrowLeft} alt="left" />
          </Button>
        }
      />
    </Box>
  );
}
