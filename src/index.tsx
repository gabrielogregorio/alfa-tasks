import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/tailwindConfig.css';
import { TasksPage } from './tasks';
import { TaskProvider } from './tasks/contexts/taskContext';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="*" element={<TasksPage />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
