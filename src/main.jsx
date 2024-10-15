import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
