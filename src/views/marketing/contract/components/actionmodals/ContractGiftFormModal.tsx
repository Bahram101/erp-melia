import { ContractGiftFormModel, ContractGiftGridModel } from '../../../../../models/marketing/MrkModels'
import React, { useEffect, useState } from 'react'
import FormModal from '../../../../../components/FormModal'
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import ActionButtonContent, { ActionButtonType } from '../../../../../components/button/ActionButtonContent'
import { useGiftOptionsQuery } from '../../../../../hooks/reference/refOptionsQueries'
import { RefOptionsField } from '../../../../../components/fields/RefOptionsField'
import InputField from '../../../../../components/fields/InputField'
import { toast } from 'react-toastify'
import { useContractHandleActionQuery } from '../../../../../hooks/marketing/marketingQueries'
import { DocAction } from '../../../../../models/CommonModels'
import { parseResponseError } from '../../../../../utils/ErrorUtil'

type Props = {
  visible: boolean
  close: () => void
  regCode: string
  contractId: string
  handleAfterSubmit: () => void
  existGifts: ContractGiftGridModel[]
}
const ContractGiftFormModal = ({ visible, close, regCode, contractId, handleAfterSubmit, existGifts }: Props) => {
  const [gifts, setGifts] = useState<ContractGiftFormModel[]>([])

  const giftOptionsQuery = useGiftOptionsQuery(true)
  const handleActionQuery = useContractHandleActionQuery()

  useEffect(() => {
    setGifts(existGifts)

    return () => setGifts([])
  }, [existGifts])

  const submitForm = () => {
    const form = {
      action: DocAction.ADD_GIFT,
      docId: contractId,
      addData: {
        gifts: gifts,
      },
    }
    handleActionQuery.mutateAsync({ form: form })
      .then(() => {
        handleAfterSubmit()
      })
      .catch((error) => {
        const errorMsg = parseResponseError(error)
        if (errorMsg) {
          toast.error(errorMsg)
        }
      })
  }

  const deleteRow = (idx: number) => {
    setGifts(gifts.filter((gift, index) => idx !== index))
  }

  const addRow = () => {
    const clonedGifts = [...gifts]
    clonedGifts.push({
      quantity: 0,
    })
    setGifts(clonedGifts)
  }

  const handleChange = (e: any, idx: number) => {
    const { name, value } = e.target
    if (name === 'giftId') {
      const obj = gifts.find((gift) => gift.giftId === value)
      if (obj) {
        toast.error('Подарок уже выбран!')
        return
      }
    }

    setGifts(gifts.map((g, i) => {
      if (idx === i) {
        return { ...g, [name]: value }
      }
      return g
    }))
  }


  return <FormModal
    visibleFormModal={visible}
    onClose={close}
    title={`Добавление подарка к договору №${regCode}`}
    handleSubmit={submitForm}
    saving={handleActionQuery.isLoading}>
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Подарок</CTableHeaderCell>
          <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
          <CTableHeaderCell scope="col">
            <ActionButtonContent
              type={ActionButtonType.ADD}
              onClick={addRow}
            />
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {gifts.map((gift, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{index + 1}</CTableDataCell>
            <CTableDataCell>
              <RefOptionsField
                options={giftOptionsQuery.data || []}
                handleChange={(e) => handleChange(e, index)}
                fieldName={'giftId'}
                value={gift.giftId}
              />
            </CTableDataCell>
            <CTableDataCell>
              <InputField
                fieldName={'quantity'}
                handleChange={(e: any) => handleChange(e, index)}
                value={gift.quantity}
              />
            </CTableDataCell>
            <CTableDataCell>
              <ActionButtonContent
                type={ActionButtonType.DELETE}
                onClick={() => deleteRow(index)}
              />
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  </FormModal>
}

export default ContractGiftFormModal
