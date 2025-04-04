import React, { useState } from "react";
import { assets } from "~/assets/assets";

const AVATAR_OPTIONS = [
  assets.avatar_image01,
  assets.avatar_image02,
  assets.avatar_image03,
  assets.avatar_image04,
  assets.avatar_image05,
  assets.avatar_image06
];

interface ProfileSettingsProps {
  onAvatarSelect: (avatarUrl: string) => void;
  currentAvatar?: string | null;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onAvatarSelect, currentAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(currentAvatar || null);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    onAvatarSelect(avatar);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Choose Your Avatar</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {AVATAR_OPTIONS.map((avatar, index) => (
          <div 
            key={index}
            className={`relative cursor-pointer rounded-lg overflow-hidden
              ${selectedAvatar === avatar ? 'ring-2 ring-blue-500' : ''}
            `}
            onClick={() => handleAvatarSelect(avatar)}
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-24 h-24 object-cover"
            />
            {selectedAvatar === avatar && (
              <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                <span className="text-white text-2xl">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;