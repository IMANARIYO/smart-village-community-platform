import './App.css';
import AppRoutes from './routes/AppRoutes';
import { LanguageProvider } from './features/i18n/LanguageProvider';
import { Toaster } from 'sonner';
import { VillageProvider } from './features/homePages/context/VillageContext';






function App() {
  return (

    <LanguageProvider>
      <VillageProvider>
        <Toaster />
        <div className="w-screen h-screen overflow-x-hidden">

          <AppRoutes />
        </div>
      </VillageProvider>
    </LanguageProvider>

  );
}

export default App;
