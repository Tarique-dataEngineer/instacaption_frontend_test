import React, { useContext } from "react";
import { assets } from "~/assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "@remix-run/react";
import { AppContext } from "~/context/AppContextProvider";

const GenerateBtn: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) {
    console.error("AppContext is undefined. Ensure AppContextProvider wraps this component.");
    return null; // Prevent rendering if context is missing
  }

  const { user, setShowLogin } = context;

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin?.(true); // Optional chaining to avoid runtime errors
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the magic, Try Now
      </h1>

      <button
        onClick={onClickHandler}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500"
      >
        Generate Caption
        <img src={assets.star_group} alt="Star Icon" className="h-6" />
      </button>
    </motion.div>
  );
};

export default GenerateBtn;
