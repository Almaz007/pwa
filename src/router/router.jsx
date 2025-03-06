import { createBrowserRouter, Navigate } from "react-router-dom";
import AccidentLog from "../pages/accidentLog/AccidentLog";
import DeviceInfo from "../pages/deviceInfo/DeviceInfo";
import EventLog from "../pages/eventLog/EventLog";
import Maximeters from "../pages/maximeters/Maximeters";
import Oscilogramms from "../pages/oscilogramms/Oscilogramms";
import TerminalPage from "../pages/TerminalPage/TerminalPage";
import Layout from "../components/layout/Layout";

import Testing from "../pages/settings/testing/Testing";
import GeneralSettings from "../pages/settings/generalSettings/GeneralSettings";
import CommunicationSettings from "../pages/settings/CommunicationSettings/components/CommunicationSettings/CommunicationSettings";

import Monitoring from "../pages/monitoring/Monitoring";
import FlexibleLogicPage from "../pages/flexibleLogic/FlexibleLogicPage";
import {
  FunctionEditingArea,
  LogicalEditor,
  LogicalEditorLayout,
} from "../modules/LogicalEditor";
import DeviceIndication from "../pages/deviceIndication/DeviceIndication";
import { TestPage } from "../pages/test/Test";
import { Ustavki } from "../modules/Ustavki/components/Ustavki/UIstavki";
import { UstavkiPage } from "../pages/ustavki/UstavkiPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TerminalPage />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
      {
        path: "monitoring",
        element: <Monitoring />,
      },
      {
        path: "maximeters",
        element: <Maximeters />,
      },
      {
        path: "eventLog",
        element: <EventLog />,
      },
      {
        path: "accidentLog",
        element: <AccidentLog />,
      },
      {
        path: "oscillograms",
        element: <Oscilogramms />,
      },
      {
        path: "deviceIndication",
        element: <DeviceIndication />,
      },
      {
        path: "ustavki",
        element: <UstavkiPage />,
      },

      {
        path: "flexibleLogic",
        element: <LogicalEditorLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={"logicalEditor"} />,
          },
          {
            path: "logicalEditor",
            element: <LogicalEditor />,
          },
          {
            path: "functionEditingArea/:id",
            element: <FunctionEditingArea />,
          },
        ],
      },
      {
        path: "functionEditingArea/:id",
        element: <FunctionEditingArea />,
      },
      {
        path: "settings",
        children: [
          {
            path: "testing",
            element: <Testing />,
          },
          {
            path: "generalSettings",
            element: <GeneralSettings />,
          },
          {
            path: "communicationSettings",
            element: <CommunicationSettings />,
          },
        ],
      },
      {
        path: "deviceInfo",
        element: <DeviceInfo />,
      },
    ],
  },
]);
