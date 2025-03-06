import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCopy } from "lucide-react";
import { AppContext } from "~/context/AppContextProvider"; // Corrected import for Remix

const Result: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [showFileInput, setShowFileInput] = useState<boolean>(true);

  const context = useContext(AppContext);

  if (!context) {
    console.error("AppContext is undefined. Ensure AppContextProvider wraps this component.");
    return null; // Prevents rendering if context is missing
  }

  const { generateImageCaption } = context;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image first.");

    setLoading(true);
    setShowFileInput(false); // Hide file input after clicking generate
    const description = await generateImageCaption(file);
    setCaption(description || "Failed to generate caption");
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    alert("Caption copied!");
  };

  const handleRegenerate = () => {
    setCaption("");
    setShowFileInput(true);
    setFile(null);
    setImage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex flex-col min-h-[90vh] justify-center items-center p-6 bg-gray-900 text-white"
    >
      <div className="max-w-md w-full bg-gray-800 p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Image Captioning</h1>
  
        <div className="flex flex-col items-center">
          {image ? (
            <img
              src={image}
              alt="Uploaded Preview"
              className="max-w-full rounded-md mb-4"
            />
          ) : (
            <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md">
              No Image Selected
            </div>
          )}
  
          {showFileInput && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
          )}
  
          {!caption && (
            <button
              onClick={handleGenerate}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md w-full text-white font-medium"
              disabled={loading}
            >
              {loading ? "Processing..." : "Generate Caption"}
            </button>
          )}
  
          {caption && (
            <div className="mt-4 bg-gray-700 p-3 rounded-md flex items-center justify-between w-auto max-w-full">
              <p className="text-sm italic flex-1 break-words">{caption}</p>
              <button onClick={handleCopy} className="text-gray-300 hover:text-white ml-2">
                <ClipboardCopy size={20} />
              </button>
            </div>
          )}
  
          {caption && (
            <button
              onClick={handleRegenerate}
              className="mt-4 bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-md w-full text-white font-medium"
            >
              Regenerate Caption
            </button>
          )}
        </div>
      </div>
  
      {caption && (
        <div className="mt-6 max-w-md w-full bg-gray-800 p-3 rounded-lg text-center text-sm text-gray-300">
          I'm an AI and can sometimes make mistakes or not deliver the exact results you want. Generate again with a smile, if you're not satisfied!
        </div>
      )}
    </motion.div>
  );
  
};

export default Result;
