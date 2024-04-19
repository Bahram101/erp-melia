import React from "react";
import {CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,} from "@coreui/react-pro";
import { WhouseDocItemFormModel } from '../../../../models/whouse/whouseModels'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'

interface Props {
    items: WhouseDocItemFormModel[];
    removeItemRow: (index: number) => void;
}

const WhouseReturnDocItemForm = ({
                                     items,
                                     removeItemRow,
                                 }: Props) => {
    return (
        <>
            <CTable striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Наименивание</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Серииный номер</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {items.map((item: WhouseDocItemFormModel, idx: number) => {
                        return (
                            <CTableRow key={idx}>
                                <CTableHeaderCell>{idx + 1}</CTableHeaderCell>
                                <CTableDataCell>
                                    {item.goodsName}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {item.serialNumbers}
                                </CTableDataCell>

                                <CTableDataCell>
                                    {item.quantity}
                                </CTableDataCell>
                                <CTableDataCell style={{whiteSpace: "pre-wrap"}}>
                                    <ActionButtonContent
                                        onClick={() => removeItemRow(idx)}
                                        item={item}
                                        type={ActionButtonType.DELETE}
                                    />
                                </CTableDataCell>
                            </CTableRow>
                        );
                    })}
                </CTableBody>
            </CTable>
        </>
    );
};

export default WhouseReturnDocItemForm;
