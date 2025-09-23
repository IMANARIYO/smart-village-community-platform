import './App.css';
import AppRoutes from './routes/AppRoutes';
import { LanguageProvider } from './features/i18n/LanguageProvider';
import { Toaster } from 'sonner';
import { VillageProvider } from './features/homePages/context/VillageContext';
import { SEOHead } from './components/SEO';
import { useEffect, useState } from 'react';
import api from './utils/api';


function App() {
  const [apiTestResult, setApiTestResult] = useState<string | null>(null);

  useEffect(() => {
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

    // Test Axios connection
    api.get('/user/me') // adjust this endpoint if needed
      .then(res => {
        console.log('API response:', res.data);
        setApiTestResult('✅ API connection successful!');
      })
      .catch(err => {
        console.error('API error:', err);
        setApiTestResult('❌ API connection failed. Check VITE_API_URL or proxy.');
      });
  }, []);

  return (
    <LanguageProvider>
      <VillageProvider>
        <SEOHead />
        <Toaster />
        <div className="w-screen h-screen overflow-x-hidden">
          <AppRoutes />
          {/* Show API test result */}
          {apiTestResult && (
            <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded shadow-lg">
              {apiTestResult}
            </div>
          )}
        </div>
      </VillageProvider>
    </LanguageProvider>
  );
}

export default App;
