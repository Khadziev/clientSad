import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Link className="header-link" to="/">
        Главная
      </Link>
      <Link className="header-link" to="/count">
        Рандом
      </Link>
      <Link className="header-link" to="/write-offs">
        Списания
      </Link>
      <Link className="header-link" to="/limit">
        Лимиты
      </Link>
    </div>
  );
};

export default Header;
