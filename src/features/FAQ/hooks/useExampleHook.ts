import { useState } from 'react';
export function useExampleHook() { const [state,setState] = useState(null); return { state, setState }; }
