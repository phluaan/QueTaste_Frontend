import { useState } from "react";
import codImg from "../../../assets/cod.png";
import vnpayImg from "../../../assets/vnpay.png";
import momoImg from "../../../assets/momo.png";

const paymentMethods = [
    { id: "COD", label: "Cash on Delivery", image: codImg },
    { id: "momo", label: "MoMo", image: momoImg },
    { id: "vnpay", label: "VNPAY", image: vnpayImg }
];

const CheckoutForm = ({ onSubmit }) => {
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handleChange = (e) => {
        setShippingAddress({
        ...shippingAddress,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ shippingAddress, paymentMethod });
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
        <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
        {Object.keys(shippingAddress).map((key) => (
            <input
            key={key}
            name={key}
            type="text"
            placeholder={key}
            value={shippingAddress[key]}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
            />
        ))}

        <h3 className="text-xl font-bold mt-6 mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
            <label
                key={method.id}
                className={`relative cursor-pointer border rounded-lg p-4 flex flex-col items-center transition 
                ${
                paymentMethod === method.id
                    ? "border-[#07689F] ring-2 ring-[#07689F]"
                    : "border-gray-300"
                }`}
            >
                <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="absolute top-2 right-2 w-5 h-5 accent-[#07689F] cursor-pointer"
                />
                <img
                src={method.image}
                alt={method.label}
                className="h-16 object-contain mb-2"
                />
                <span className="font-medium text-sm text-center">
                {method.label}
                </span>
            </label>
            ))}
        </div>

        <button
            type="submit"
            className="mt-6 w-full bg-[#07689F] hover:bg-[#FF7E67] text-white py-4 rounded-lg font-bold text-lg transition-colors"
        >
            Place Order
        </button>
        </form>
    );
};

export default CheckoutForm;