export interface DatasetPermisionProps {
  requestor?: string;
  algorithmID?: string;
  timeseriesIDs?: string[];
  requestedExecutionCount?: number;
  maxExecutionCount?: number;
  authorizer?: string;
}
