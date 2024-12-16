import { FaTerminal, FaBookDead, FaBook, FaExchangeAlt } from "react-icons/fa";
import { FiMonitor, FiSliders } from "react-icons/fi";
import { GiValve } from "react-icons/gi";
import { FaChartColumn } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdPermDeviceInformation } from "react-icons/md";

export const links = [
  {
    id: 1,
    path: "/",
    text: "Терминал",
    icon: FaTerminal,
  },
  {
    id: 2,
    path: "monitoring",
    text: "Мониторинг",
    icon: FiMonitor,
  },

  {
    id: 3,
    path: "maximeters",
    text: "Максиметры",
    icon: GiValve,
  },
  {
    id: 4,
    path: "eventLog",
    text: "Журнал событий",
    icon: FaBook,
  },
  {
    id: 5,
    path: "accidentLog",
    text: "Журнал аварий",
    icon: FaBookDead,
  },
  {
    id: 6,
    path: "oscillograms",
    text: "Осциллограммы",
    icon: FaChartColumn,
  },
  {
    id: 7,
    path: "deviceIndication",
    text: "Модуль индикации",
    icon: FiSliders,
  },
  {
    id: 8,
    path: "setpoints",
    text: "Уставки",
    icon: FaExchangeAlt,
  },
  {
    id: 9,
    path: "settings",
    text: "Настройки",
    icon: IoMdSettings,
    links: [
      {
        id: 91,
        path: "settings/testing",
        text: "Тестирование",
      },
      {
        id: 92,
        path: "settings/generalSettings",
        text: "Общие настройки",
      },
      {
        id: 93,
        path: "settings/communicationSettings",
        text: "Настройки связи",
      },
    ],
  },
  {
    id: 10,
    path: "deviceInfo",
    text: "О устройстве",
    icon: MdPermDeviceInformation,
  },
];
