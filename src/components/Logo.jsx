const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2 group">
        {/* Icon bông lúa */}
        <span className="text-4xl text-que-accent group-hover:text-que-secondary transition-colors duration-300">
          🌾
        </span>
        <h1 className="text-4xl font-extrabold text-que-primary tracking-wide group-hover:text-que-secondary transition-colors duration-300">
          <span className="text-que-secondary group-hover:text-que-accent">
            Que
          </span>
          Taste
        </h1>
      </div>
      <p className="text-sm italic text-que-text-muted mt-1 group-hover:text-que-primary transition-colors duration-300">
        Hồn quê trong từng hương vị
      </p>
    </div>
  );
};

export default Logo;
