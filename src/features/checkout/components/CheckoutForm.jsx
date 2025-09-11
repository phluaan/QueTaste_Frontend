import { useState } from "react";
import useVietnamProvinces from "../hooks/useVietnamProvinces";

import codImg from "../../../assets/cod.png";
import vnpayImg from "../../../assets/vnpay.png";
import momoImg from "../../../assets/momo.png";

const paymentMethods = [
    { id: "COD", label: "Cash on Delivery", image: codImg },
    { id: "momo", label: "MoMo", image: momoImg },
    { id: "vnpay", label: "VNPAY", image: vnpayImg },
];

    const CheckoutForm = ({ onSubmit }) => {
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        street: "",
        province: null,
        district: null,
        ward: null,
    });
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const { provinces, districts, wards, fetchDistricts, fetchWards } =
        useVietnamProvinces();

    const handleChange = (e) => {
        setShippingAddress({
        ...shippingAddress,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const provinceName =
        provinces.find((p) => p.code === shippingAddress.province)?.name || "";
        const districtName =
        districts.find((d) => d.code === shippingAddress.district)?.name || "";
        const wardName =
        wards.find((w) => w.code === shippingAddress.ward)?.name || "";

        const finalAddress = {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone,
        address: shippingAddress.street,
        city: `${wardName}, ${districtName}, ${provinceName}`,
        postalCode: shippingAddress.province || "",
        };

        console.log("📦 Final Address:", finalAddress);
        onSubmit({ shippingAddress: finalAddress, paymentMethod });
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
        <h3 className="text-xl font-bold mb-4">Shipping Information</h3>

        {/* Full Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={shippingAddress.fullName}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
            />
            <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={shippingAddress.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
            />
        </div>

        {/* Province – District – Ward */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
            name="province"
            value={shippingAddress.province || ""}
            onChange={(e) => {
                const code = Number(e.target.value);
                setShippingAddress({
                ...shippingAddress,
                province: code,
                district: null,
                ward: null,
                });
                fetchDistricts(code); // load districts
            }}
            className="w-full border p-3 rounded-lg"
            required
            >
            <option value="">Select Province/City</option>
            {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                {p.name}
                </option>
            ))}
            </select>

            <select
            name="district"
            value={shippingAddress.district || ""}
            onChange={(e) => {
                const code = Number(e.target.value);
                setShippingAddress({
                ...shippingAddress,
                district: code,
                ward: null,
                });
                fetchWards(code); // load wards
            }}
            disabled={!shippingAddress.province}
            className="w-full border p-3 rounded-lg"
            required
            >
            <option value="">Select District</option>
            {districts.map((d) => (
                <option key={d.code} value={d.code}>
                {d.name}
                </option>
            ))}
            </select>

            <select
            name="ward"
            value={shippingAddress.ward || ""}
            onChange={(e) =>
                setShippingAddress({
                ...shippingAddress,
                ward: Number(e.target.value),
                })
            }
            disabled={!shippingAddress.district}
            className="w-full border p-3 rounded-lg"
            required
            >
            <option value="">Select Ward</option>
            {wards.map((w) => (
                <option key={w.code} value={w.code}>
                {w.name}
                </option>
            ))}
            </select>
        </div>

        {/* Street */}
        <input
            name="street"
            type="text"
            placeholder="Street / House No."
            value={shippingAddress.street}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
        />

        {/* Payment */}
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