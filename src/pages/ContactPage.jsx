import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { showError, showSuccess } from "../utils/toastUtils";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const initialForm = { fullName: "", email: "", phone: "", message: "" };

const ContactPage = () => {
  // lấy accessToken đúng chỗ (ngoài mọi hàm thường)
  const accessToken = useSelector((state) => state.auth.accessToken);

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const e = {};
    if (!values.fullName?.trim()) e.fullName = "Vui lòng nhập họ tên";
    if (!values.email?.trim()) e.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Email không hợp lệ";
    if (!values.phone?.trim()) e.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9+().\-\s]{8,20}$/.test(values.phone))
      e.phone = "Số điện thoại không hợp lệ";
    if (!values.message?.trim()) e.message = "Vui lòng nhập nội dung";
    else if (values.message.trim().length < 5)
      e.message = "Nội dung tối thiểu 5 ký tự";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);
    if (touched[name]) {
      const ve = validate(next);
      setErrors((prev) => ({ ...prev, [name]: ve[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const ve = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: ve[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      showError("Vui lòng đăng nhập để tiếp tục");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    const ve = validate(formData);
    setErrors(ve);
    setTouched({ fullName: true, email: true, phone: true, message: true });
    if (Object.keys(ve).length) {
      showError("Vui lòng kiểm tra lại các trường bị lỗi.");
      return;
    }

    try {
      setLoading(true);

      // NOTE: backend của bạn đang đọc body phẳng { fullName, email, ... }
      const res = await axiosClient.post("/contact/send", formData);
      console.log(res);

      const ok = res?.success;
      if (ok) {
        showSuccess("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
        setFormData(initialForm);
        setTouched({});
        setErrors({});
      } else {
        const msg = res?.message || "Gửi liên hệ thất bại";
        showError(msg);
      }
    } catch (err) {
      const msg =
        err?.res?.message || err?.message || "Có lỗi xảy ra khi gửi liên hệ";
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-que-secondary";
  const errorText = "text-red-600 text-sm mt-1";

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-que-primary">
        Liên hệ với chúng tôi
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-que-secondary">
            Thông tin liên hệ
          </h2>
          <p className="text-que-text-main">
            📍 Địa chỉ: Số 1, Võ Văn Ngân, Linh Trung, Thủ Đức, Thành phố Hồ Chí
            Minh
          </p>
          <p className="text-que-text-main">📞 Hotline: 0909 123 456</p>
          <p className="text-que-text-main">📧 Email: support@quetaste.vn</p>
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7836.95893762141!2d106.77247980000001!3d10.85109000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1759903884814!5m2!1svi!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="map"
            ></iframe>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-que-background p-6 rounded-lg shadow"
          noValidate
        >
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên *"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${
                touched.fullName && errors.fullName
                  ? "border-red-500"
                  : "border"
              }`}
              required
              autoComplete="name"
              aria-invalid={!!(touched.fullName && errors.fullName)}
              aria-describedby="err-fullName"
            />
            {touched.fullName && errors.fullName && (
              <div id="err-fullName" className={errorText}>
                {errors.fullName}
              </div>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${
                touched.email && errors.email ? "border-red-500" : "border"
              }`}
              required
              autoComplete="email"
              aria-invalid={!!(touched.email && errors.email)}
              aria-describedby="err-email"
            />
            {touched.email && errors.email && (
              <div id="err-email" className={errorText}>
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại *"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${
                touched.phone && errors.phone ? "border-red-500" : "border"
              }`}
              required
              autoComplete="tel"
              pattern="[0-9+().\-\s]{8,20}"
              aria-invalid={!!(touched.phone && errors.phone)}
              aria-describedby="err-phone"
            />
            {touched.phone && errors.phone && (
              <div id="err-phone" className={errorText}>
                {errors.phone}
              </div>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Nội dung... *"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${
                touched.message && errors.message ? "border-red-500" : "border"
              }`}
              rows="4"
              required
              aria-invalid={!!(touched.message && errors.message)}
              aria-describedby="err-message"
            />
            {touched.message && errors.message && (
              <div id="err-message" className={errorText}>
                {errors.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-que-primary text-white p-3 rounded-lg font-semibold hover:bg-que-accent transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi liên hệ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
