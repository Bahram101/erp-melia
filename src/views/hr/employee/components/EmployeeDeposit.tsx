import { CTabPane } from '@coreui/react-pro'

type Props = {
  deposit: any
}

const EmployeeDeposit = ({ deposit }: Props) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      Депозит
    </CTabPane>
  )
}

export default EmployeeDeposit
