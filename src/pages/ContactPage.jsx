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
            📍 Địa chỉ: Số 123, Quê Hương, Việt Nam
          </p>
          <p className="text-que-text-main">📞 Hotline: 0909 123 456</p>
          <p className="text-que-text-main">📧 Email: support@quetaste.vn</p>
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?...your-map-url..."
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
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
