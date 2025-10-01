import { motion } from "framer-motion";
import backgroundCover from "../assets/background_cover.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8 },
  }),
};

const AboutPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center text-center">
        {/* Background cover */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundCover})` }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg"
        >
          Về <span className="text-que-accent">QueTaste</span>
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-24">
        {/* Story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative bg-gradient-to-r from-que-background to-que-surface p-10 rounded-2xl shadow-xl text-lg leading-relaxed"
        >
          <p className="text-que-text-main">
            <strong className="text-que-accent">QueTaste</strong> được thành lập
            với sứ mệnh mang hương vị quê hương đến gần hơn với mọi gia đình.
            Chúng tôi chuyên cung cấp đặc sản sạch, an toàn và giàu giá trị
            truyền thống – góp phần đưa tinh hoa ẩm thực Việt vươn ra thế giới.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "🌱 Sứ mệnh",
              text: "Đem đặc sản quê đến mọi miền đất nước.",
            },
            {
              title: "🌏 Tầm nhìn",
              text: "Trở thành thương hiệu đặc sản trực tuyến hàng đầu.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ rotateY: 10, scale: 1.05 }}
              className="p-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-que-border transform transition"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold mb-4 text-que-secondary">
                {item.title}
              </h2>
              <p className="text-que-text-muted">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline - Hành trình */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-que-primary">
            ⏳ Hành trình QueTaste
          </h2>
          <div className="relative border-l-4 border-que-accent pl-6 space-y-12">
            {[
              {
                year: "2020",
                text: "Ý tưởng về QueTaste ra đời từ tình yêu với đặc sản quê hương.",
              },
              {
                year: "2021",
                text: "Ra mắt website đầu tiên, mang đặc sản đến tay khách hàng khắp Việt Nam.",
              },
              {
                year: "2023",
                text: "Mở rộng sản phẩm, hợp tác với nhiều vùng miền.",
              },
              {
                year: "2025",
                text: "Vươn ra thị trường quốc tế, đưa hương vị Việt ra thế giới.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3, duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -left-8 top-2 w-6 h-6 rounded-full bg-que-accent shadow-lg"></div>
                <h3 className="text-xl font-semibold text-que-secondary">
                  {step.year}
                </h3>
                <p className="text-que-text-muted">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="p-12 bg-gradient-to-r from-que-surface to-que-background rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center text-que-primary">
            💎 Giá trị cốt lõi
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              "Chất lượng & uy tín",
              "Tận tâm trong từng sản phẩm",
              "Hỗ trợ khách hàng nhanh chóng",
            ].map((val, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="p-6 rounded-xl bg-white/70 backdrop-blur-md shadow-md border border-que-border"
              >
                <p className="font-medium text-lg text-que-text-main">{val}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
