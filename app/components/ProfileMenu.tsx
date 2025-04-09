import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "~/context/AppContextProvider";
import { assets, AVATAR_OPTIONS } from "~/assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileMenu = ({ onClose }: { onClose: () => void }) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppContextProvider");
  }

  const { user, setUser, token, backendUrl, logout } = context;
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || assets.profile_icon);

  const updateAvatar = async (newAvatar: string) => {
    if (!user || !token) {
      toast.error("You must be logged in to update your avatar");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-avatar`,
        { avatar: newAvatar },
        { headers: { token } }
      );

      if (data.success) {
        setCurrentAvatar(newAvatar);
        setUser({ ...user, avatar: newAvatar });
        toast.success("Avatar updated successfully!");
        setShowAvatarSelector(false);
      } else {
        toast.error(data.message || "Failed to update avatar");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 min-w-[200px] z-50"
    >
      <div className="flex flex-col space-y-2">
        {/* User Info Section */}
        <div className="px-4 py-2 border-b">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        
        {/* Update Avatar Button */}
        <button
          onClick={() => setShowAvatarSelector(!showAvatarSelector)}
          className="text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
        >
          <img 
            src={currentAvatar}
            alt="Current avatar" 
            className="w-5 h-5 rounded-full"
          />
          Update Avatar
        </button>
        
        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-red-500"
        >
          Logout
        </button>
      </div>

      {/* Avatar Selector Grid */}
      {showAvatarSelector && (
        <div className="mt-4 border-t pt-4">
          <div className="grid grid-cols-3 gap-2">
            {AVATAR_OPTIONS.map((avatar, index) => (
              <div
                key={index}
                onClick={() => updateAvatar(avatar)}
                className={`cursor-pointer p-1 rounded-lg ${
                  currentAvatar === avatar ? 'ring-2 ring-blue-500' : ''
                } hover:bg-gray-50 transition-colors duration-200`}
              >
                <img
                  src={avatar}
                  alt={`Avatar option ${index + 1}`}
                  className="w-10 h-10 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileMenu;