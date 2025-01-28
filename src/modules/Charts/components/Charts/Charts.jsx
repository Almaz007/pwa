import { useEffect } from "react";
import { useCharts } from "../../hooks/useCharts";
import UPlotChart from "../UPlotChart/UPlotChart";
import styles from "./Charts.module.css";
import Button from "../../../../components/UI/button/Button";
import CustomSelect from "../../../../components/UI/CustomSelectChanel/CustomSelect";
import ChatInfo from "../ChatInfo/ChatInfo";

export const Charts = () => {
  const {
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
  } = useCharts();

  useEffect(() => {
    if (signalsLoaded && cfgLoaded) {
      generateChartsData();
    }
  }, [signalsLoaded, cfgLoaded]);

  return (
    <div>
      <div className={styles["btn__row"]}>
        <div className={styles["fileBtn"]}>
          <Button handleClick={handleCfgButtonClick}>{"Загрузить cfg"}</Button>
          <input
            ref={cfgFileBtnRef}
            type="file"
            onChange={handleCfgFile}
            accept=".cfg"
            hidden
          />
          {cfgLoaded && (
            <p className="download__status">загружен {cfgData.fileName}</p>
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
            <p className="download__status">загружен {sginalsData.fileName}</p>
          )}
        </div>
      </div>
      {!!chartsData.length && (
        <>
          <div className={styles["btn__row"]}>
            <Button className={styles["btn"]} handleClick={handleZoomIn}>
              Увеличить
            </Button>
            <Button className={styles["btn"]} handleClick={handleZoomOut}>
              Уменьшить
            </Button>
            <Button className={styles["btn"]} handleClick={handleMoveLeft}>
              ← Влево
            </Button>
            <Button className={styles["btn"]} handleClick={handleMoveRight}>
              Вправо →
            </Button>
          </div>
          <CustomSelect channels={chartsData} handleChange={handleChange} />
          <div className={styles["charts"]}>
            {chartsData
              // .slice(0, 3)
              .map((data) =>
                data.visible ? (
                  <div key={data.id} className={styles["row__chart"]}>
                    <ChatInfo data={data} />
                    <UPlotChart
                      key={data.id}
                      data={data}
                      // options={options}
                      range={range}
                    />
                  </div>
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
