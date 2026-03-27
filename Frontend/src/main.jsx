import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import './index.css';
import App from './App.jsx';
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/*
        Toaster lives here at root level — outside App and RouterProvider.
        This ensures toasts work from ANYWHERE including axios interceptors,
        hooks, and components without needing React context.
      */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          // Default duration — individual toasts can override
          duration: 4000,
          style: {
            fontFamily: 'Cairo, sans-serif',
            direction: 'rtl',
          },
        }}
      />
      <App />
    </Provider>
  </StrictMode>
);