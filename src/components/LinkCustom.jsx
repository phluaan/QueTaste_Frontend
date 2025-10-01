// src/components/RegisterLink.jsx
import { Link } from "react-router-dom";

const LinkCustom = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="font-semibold text-que-primary hover:text-que-accent transition-colors"
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
