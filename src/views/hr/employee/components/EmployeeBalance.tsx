import { CTabPane } from '@coreui/react-pro'

type Props = {
  balance: any
}

const EmployeeBalance = ({ balance }: Props) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      Баланс
    </CTabPane>
  )
}

export default EmployeeBalance
