import {
  CommonRefModel,
  ContractRefModel,
  CustomerRefModel,
  DefaultContractRefModel,
  DefaultPostRefModel,
  DocActionButton,
  DocStatus,
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
  gifts: ContractGiftGridModel[]
  discountFromDealer: number;
  goods: CommonRefModel;
  recommender: RecommenderModel;
  saleType: CommonRefModel;
  actions: DocActionButton[];
}

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
  regNumber: number | '';
  regCode: string;
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
  giftId?: string
  name?: string;
  quantity: number;
}

export interface ContractGiftGridModel {
  giftId: string;
  name: string;
  quantity: number;
  unitPrice: number
}

export const DefaultContractFormModel: ContractFormModel = {
  regCode: '',
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
  regNumber: '',
  saleTypeId: '',
  serialNumber: '',
  serviceBranchId: '',
}

export interface ContractRenewFormModel {
  regCode: string
  contractId: string
  statusName: string
  branchName: string
  customerId: string
  customerName: string
  dealerName: string
  addressId: string | null
  docDate: string
  renewDate: string
  discountFromDealer: number
  serialNumber: string
  saleTypeId: string | null
  price: number
  goodsId: string
  toWhouseId?: string
  cashId?: string
  firstPayment: number
  payments: PaymentScheduleFormModel[];
}

export const DefaultContractRenewFormModel: ContractRenewFormModel = {
  addressId: '',
  branchName: '',
  contractId: '',
  customerId: '',
  customerName: '',
  dealerName: '',
  discountFromDealer: 0,
  docDate: '',
  goodsId: '',
  price: 0,
  regCode: '',
  renewDate: '',
  saleTypeId: null,
  serialNumber: '',
  statusName: '',
  firstPayment: 0,
  payments: [],
}

export interface DistributeRenewFormModel {
  contractId: string | null
  saleTypeId: string | null
  docDate: string | null
}

export interface SaleTypeGridModel {
  id: string
  name: string
  price: number
  minFirstPayment: number
  firstPayment: number
  monthCount: number
  fromDate: string
  toDate: string
  note: string
  bankCashName: string
  saleViaBank: boolean
  bankName: string
}

export interface SaleTypeFormModel {
  name: string
  price: number
  firstPayment: number
  minFirstPayment: number
  monthCount: number
  fromDate: string
  toDate: string
  minDealerPaymentAmount: number
  minPaymentAmount: number
  note: string
  saleViaBank: boolean
  bankId: string | null
  awards: SaleTypeAwardOrDeposit[]
  deposits: SaleTypeAwardOrDeposit[]
}

export interface SaleTypeAwardOrDeposit {
  positionId: string | null
  amount: number
}

export const DefaultSaleTypeFormModel: SaleTypeFormModel = {
  awards: [],
  bankId: null,
  deposits: [],
  firstPayment: 0,
  fromDate: '',
  minDealerPaymentAmount: 0,
  minFirstPayment: 0,
  minPaymentAmount: 0,
  monthCount: 0,
  name: '',
  note: '',
  price: 0,
  saleViaBank: false,
  toDate: '',
}

export interface SaleBonusGridModel {
  id: string
  branchName: string
  productName: string
  positionName: string
  year: number
  month: number
  configs: SaleBonusConfig[]
}

export interface SaleBonusConfig {
  fromCount: number | null
  toCount: number | null
  amount: number
}

export interface SaleBonusFormModel {
  branchId: string | null
  positionId: string | null
  productId: string | null
  year: number
  month: number
  configs: SaleBonusConfig[]
}

export const DefaultSaleBonusFormModel: SaleBonusFormModel = {
  branchId: null,
  configs: [],
  month: 0,
  positionId: null,
  productId: null,
  year: 0,
}