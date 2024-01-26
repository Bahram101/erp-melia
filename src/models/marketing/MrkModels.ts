import {
  CommonRefModel, ContractRefModel,
  CustomerRefModel, DefaultContractRefModel, DefaultPostRefModel,
  DocStatus, Doctype,
  DoctypeRefModel,
  PostRefModel,
  StatusRefModel,
} from '../CommonModels'

export interface ContractDetailedModel {
  regCode: string;
  status: StatusRefModel;
  branch: CommonRefModel;
  serviceBranch?: CommonRefModel;
  docDate: string;
  dealer: PostRefModel;
  demoSec: PostRefModel;
  fitter: PostRefModel;
  collector: PostRefModel;
  price: number;
  firstPayment: number;
  paidFirstPayment: number;
  customer: CustomerRefModel;
  address: string;
  phoneNumbers: string[];
  outCity: boolean;
  serialNumber: string;
  serialNumber2: string;
  note: string;
  discountFromDealer: number;
  goods: CommonRefModel;
  recommender: RecommenderModel;
  saleType: CommonRefModel;
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

export interface RecommenderModel {
  id: string;
  displayName: string;
  state: string;
}

export interface PaymentScheduleDetailedGridModel {
  id: string;
  paymentDate: string;
  amount: number;
  paidAmount: number;
  details: PaymentScheduleDetailModel[];
}

export interface ContractRewardGridModel {
  id: string;
  contractId: string;
  targetContractId: string;
  targetContractRegCode: string;
  amount: number;
  docDate: string;
  doctype: DoctypeRefModel;
  status: StatusRefModel;
  createdAt: string;
}

export interface PaymentScheduleDetailModel {
  amount: number;
  docDate: string;
  docId: string;
  doctype: string;
  doctypeName: string;
  note: string;
  status: DocStatus;
}

export interface SaleTypeDetailedModel {
  id: string;
  name: string;
  firstPayment: number;
  price: number;
  minDealerPaymentAmount: number;
  minPaymentAmount: number;
  minFirstPayment: number;
  monthCount: number;
  fromDate: string;
  toDate: string;
  note: string;
  empPayments: SaleTypeEmpPaymentModel[];
  createdAt: string;
}

export interface SaleTypeEmpPaymentModel {
  id: string;
  positionName: string;
  amount: number;
}

export interface ContractFormModel {
  regNumber: number | "";
  branchId: string;
  serviceBranchId: string;
  docDate: string;
  dealer: PostRefModel;
  demoSec: PostRefModel;
  fitter: PostRefModel;
  collector: PostRefModel;
  customer: CustomerRefModel | null;
  serialNumber: string;
  goodsId: string;
  price: number;
  firstPayment: number;
  cashFirstPayment: number;
  saleTypeId: string | null;
  discountFromDealer: number;
  addressId: string | null;
  outCity: boolean;
  note: string;
  recommender: ContractRefModel;
  payments: PaymentScheduleFormModel[];
  gifts: ContractGiftFormModel[];
  hasDiscountFromRecommender: boolean;
}

export interface RecoFormModel {
  branchId: string;
  regNumber: number;
  contractId: string;
  displayName: string;
}

export interface PaymentScheduleFormModel {
  id: string;
  amount: number;
  paymentDate: string;
}

export interface ContractGiftFormModel {
  giftId: string;
  name: string;
  quantity: number;
}

export const DefaultContractFormModel : ContractFormModel = {
  addressId: '',
  branchId: '',
  cashFirstPayment: 0,
  collector: DefaultPostRefModel,
  customer: null,
  dealer: DefaultPostRefModel,
  demoSec: DefaultPostRefModel,
  discountFromDealer: 0,
  docDate: '',
  firstPayment: 0,
  fitter: DefaultPostRefModel,
  gifts: [],
  goodsId: '',
  hasDiscountFromRecommender: false,
  note: '',
  outCity: false,
  payments: [],
  price: 0,
  recommender: DefaultContractRefModel,
  regNumber: "",
  saleTypeId: '',
  serialNumber: '',
  serviceBranchId: '',
}
