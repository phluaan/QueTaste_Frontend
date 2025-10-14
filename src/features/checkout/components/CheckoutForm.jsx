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

const RequiredLabel = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block mb-1 text-sm font-medium text-que-text-main">
    {children} <span className="text-red-500">*</span>
  </label>
);

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

  const [errors, setErrors] = useState({ phone: "" });
  const [touched, setTouched] = useState({ phone: false });
  const [submitting, setSubmitting] = useState(false);

  const { provinces, districts, wards, fetchDistricts, fetchWards } = useVietnamProvinces();

  const setField = (name, value) => {
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhone = (val) => {
    if (!val) return "Số điện thoại không được để trống";
    if (!/^0\d{9}$/.test(val)) return "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số";
    return "";
  };

  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setField("phone", onlyDigits);
    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validatePhone(onlyDigits) }));
    }
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    setErrors((prev) => ({ ...prev, phone: validatePhone(shippingAddress.phone) }));
  };

  const handleChange = (e) => {
    setField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const phoneErr = validatePhone(shippingAddress.phone);
    if (phoneErr) {
      setTouched((prev) => ({ ...prev, phone: true }));
      setErrors((prev) => ({ ...prev, phone: phoneErr }));
      return;
    }

    const provinceName = provinces.find((p) => p.code === shippingAddress.province)?.name || "";
    const districtName = districts.find((d) => d.code === shippingAddress.district)?.name || "";
    const wardName = wards.find((w) => w.code === shippingAddress.ward)?.name || "";

    const finalAddress = {
      fullName: shippingAddress.fullName,
      phone: shippingAddress.phone,
      address: shippingAddress.street,
      city: `${wardName}, ${districtName}, ${provinceName}`,
      postalCode: shippingAddress.province || "",
    };

    const idempotencyKey =
      (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      setSubmitting(true);
      await Promise.resolve(onSubmit({ shippingAddress: finalAddress, paymentMethod, idempotencyKey }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-6 rounded-xl shadow-md space-y-4 ${submitting ? "opacity-95" : ""}`}
      aria-busy={submitting}
    >
      <h3 className="text-xl font-bold mb-4 text-que-primary">Shipping Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <RequiredLabel htmlFor="fullName">Full Name</RequiredLabel>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={shippingAddress.fullName}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-que-primary"
            required
            aria-required="true"
            disabled={submitting}
          />
        </div>

        <div>
          <RequiredLabel htmlFor="phone">Phone Number</RequiredLabel>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="0\d{9}"
            maxLength={10}
            placeholder="Ví dụ: 0xxxxxxxxx (10 số)"
            value={shippingAddress.phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-que-primary ${
              errors.phone && touched.phone ? "border-red-500" : ""
            }`}
            required
            aria-required="true"
            aria-invalid={!!(errors.phone && touched.phone)}
            aria-describedby="phone-error"
            disabled={submitting}
          />
          {errors.phone && touched.phone ? (
            <p id="phone-error" className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          ) : (
            <p className="mt-1 text-xs text-gray-500">Bắt đầu bằng 0 và có 10 chữ số.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <RequiredLabel htmlFor="province">Province/City</RequiredLabel>
          <select
            id="province"
            name="province"
            value={shippingAddress.province || ""}
            onChange={(e) => {
              const code = Number(e.target.value);
              setShippingAddress((prev) => ({ ...prev, province: code, district: null, ward: null }));
              fetchDistricts(code);
            }}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-que-primary"
            required
            aria-required="true"
            disabled={submitting}
          >
            <option value="">Select Province/City</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <RequiredLabel htmlFor="district">District</RequiredLabel>
          <select
            id="district"
            name="district"
            value={shippingAddress.district || ""}
            onChange={(e) => {
              const code = Number(e.target.value);
              setShippingAddress((prev) => ({ ...prev, district: code, ward: null }));
              fetchWards(code);
            }}
            disabled={!shippingAddress.province || submitting}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-que-primary disabled:bg-gray-50"
            required
            aria-required="true"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <RequiredLabel htmlFor="ward">Ward</RequiredLabel>
          <select
            id="ward"
            name="ward"
            value={shippingAddress.ward || ""}
            onChange={(e) => setShippingAddress((prev) => ({ ...prev, ward: Number(e.target.value) }))}
            disabled={!shippingAddress.district || submitting}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-que-primary disabled:bg-gray-50"
            required
            aria-required="true"
          >
            <option value="">Select Ward</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <RequiredLabel htmlFor="street">Street / House No.</RequiredLabel>
        <input
          id="street"
          name="street"
          type="text"
          placeholder="Street / House No."
          value={shippingAddress.street}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-que-primary"
          required
          aria-required="true"
          disabled={submitting}
        />
      </div>

      <h3 className="text-xl font-bold mt-6 mb-2 text-que-primary">Payment Method</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`relative cursor-pointer border rounded-lg p-4 flex flex-col items-center transition ${
              paymentMethod === method.id ? "border-que-primary ring-2 ring-que-accent" : "border-gray-300"
            } ${submitting ? "pointer-events-none opacity-75" : ""}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="absolute top-2 right-2 w-5 h-5 accent-que-primary cursor-pointer"
              disabled={submitting}
            />
            <img src={method.image} alt={method.label} className="h-16 object-contain mb-2" />
            <span className="font-medium text-sm text-center text-que-text-main">{method.label}</span>
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-6 w-full text-white py-4 rounded-lg font-bold text-lg transition-colors ${
          submitting ? "bg-gray-400 cursor-not-allowed" : "bg-que-primary hover:bg-que-secondary"
        }`}
      >
        {submitting ? "Processing…" : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;