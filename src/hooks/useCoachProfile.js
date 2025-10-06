import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { coachProfileService } from '../services/coachProfileService';

export const useCoachProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const profileData = await coachProfileService.getProfile();
        setProfile(profileData);
        setError(null);
      } catch (err) {
        // Si no existe perfil, no es un error
        if (err.message.includes('no encontrado')) {
          setProfile(null);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const needsProfileCompletion = user && !loading && !profile;
  const hasCompleteProfile = user && profile && profile.club_institution && profile.division && profile.gender;

  return {
    profile,
    loading,
    error,
    needsProfileCompletion,
    hasCompleteProfile,
    refreshProfile: () => {
      setLoading(true);
      setError(null);
      // Recargar perfil
      if (user) {
        coachProfileService.getProfile()
          .then(setProfile)
          .catch(err => {
            if (err.message.includes('no encontrado')) {
              setProfile(null);
            } else {
              setError(err.message);
            }
          })
          .finally(() => setLoading(false));
      }
    }
  };
};
