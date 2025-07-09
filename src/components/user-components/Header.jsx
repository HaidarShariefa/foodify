import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({ name, logo, onCartClick }) {
  return (
    <div className="w-full h-20 flex justify-around items-center">
      <div className="flex font-bold text-xl text-white items-center space-x-4">
        {logo && (
          <img
            src={logo}
            alt="Restaurant Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <h2>{name}</h2>
      </div>
      <button onClick={onCartClick} className="text-white text-xl hover:text-sky-800 transition hover:bg-white rounded-xl p-2 ">
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </div>
  );
}
