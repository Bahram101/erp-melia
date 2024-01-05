import { CTabPane } from '@coreui/react-pro'

type Props = {
  userBranches: any
}

const EmployeeUserBranches = ({ userBranches }: Props) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      Филиалы пользователя
    </CTabPane>
  )
}

export default EmployeeUserBranches
