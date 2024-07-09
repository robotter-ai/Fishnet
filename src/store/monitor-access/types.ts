export interface DatasetPermisionProps {
  requestor: string;
  datasetID: string;
  algorithmID?: string;
  timeseriesIDs?: string[];
  maxExecutionCount?: number;
  authorizer?: string;
}

export type IMonitorAccessTab = 'published' | 'bought' | 'sold' | 'incoming';
