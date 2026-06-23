// In dev, Vite proxies /api → http://localhost:3000 (see vite.config.ts)
// In production, set VITE_API_URL env var to the backend origin.
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : 'http://localhost:3000/api/v1';
const TENANT_ID = import.meta.env.VITE_TENANT_ID || 'default-tenant-hub';

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  let token = localStorage.getItem('dev_jwt');
  
  if (!token && !path.includes('/dev/token')) {
    try {
      const res = await fetch(`${BASE_URL}/dev/token?role=sales_exec`);
      const data = await res.json();
      token = data.access_token;
      localStorage.setItem('dev_jwt', token || '');
    } catch (e) {
      console.warn('Failed to fetch dev token');
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT_ID,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && !(options as any)._retry) {
    localStorage.removeItem('dev_jwt');
    return apiFetch(path, { ...options, _retry: true } as any);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Quotes
  getLiveList: (status: string = 'all', page: number = 1, limit: number = 10) => apiFetch(`/quotes/live-list?status=${status}&page=${page}&limit=${limit}`),
  deleteQuote: (id: string) => apiFetch(`/quotes/${id}`, { method: 'DELETE' }),
  getQuoteDetails: (id: string) => apiFetch(`/quotes/details/${id}`),
  createQuote: (data: { clientName: string; eventType: string; eventDate?: string; expectedGuests?: string; metadata?: any }) => 
    apiFetch('/quotes', { method: 'POST', body: JSON.stringify(data) }),
  updateQuote: (id: string, data: { clientName: string; eventType: string; eventDate?: string; expectedGuests?: string; metadata?: any }) =>
    apiFetch(`/quotes/${id}/update`, { method: 'POST', body: JSON.stringify(data) }),
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

  // Audit Logs
  getAuditLogs: () => apiFetch('/audit-logs'),

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

  // Notifications & Comments
  getNotifications: async () => apiFetch('/notifications'),
  markAllNotificationsRead: async () => apiFetch('/notifications/read-all', { method: 'PATCH' }),
  getComments: async (quoteId: string) => apiFetch(`/quotes/${quoteId}/comments`),
  addComment: async (quoteId: string, content: string, clientEmail?: string, isPrivate: boolean = true) => 
    apiFetch(`/quotes/${quoteId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, clientEmail, isPrivate })
    }),

  // Proposals
  generateProposal: async (data: any) => apiFetch('/proposals/generate', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
};
