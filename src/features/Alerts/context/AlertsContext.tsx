import React, { createContext, useContext, useState, ReactNode } from 'react';

type AlertsContextType = {
    value: any;
    setValue: (v: any) => void;
};

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState(null);
    return (
        <AlertsContext.Provider value={{ value, setValue }}>
            {children}
        </AlertsContext.Provider>
    );
};

export const useAlertsContext = () => {
    const context = useContext(AlertsContext);
    if (!context) throw new Error('useAlertsContext must be used within AlertsProvider');
    return context;
};
