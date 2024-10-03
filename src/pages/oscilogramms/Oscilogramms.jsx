import { useRef, useState, useMemo, useEffect } from "react";
import Button from "../../components/UI/button/Button";
import styles from "./oscilogramms.module.css";
import { useOscilogramms } from "../../store/store";
import VictoryGraph from "../../components/victoryChart/VictoryChart";
import RechartGraph from "../../components/rechart/Rechart";
import ZoomableChart from "../../components/zoomableChart/ZoomableChart";
import D3Graph from "../../components/d3Chart/D3Chart";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import SyncCharts from "../../components/SyncCharts/SyncChart";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "chart.js";

Chart.register(zoomPlugin);

const Oscilogramms = () => {
    const [
        handleCfgFile,
        handleDataFile,
        cfgData,
        sginalsData,
        signalsLoaded,
        cfgLoaded,
        generateChartsData,
        chartsData,
    ] = useOscilogramms((state) => [
        state.handleCfgFile,
        state.handleDataFile,
        state.cfgData,
        state.sginalsData,
        state.signalsLoaded,
        state.cfgLoaded,
        state.generateChartsData,
        state.chartsData,
    ]);

    const [zoomState, setZoomState] = useState({ xMin: 0, xMax: 100 }); // Состояние для общего зума

    // Функция для синхронизации зуммирования
    const [cursorPosition, setCursorPosition] = useState(0);

    const cfgFileBtnRef = useRef(null);
    const dataFileBtnRef = useRef(null);

    const handleCfgButtonClick = () => {
        cfgFileBtnRef.current.click();
    };
    const handleDataButtonClick = () => {
        dataFileBtnRef.current.click();
    };

    const options = useMemo(
        () => ({
            scales: {
                x: {
                    type: "category", // Ось X как категории
                    min: zoomState.xMin, // Используем зум-состояние для масштаба
                    max: zoomState.xMax,
                    ticks: {
                        // autoSkip: true,
                        // maxTicksLimit: 20,
                        display: false,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        // autoSkip: true,
                        // maxTicksLimit: 20,
                        display: false,
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                annotation: {
                    annotations:
                        cursorPosition !== null
                            ? [
                                  {
                                      type: "line",
                                      mode: "vertical",
                                      scaleID: "x",
                                      value: cursorPosition,
                                      borderColor: "blue",
                                      borderWidth: 2,
                                  },
                              ]
                            : [],
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            const label = context.label;
                            const value = context.raw;
                            return `Point: ${label}, Value: ${value}`;
                        },
                    },
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: "x", // Панорамирование по оси X
                        // onPanComplete: ({ chart }) => {
                        //     console.log("pan");
                        //     const panRange = chart.scales.x;
                        //     // Обновляем состояние после панорамирования
                        //     setZoomState({
                        //         xMin: panRange.min,
                        //         xMax: panRange.max,
                        //     });
                        // },
                    },
                    zoom: {
                        wheel: {
                            enabled: true, // Включить зум через колесо мыши
                        },
                        pinch: {
                            enabled: true, // Включить зум через touch-жесты
                        },
                        mode: "x",
                        onZoomComplete: ({ chart }) => {
                            const zoomRange = chart.scales.x;
                            // Синхронизация зуммирования со всеми графиками
                            setZoomState({
                                xMin: zoomRange.min,
                                xMax: zoomRange.max,
                            });
                        },
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
        }),
        [zoomState]
    );

    useEffect(() => {
        if (signalsLoaded && cfgLoaded) {
            generateChartsData();
        }
    }, [signalsLoaded, cfgLoaded]);

    return (
        <div>
            <div className={styles["btn__row"]}>
                <div className={styles["fileBtn"]}>
                    <Button handleClick={handleCfgButtonClick}>
                        {"Загрузить cfg"}
                    </Button>
                    <input
                        ref={cfgFileBtnRef}
                        type="file"
                        onChange={handleCfgFile}
                        accept=".cfg"
                        hidden
                    />
                    {cfgLoaded && (
                        <p className="download__status">
                            загружен {cfgData.fileName}
                        </p>
                    )}
                </div>
                <div className={styles["fileBtn"]}>
                    <Button handleClick={handleDataButtonClick}>
                        {"Загрузить данные"}
                    </Button>
                    <input
                        ref={dataFileBtnRef}
                        type="file"
                        onChange={handleDataFile}
                        hidden
                        accept=".dat, .csv"
                    />
                    {signalsLoaded && (
                        <p className="download__status">
                            загружен {sginalsData.fileName}
                        </p>
                    )}
                </div>
            </div>

            {/* <SyncCharts /> */}
            {!!chartsData.length && (
                <>
                    <CustomSelect channels={chartsData} />
                    <div className={styles["charts"]}>
                        {chartsData
                            // .slice(0, 3)
                            .map((data) =>
                                data.visible ? (
                                    <ZoomableChart
                                        key={data.id}
                                        data={data}
                                        options={options}
                                        cursorPosition={cursorPosition}
                                        setCursorPosition={setCursorPosition}
                                        setZoomState={setZoomState}
                                    />
                                ) : (
                                    ""
                                )
                            )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Oscilogramms;
