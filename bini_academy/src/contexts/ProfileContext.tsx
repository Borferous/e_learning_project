import { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
  profilePicUrl: string | undefined;
  updateProfilePic: (url: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | undefined>(
    "https://placekitten.com/200/200" // Default placeholder
  );

  const updateProfilePic = (url: string) => {
    setProfilePicUrl(url);
  };

  return (
    <ProfileContext.Provider value={{ profilePicUrl, updateProfilePic }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};