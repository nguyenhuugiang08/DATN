export const formatPrice = (price: string, discount?: string) => {
    if (discount) {
        price = new Intl.NumberFormat("vi-VI").format((Number(price) * Number(discount)) / 100);
    } else {
        price = new Intl.NumberFormat("vi-VI").format(Number(price));
    }

    return price;
};
