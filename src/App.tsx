import './App.css';
import AppRoutes from './routes/AppRoutes';
import { LanguageProvider } from './features/i18n/LanguageProvider';






function App() {
  return (
    <LanguageProvider>
      <div className="w-screen h-screen overflow-x-hidden">

        <AppRoutes />
      </div>
    </LanguageProvider>
  );
}

export default App;
