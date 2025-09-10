import './App.css';
import AppRoutes from './routes/AppRoutes';
import { LanguageProvider } from './features/i18n/LanguageProvider';
import NyarucyamoVillage from './pages/LandingPage';


function App() {
  return (
    <LanguageProvider>
      <div className="w-screen h-screen overflow-x-hidden">
        <NyarucyamoVillage />
        <AppRoutes />
      </div>
    </LanguageProvider>
  );
}

export default App;
