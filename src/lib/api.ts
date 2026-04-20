const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export interface CreateDonationPayload {
  type: string;
  amount: number;
  donorName: string;
  donorPhone: string;
  paymentMethod: string;
}

export interface DonationResponse {
  id: string;
  type: string;
  amount: number;
  donorName: string;
  donorPhone: string;
  paymentId: string | null;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  paymentMethod: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StatsResponse {
  total: number;
  totalAmount: number;
  pending: number;
  success: number;
  failed: number;
}

export function createDonation(data: CreateDonationPayload) {
  return apiFetch<DonationResponse>('/donations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getDonation(id: string) {
  return apiFetch<DonationResponse>(`/donations/${id}`);
}

export function getDonationByPaymentId(paymentId: string) {
  return apiFetch<DonationResponse>(`/donations/payment/${paymentId}`);
}

export function updateDonationStatus(id: string, status: 'SUCCESS' | 'FAILED') {
  return apiFetch<DonationResponse>(`/donations/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function getStats() {
  return apiFetch<StatsResponse>('/donations/stats/overview');
}
