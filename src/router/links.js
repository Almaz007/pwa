import { FaTerminal, FaBookDead, FaBook, FaExchangeAlt } from "react-icons/fa";
import { FiMonitor, FiSliders } from "react-icons/fi";
import { GiValve } from "react-icons/gi";
import { FaChartColumn } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdPermDeviceInformation } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";

export const links = [
  {
    id: 1,
    path: "/",
    text: "Терминал",
    icon: FaTerminal,
  },
  {
    id: 2,
    path: "test",
    text: "Теcт",
    icon: FaRegLightbulb,
  },
  {
    id: 3,
    path: "monitoring",
    text: "Мониторинг",
    icon: FiMonitor,
  },

  {
    id: 4,
    path: "maximeters",
    text: "Максиметры",
    icon: GiValve,
  },
  {
    id: 5,
    path: "eventLog",
    text: "Журнал событий",
    icon: FaBook,
  },
  {
    id: 6,
    path: "accidentLog",
    text: "Журнал аварий",
    icon: FaBookDead,
  },
  {
    id: 7,
    path: "oscillograms",
    text: "Осциллограммы",
    icon: FaChartColumn,
  },
  {
    id: 8,
    path: "deviceIndication",
    text: "Модуль индикации",
    icon: FiSliders,
  },
  {
    id: 9,
    path: "ustavki",
    text: "Уставки",
    icon: FaExchangeAlt,
  },
  {
    id: 10,
    path: "flexibleLogic",
    text: "Гибкая логика",
    icon: LuBrainCircuit,
  },
  {
    id: 11,
    path: "settings",
    text: "Настройки",
    icon: IoMdSettings,
    links: [
      {
        id: 111,
        path: "settings/testing",
        text: "Тестирование",
      },
      {
        id: 112,
        path: "settings/generalSettings",
        text: "Общие настройки",
      },
      {
        id: 113,
        path: "settings/communicationSettings",
        text: "Настройки связи",
      },
    ],
  },
  {
    id: 12,
    path: "deviceInfo",
    text: "О устройстве",
    icon: MdPermDeviceInformation,
  },
];
