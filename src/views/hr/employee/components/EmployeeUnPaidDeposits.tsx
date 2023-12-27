import { CTabPane } from '@coreui/react-pro'

type Props = {
  unpaidDeposits: any
}

const EmployeeUnPaidDeposits = ({ unpaidDeposits }: Props) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      Не оплаченные депозиты
    </CTabPane>
  )
}

export default EmployeeUnPaidDeposits
