const OrderSummary = ({ subtotal, shippingFee, discount }) => {
    const finalAmount = subtotal - discount + shippingFee;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="space-y-2">
            <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span>{shippingFee.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between">
            <span>Discount</span>
            <span>-{discount.toLocaleString()}₫</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>{finalAmount.toLocaleString()}₫</span>
            </div>
        </div>
        </div>
    );
};

export default OrderSummary;