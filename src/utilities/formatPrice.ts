export const formatPrice = (price: string, discount?: string) => {
    if (discount) {
        return (Number(price) * Number(discount) / 100).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }

    return Number(price).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    });
};
