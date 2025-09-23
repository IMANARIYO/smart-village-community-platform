import { useState } from 'react';
export function useAlertsHook() { const [state,setState] = useState(null); return { state, setState }; }
