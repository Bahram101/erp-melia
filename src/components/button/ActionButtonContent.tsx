import React from "react";
import {FaEye, FaInfo, FaPen, FaPlus, FaTrash} from "react-icons/fa";
import {CButton} from "@coreui/react-pro";

export enum ActionButtonType {
    VIEW,
    EDIT,
    INFO,
    ADD,
    DELETE,
    VIEW_LINK,
    EDIT_LINK,
}

export interface ActionButton {
    type: ActionButtonType,
    handleClick?: (item: any) => void;
    href?: string;
    hrefPreparer?: (item: any) => string;
    hideAction?: (item: any) => boolean;
};

interface Props {
    type?: ActionButtonType;
    onClick?: (item: any) => void;
    item?: any;
    href?: string;
}

const ActionButtonContent = ({type, onClick, item, href}: Props) => {
    let icon = null;
    switch (type) {
        case ActionButtonType.VIEW:
        case ActionButtonType.VIEW_LINK:
            icon = <FaEye/>
            break;

        case ActionButtonType.EDIT:
        case ActionButtonType.EDIT_LINK:
            icon = <FaPen/>;
            break;

        case ActionButtonType.INFO:
            icon = <FaInfo/>;
            break;

        case ActionButtonType.ADD:
            icon = <FaPlus/>;
            break;

        case ActionButtonType.DELETE:
            icon = <FaTrash color={"red"}/>;
            break;

        default:
            break;
    }

    if (type === ActionButtonType.VIEW_LINK || type === ActionButtonType.EDIT_LINK) {
        return (
            <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                href={href || "#"}
            >
                {icon}
            </CButton>
        );
    }

    return (
        <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            onClick={() => {
                if (onClick) {
                    onClick(item);
                }
            }}
        >
            {icon}
        </CButton>
    );
};

export default ActionButtonContent;
