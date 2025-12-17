export interface ActivityLog {
  id: number;
  event: string;
  type: 'Blood' | 'Plasma' | 'Serum' | 'Tissue' | 'Other';
  content: string;
  source: string;
  dateTo: string;
}

export interface ActivityFilters {
  status: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  searchQuery: string;
}