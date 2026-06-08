import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/628126588348"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="fixed z-40 bottom-3 right-2 md:bottom-5 md:right-5 p-1.5 md:p-2 rounded-3xl bg-green-600 border border-green-600 hover:bg-green-500 transition cursor-pointer text-4xl sm:text-5xl text-white">
        <FaWhatsapp />
      </button>
    </a>
  );
};

export default WhatsappButton;
