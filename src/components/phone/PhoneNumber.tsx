import React from "react";
import {CBadge} from "@coreui/react-pro";

const PhoneNumber = ({phoneNumber}: {phoneNumber: string}) => {
    if(!phoneNumber) {
        return null;
    }

    return <p><CBadge color={"secondary"}>
        {phoneNumber}
    </CBadge></p>;
};

export default PhoneNumber;
