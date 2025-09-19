import './App.css';
import AppRoutes from './routes/AppRoutes';
import { LanguageProvider } from './features/i18n/LanguageProvider';
import { Toaster } from 'sonner';






function App() {
  return (
    <LanguageProvider>
      <Toaster />
      <div className="w-screen h-screen overflow-x-hidden">

        <AppRoutes />
      </div>
    </LanguageProvider>
  );
}

export default App;
