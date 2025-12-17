export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isNew: boolean;
  type: 'inventory' | 'transfer' | 'alert' | 'system';
  relatedSample?: {
    sampleId: string;
    currentLocation: string;
    type: string;
  };
  relatedTransfer?: {
    transferId: string;
    status: string;
    expectedDelivery: string;
  };
}