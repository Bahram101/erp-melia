import { DocStatus } from '../CommonModels'

export interface ContractDetailedModel {

};

export interface ContractGridModel {
  id: string;
  regNumber: string;
  regCode: string;
  branchName: string;
  dealerName: string;
  collectorName: string;
  customerName: string;
  serialNumber: string;
  status: DocStatus;
  statusName: string;
  docDate: string;
  note: string;
  address: string;
  recoRegCode: string;
  fitterName: string;
  demoSecName: string;
  phoneNumbers: string[];
  serialNumber2: string;
  productName: string;
  productCode: string;
}
