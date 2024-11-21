import { createBrowserRouter, Navigate } from 'react-router-dom';
import AccidentLog from '../pages/accidentLog/AccidentLog';
import DeviceInfo from '../pages/deviceInfo/DeviceInfo';
import EventLog from '../pages/eventLog/EventLog';
import Maximeters from '../pages/maximeters/Maximeters';
import Oscilogramms from '../pages/oscilogramms/Oscilogramms';
import Terminal from '../pages/terminal/Terminal';
import Layout from '../components/layout/Layout';
import Testing from '../pages/settings/testing/Testing';
import GeneralSettings from '../pages/settings/generalSettings/GeneralSettings';
import CommunicationSettings from '../pages/settings/communicationSettings/CommunicationSettings';
import Monitoring from '../pages/monitoring/Monitoring';
import Setpoints from '../pages/setpoints/Setpoints';
import {
	FunctionEditingArea,
	LogicalEditor,
	LogicalEditorLayout
} from '../modules/LogicalEditor';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Terminal />
			},
			{
				path: 'monitoring',
				element: <Monitoring />
			},
			{
				path: 'maximeters',
				element: <Maximeters />
			},
			{
				path: 'eventLog',
				element: <EventLog />
			},
			{
				path: 'accidentLog',
				element: <AccidentLog />
			},
			{
				path: 'oscillograms',
				element: <Oscilogramms />
			},
			{
				path: 'setpoints',
				element: <Setpoints />,
				children: [
					{
						index: true,
						element: <Navigate to={'logicalEditor'} />
					},
					{
						path: 'logicalEditor',
						element: <LogicalEditor />
					},
					{
						path: 'functionEditingArea/:id',
						element: <FunctionEditingArea />
					}
				]
			},
			{
				path: 'functionEditingArea/:id',
				element: <FunctionEditingArea />
			},
			{
				path: 'settings',
				children: [
					{
						path: 'testing',
						element: <Testing />
					},
					{
						path: 'generalSettings',
						element: <GeneralSettings />
					},
					{
						path: 'communicationSettings',
						element: <CommunicationSettings />
					}
				]
			},
			{
				path: 'deviceInfo',
				element: <DeviceInfo />
			}
		]
	}
]);
