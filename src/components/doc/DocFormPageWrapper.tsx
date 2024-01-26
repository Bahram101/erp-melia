import React, { ReactNode } from "react";
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CLoadingButton, CRow } from "@coreui/react-pro";

interface Props {
  children: ReactNode;
  title?: string;
  handleCancel?: () => void;
  handleSubmit: () => void;
  cancelUrl?: string;
  saving: boolean;
}

const DocFormPageWrapper = ({ children, title, handleCancel, handleSubmit, saving, cancelUrl }: Props) => {

  return (
    <CCard>
      {title && <CCardHeader>{title}</CCardHeader>}

      <CCardBody>
        {children}
      </CCardBody>
      <CCardFooter>
        <CRow lg={{ gutterY: 50 }}>
          <CCol xs={2} md={2}>
            {cancelUrl ? <CButton color="light" href={cancelUrl}>
              Отмена
            </CButton> : <CButton color="light" onClick={handleCancel}>
              Отмена
            </CButton>}
          </CCol>
          <CCol xs={8} md={8}></CCol>
          <CCol xs={2} md={2}>
            <CLoadingButton loading={saving} onClick={handleSubmit}>
              {saving ? "Ждите..." : "Сохранить"}
            </CLoadingButton>
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
  );
};

export default DocFormPageWrapper;
