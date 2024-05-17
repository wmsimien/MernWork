import React from 'react';
import * as ReactDom from 'react-dom/client';

import App from './app/app';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(<App />);
