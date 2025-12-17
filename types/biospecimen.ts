export interface BioSpecimen {
  id: number;
  sampleId: string;
  currentLocation: string;
  previousLocation: string;
  moveOn: string;
  collectorInfo: string;
  description: string;
  status: 'Confirmed' | 'Moved' | 'Approved' | 'Requested' | 'Rejected';
}

export interface TransferHistory {
  status: string;
  timestamp: string;
  by: string;
  color: string;
}

export interface NewSpecimenData {
  sampleId: string;
  sampleType: string;
  collectionDate: string;
  collectorInfo: string;
  site: string;
  freezer: string;
  rack: string;
  box: string;
  selectedPosition: string;
  diagnosis: string;
  treatmentStatus: string;
  outcomes: string;
  dateOfBirth: string;
  age: string;
  sex: string;
  ethnicity: string;
  nationality: string;
}

export interface BatchValidationResult {
  processed: number;
  valid: number;
  errors: number;
  duplicates: number;
  skipped: number;
}

export interface SpecimenDetails {
  id: string;
  sampleId: string;
  type: string;
  volume: string;
  collectionDate: string;
  collectionTime: string;
  collector: string;
  storageLocation: string;
  diagnosis: string;
  treatmentStatus: string;
  comorbidities: string;
  medication: string;
  clinicalNotes: string;
  attendingPhysician: string;
}