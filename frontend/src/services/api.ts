// In dev, Vite proxies /api → http://localhost:3000 (see vite.config.ts)
// In production, set VITE_API_URL env var to the backend origin.
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : '/api/v1';
const TENANT_ID = import.meta.env.VITE_TENANT_ID || 'default-tenant-hub';


export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT_ID,
    ...(options.headers || {}),
  };
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Quotes
  getLiveList: (status: string = 'all', page: number = 1) => apiFetch(`/quotes/live-list?status=${status}&page=${page}`),
  getQuoteDetails: (id: string) => apiFetch(`/quotes/details/${id}`),
  createQuote: (data: { clientName: string; eventType: string; eventDate?: string; expectedGuests?: string }) => 
    apiFetch('/quotes', { method: 'POST', body: JSON.stringify(data) }),
  appendItems: (id: string, vid: string, items: any[]) => 
    apiFetch(`/quotes/${id}/versions/${vid}/items`, { method: 'POST', body: JSON.stringify({ items }) }),
  syncQuoteItems: (id: string, items: any[]) => 
    apiFetch(`/quotes/${id}/sync-items`, { method: 'POST', body: JSON.stringify({ items }) }),
  calculateQuote: (id: string, data: { discountGlobal?: number; chargeService?: number }) => 
    apiFetch(`/quotes/${id}/calculate`, { method: 'POST', body: JSON.stringify(data) }),
  requestApproval: (id: string, data: { requester: string; executiveSummary?: string; priority?: string }) => 
    apiFetch(`/quotes/${id}/approvals`, { method: 'POST', body: JSON.stringify(data) }),
  publishQuote: (id: string) => apiFetch(`/quotes/${id}/publish`, { method: 'POST' }),

  // Price Book
  getPriceBook: (category: string = 'venues') => apiFetch(`/quotes/history-pricebook?category=${category}`),
  createRateCard: (data: any) => apiFetch('/quotes/history-pricebook/create', { method: 'POST', body: JSON.stringify(data) }),

  // Approvals
  getApprovalDetails: (id: string) => apiFetch(`/approvals/${id}`),
  updateApprovalState: (appId: string, action: string, feedback?: string) => 
    apiFetch(`/approvals/${appId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action, feedback }),
    }),

  // Dashboard
  getDashboardSummary: () => apiFetch('/dashboard/dashboard-summary'),
  getRecent: () => apiFetch('/dashboard/recent'),
  getPendingApprovals: () => apiFetch('/dashboard/pending-approvals'),
  getTopExecutives: () => apiFetch('/dashboard/top-executives'),
};
