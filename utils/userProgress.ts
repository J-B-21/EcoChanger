import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_KEY_PREFIX = 'progress_';

export const saveUserProgress = async (username: string, progress: object) => {
  try {
    await AsyncStorage.setItem(`${USER_KEY_PREFIX}${username}`, JSON.stringify(progress));
    } catch (error) {
    console.error('Failed to save user progress:', error);
  }
};

export const getUserProgress = async (username: string) => {
  try {
    const data = await AsyncStorage.getItem(`${USER_KEY_PREFIX}${username}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load user progress:', error);
    return null;
  }
};

export type UserProgress = {
  totalReports: number;
  totalWeight: number;
  wasteTypes: string[];
  photosUploaded: number;
  visitedPoints: string[];
  consecutiveDays: number;
  invitedFriends: number;
  ecoTipsRead: number;
};

export const calculateBadges = (progress: UserProgress): string[] => {
  const badges: string[] = [];

  if (progress.consecutiveDays >= 3) badges.push('🕓 Ponctuel');
  if ((progress.wasteTypes.filter(t => t === 'Plastique').length || 0) >= 5) badges.push('🧃 Tri Plastique');
  if ((progress.wasteTypes.filter(t => t === 'Organique').length || 0) >= 3) badges.push('🍃 Déchet Vert');
  if (new Set(progress.visitedPoints).size >= 3) badges.push('📍 Explorateur');
  if (progress.photosUploaded >= 5) badges.push('📷 Reporter');
  if (progress.totalReports >= 3) badges.push('⚡ Recyclage Express');
  if (['Plastique', 'Verre', 'Organique', 'Métal'].every(type => progress.wasteTypes.includes(type)))
    badges.push('🧩 Multi-trieur');
  if (progress.invitedFriends >= 1) badges.push('🧑🤝🧑 Éco-Influenceur');
  if (progress.ecoTipsRead >= 10) badges.push('🧠 Conseiller');

  return badges;
};

export const calculateRank = (progress: UserProgress): { name: string; icon: string; progress: number } => {
  const { totalReports, totalWeight, wasteTypes, invitedFriends } = progress;

  if (totalReports >= 50 && invitedFriends >= 3)
    return { name: '🧠 Ambassadeur', icon: '🧠', progress: 100 };
  if (totalReports >= 25 && totalWeight >= 50)
    return { name: '🏅 Éco-Héros', icon: '🏅', progress: 80 };
  if (totalReports >= 10 && new Set(wasteTypes).size >= 3)
    return { name: '🌍 Éco-Citoyen', icon: '🌍', progress: 60 };
  if (totalReports >= 5 || totalWeight >= 10)
    return { name: '♻ Recycleur Actif', icon: '♻️', progress: 40 };

  return { name: '🌱 Novice Vert', icon: '🌱', progress: 10 };
};