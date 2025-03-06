import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; // Corrected import

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Generate AI Caption
      </h1>
      <p className="text-gray-500 mb-8">Give your image a perfect caption</p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          src="/app/assets/home_ai.jpg"
          alt="Sample Image"
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Image to Caption Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Our AI uses advanced technology to analyze your image, recognizing
            objects, people, and emotions within it. It understands the scene,
            colors, and context just like a human would—but in seconds. This
            allows it to generate meaningful descriptions that accurately
            represent what’s in the picture.
          </p>
          <p className="text-gray-600">
            Once the image is analyzed, AI creates a perfect caption that
            matches the mood and message of the photo. Whether it’s a travel
            memory, a special moment, or a creative shot, the AI ensures your
            image stands out with a caption that enhances its impact.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
