import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📨 Contact Form Submitted:", formData);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
  };

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
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-que-background p-6 rounded-lg shadow"
        >
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-que-secondary"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-que-secondary"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-que-secondary"
          />
          <textarea
            name="message"
            placeholder="Nội dung..."
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-que-secondary"
            rows="4"
            required
          />
          <button
            type="submit"
            className="w-full bg-que-primary text-white p-3 rounded-lg font-semibold hover:bg-que-accent transition"
          >
            Gửi liên hệ
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
