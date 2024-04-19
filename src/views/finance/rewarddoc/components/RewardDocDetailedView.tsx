import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import { RewardDocDetailedModel } from '../../../../models/finance/FinModels'
import React from 'react'
import RewardDocStatusBadge from './RewardDocStatusBadge'
import { formatMoney } from '../../../../utils/UtilFuncs'

type Props = {
  model: RewardDocDetailedModel
}
const RewardDocDetailedView = ({ model }: Props) => {
  return <>
    <CRow>
      <CCol md>
        <CTable className={'table table-striped item-detailed'}>
          <CTableBody>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Регистрационный номер
              </CTableDataCell>
              <CTableHeaderCell>
                {model.regNumber}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Филиал
              </CTableDataCell>
              <CTableHeaderCell>
                {model.branch?.displayName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Тип документа
              </CTableDataCell>
              <CTableHeaderCell>
                {model.doctype.displayName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Дата документа
              </CTableDataCell>
              <CTableHeaderCell>
                {model.docDate}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Статус
              </CTableDataCell>
              <CTableHeaderCell>
                <RewardDocStatusBadge status={model.status.status} statusName={model.status.displayName} />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Дата-время создания
              </CTableDataCell>
              <CTableHeaderCell>{model.createdAt}</CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
      <CCol md>
        <CTable className={'table table-striped item-detailed'}>
          <CTableBody>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Рекомендатель
              </CTableDataCell>
              <CTableHeaderCell>
                {model.contract?.regNumber}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Рекомендован
              </CTableDataCell>
              <CTableHeaderCell>
                {model.targetContract?.regNumber}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Сумма
              </CTableDataCell>
              <CTableHeaderCell>
                {formatMoney(model.amount)}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Примечание
              </CTableDataCell>
              <CTableHeaderCell>
                {model.note}
              </CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
    {/*<CRow>*/}
    {/*  <CCol>*/}
    {/*    <hr />*/}
    {/*    <h6>Связанные документы</h6>*/}
    {/*    <RelatedDocGrid docs={model.relatedDocs || []} />*/}
    {/*  </CCol>*/}
    {/*</CRow>*/}
  </>
}

export default RewardDocDetailedView