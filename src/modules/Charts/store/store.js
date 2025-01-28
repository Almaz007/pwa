import { create } from "zustand";
import Papa from "papaparse";

export const useOscilogramms = create((set, get) => ({
  cfgData: {},
  cfgDataLoad: false,
  cfgError: "",
  cfgLoaded: false,

  sginalsData: {},
  signalDataLoad: false,
  signalDataError: "",
  signalsLoaded: false,

  chartsData: [],
  cursorIndex: 0,

  updateCursorIndex: (idx) => {
    const { cursorIndex } = get();
    if (cursorIndex !== idx) {
      set({ cursorIndex: idx });
    }
  },
  handleCfgFile: (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    let decoder = new TextDecoder("windows-1251");

    reader.readAsArrayBuffer(file);

    reader.onload = function () {
      const text = decoder.decode(reader.result).split("\r\n");
      const cfgData = {};

      const countsData = text[1].split(",");

      cfgData["countsInfo"] = {
        total: +countsData[0],
        analogueChannelsCount: +countsData[1]?.slice(0, -1),
        discreteChannelsCount: +countsData[2]?.slice(0, -1),
      };
      console.log(cfgData);

      const channelsData = text.slice(2, 2 + cfgData.countsInfo.total);
      const { analogueChannelsCount, discreteChannelsCount } =
        cfgData.countsInfo;

      cfgData["channelsData"] = {
        analogueChannels: channelsData.slice(0, analogueChannelsCount),
        discreteChannels: channelsData.slice(analogueChannelsCount),
      };

      set({
        cfgData: { fileName: file.name, ...cfgData },
        cfgLoaded: true,
      });
    };

    reader.onerror = function () {
      set({ cfgError: reader.error });

      console.log(reader.error);
    };
  },
  handleDataFile: (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: false,
      dynamicTyping: true,
      complete: function (results) {
        console.log("Parsed CSV data:", results.data);

        set({
          sginalsData: {
            fileName: file.name,
            signals: results.data,
          },
          signalsLoaded: true,
        });
      },
      error: function (error) {
        set({ signalDataError: error, signalsLoaded: false });
        console.error("Error parsing CSV:", error);
      },
    });
  },
  generateChartsData: () => {
    const {
      cfgData,
      sginalsData: { signals },
    } = get();
    const { discreteChannels, analogueChannels } = cfgData.channelsData;
    const { analogueChannelsCount } = cfgData.countsInfo;

    const chartsData = [];
    [...analogueChannels].map((chanel, index) => {
      let [number, id] = chanel.split(",");
      index = index + 2;
      // const xyData = signals.map(signal => ({
      // 	x: signal[1],
      // 	y: signal[index]
      // }));
      const xyData = signals.reduce(
        (acc, signal) => {
          acc["xData"].push(signal[1]);
          acc["yData"].push(signal[index]);
          return acc;
        },
        { xData: [], yData: [] }
      );

      const dataForChannel = {
        name: id,
        id: id + " " + number,
        xyData,
        visible: true,
      };

      chartsData.push(dataForChannel);
    });

    console.log(chartsData);
    set({
      chartsData: chartsData,
    });
  },
  visibilityControl: (chartId) => {
    console.log(chartId);
    const { chartsData } = get();
    const newChartsData = [...chartsData];

    newChartsData.forEach((item) => {
      if (item.id === chartId) {
        console.log("найден");
        item.visible = !item.visible;
      }
    });

    set({ chartsData: [...newChartsData] });
  },
}));
export const useZoomStore = create((set) => ({
  scaleX: { min: 0, max: 5499750 }, // Начальные значения
  setScaleX: (min, max) => set({ scaleX: { min, max } }),
}));
