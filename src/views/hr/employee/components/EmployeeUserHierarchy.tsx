import { CTabPane } from '@coreui/react-pro'

type Props = {
  hierarchy: any
}

const EmployeeHierarchy = ({ hierarchy }: Props) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      Иерархия
    </CTabPane>
  )
}

export default EmployeeHierarchy
