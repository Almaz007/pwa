import { useState, useRef } from "react";
import { useOscilogramms } from "../store/store";

export const useCharts = () => {
  const {
    handleCfgFile,
    handleDataFile,
    cfgData,
    sginalsData,
    signalsLoaded,
    cfgLoaded,
    generateChartsData,
    chartsData,
    visibilityControl,
  } = useOscilogramms((state) => state);

  const [range, setRange] = useState([0, 22000]);

  const cfgFileBtnRef = useRef(null);
  const dataFileBtnRef = useRef(null);

  const handleCfgButtonClick = () => {
    cfgFileBtnRef.current.click();
  };
  const handleDataButtonClick = () => {
    dataFileBtnRef.current.click();
  };

  const handleZoomIn = () => {
    if (range[1] - range[0] > 30) {
      setRange([range[0], range[1] - 30]);
    }
  };

  const handleZoomOut = () => {
    if (range[1] + 30 <= chartsData[0].xyData.xData.length) {
      setRange([range[0], range[1] + 30]);
      setZoomState({
        xMin: range[0],
        xMax: range[1] + 30,
      });
    }
  };

  const handleMoveLeft = () => {
    if (range[0] > 0) {
      console.log("call");

      setRange([range[0] - 30, range[1] - 30]);
    }
  };

  const handleMoveRight = () => {
    if (range[1] <= chartsData[0].xyData.xData.length) {
      setRange([range[0] + 30, range[1] + 30]);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    visibilityControl(value[0]);
  };
  return {
    handleCfgFile,
    handleDataFile,
    cfgData,
    sginalsData,
    signalsLoaded,
    cfgLoaded,
    generateChartsData,
    chartsData,
    cfgFileBtnRef,
    dataFileBtnRef,
    range,
    handleChange,
    handleCfgButtonClick,
    handleDataButtonClick,
    handleZoomIn,
    handleZoomOut,
    handleMoveLeft,
    handleMoveRight,
  };
};
