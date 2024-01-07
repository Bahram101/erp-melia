export const formatMoney = (value: number) => {
    if (!value) {
        return value;
    }

    return Intl.NumberFormat("kk-Kz").format(value);
};
