import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Terminal from './pages/terminal/Terminal.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Task from './pages/task/Task.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Terminal />
			},
			{
				path: '/task',
				element: <Task />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
