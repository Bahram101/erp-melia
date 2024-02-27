import {
  ContextDocDetailedModel,
  DocAction,
  DocActionButton,
  Doctype,
  DoctypeRefModel,
  PostRefModel,
  StatusRefModel,
} from '../CommonModels'

export interface ApproveDocGridModel {
  id: string
  contextDocRegNumber: string
  contextDoctype: Doctype
  contextDoctypeName: string
  contextAction: DocAction
  contextActionName: string
  createdAt: string
  creatorName: string
}

export interface ApproveDocDetailedModel {
  id: string
  regNumber?: number
  doctype: DoctypeRefModel
  status: StatusRefModel
  createdAt: string
  updatedAt: string
  creator: PostRefModel
  actions: DocActionButton[]
  contextDoc: ContextDocDetailedModel
}