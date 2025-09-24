import './App.css';
import AppRoutes from './routes/AppRoutes';
import { LanguageProvider } from './features/i18n/LanguageProvider';
import { Toaster } from 'sonner';
import { VillageProvider } from './features/homePages/context/VillageContext';
import { SEOHead } from './components/SEO';
import { Analytics } from "@vercel/analytics/next"



function App() {


  ;

  return (
    <LanguageProvider>
      <VillageProvider>
        <SEOHead />
        <Toaster />
        <div className="w-screen h-screen overflow-x-hidden">
          <AppRoutes />

        </div>
        <Analytics />
      </VillageProvider>
    </LanguageProvider>
  );
}

export default App;
