const services = [
  {
    icon: "🌾",
    title: "Đặc sản chuẩn vị quê",
    desc: "Mỗi sản phẩm đều được chọn lọc từ làng nghề truyền thống, giữ trọn hương vị quê hương.",
  },
  {
    icon: "🧺",
    title: "Đóng gói thân thiện",
    desc: "Sử dụng bao bì mộc mạc, thân thiện với môi trường nhưng vẫn đảm bảo an toàn vận chuyển.",
  },
  {
    icon: "🚚",
    title: "Giao hàng tận nơi",
    desc: "Giao hàng nhanh chóng trên toàn quốc, mang hồn quê đến tận ngõ nhà bạn.",
  },
  {
    icon: "🤝",
    title: "Cam kết uy tín",
    desc: "Sản phẩm đúng nguồn gốc, minh bạch và luôn đặt chất lượng lên hàng đầu.",
  },
];

const ServicePage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Banner */}
      <div className="bg-que-background p-8 rounded-xl text-center mb-10">
        <h1 className="text-4xl font-bold text-que-primary">
          Dịch vụ của QueTaste
        </h1>
        <p className="mt-4 text-que-text-muted">
          QueTaste mang hồn quê đến gần bạn hơn qua dịch vụ tận tâm và sản phẩm
          tinh túy.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="p-6 bg-que-surface shadow rounded-xl text-center border border-que-secondary/30 hover:shadow-lg hover:border-que-accent transition-colors duration-300"
          >
            <div className="text-5xl">{s.icon}</div>
            <h2 className="text-lg font-semibold mt-4 text-que-primary">
              {s.title}
            </h2>
            <p className="text-que-text-muted mt-2">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer Quote */}
      <div className="mt-12 bg-que-secondary/10 p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-que-secondary">
          “QueTaste – Hồn quê trong từng hương vị”
        </h3>
      </div>
    </div>
  );
};

export default ServicePage;
