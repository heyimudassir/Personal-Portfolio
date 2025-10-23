import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ✅ Import toast system
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <App />
      <Toaster
  position="top-center"
  containerStyle={{ top: 80 }}  // jitna neeche chahiye yahan badha sakte hain
  toastOptions={{
    style: {
      background: '#F0ECF6',
      color: '#7661AD',
      borderRadius: '12px',
      fontSize: '14px',
    },
    duration: 3000,
  }}
/>
    </>
  </StrictMode>
);
