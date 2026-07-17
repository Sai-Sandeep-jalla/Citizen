import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MetadataProvider } from './context/MetadataContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MetadataProvider>
          <AuthProvider>
            <AppRoutes />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#333333',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '500',
                  borderRadius: '8px',
                },
                success: {
                  style: {
                    borderLeft: '4px solid #10B981',
                  }
                },
                error: {
                  style: {
                    borderLeft: '4px solid #EF4444',
                  }
                }
              }}
            />
          </AuthProvider>
        </MetadataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;