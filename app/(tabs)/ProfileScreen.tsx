import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { logout, getCurrentUser } from '@/utils/auth';  
import { UserProgress, getUserProgress, calculateBadges, calculateRank } from '@/utils/userProgress';  

const ProfileScreen = () => {
  const router = useRouter();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/WelcomeScreen');
        return;
      }

      setUsername(user);
      const userProgress = await getUserProgress(user);
      setProgress(userProgress);
      setLoading(false);
    };

    loadData();
  }, []);

  const showProgressInfo = () => {
    alert('Pour devenir 🌍 Éco-Citoyen :\n10 rapports & 3 types de déchets simulés.');
  };

  if (loading || !progress) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chargement...</Text>
      </View>
    );
  }

  const badges = calculateBadges(progress);
  const rank = calculateRank(progress);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profil Utilisateur</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Nom : {username}</Text>
        <Text style={styles.detail}>Total Collecté : {progress.totalWeight} kg</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ton Rang Actuel :</Text>
        <Text style={styles.rank}>{rank.icon} {rank.name}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${rank.progress}%` }]} />
        </View>
        <TouchableOpacity style={styles.progressBtn} onPress={showProgressInfo}>
          <Text style={styles.btnText}>Voir comment progresser ➕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🎖️ Tes Badges :</Text>
        <FlatList
          data={badges.map((b, index) => ({ id: index.toString(), name: b }))}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.badgeRow}
          renderItem={({ item }) => (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={async () => {
        await logout();
        router.replace('/WelcomeScreen');
      }}>
        <Text style={styles.logoutText}>🚪 Se Déconnecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secretButton}
        onPress={() => router.push('/SecretProgress')}
      >
        <Text style={styles.secretText}>🛠️ Dev: Modifier Progrès</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fafd',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  detail: {
    fontSize: 15,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#27ae60',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
  },
  progressBtn: {
    backgroundColor: '#dff9fb',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#2980b9',
    fontWeight: '600',
  },
  badgeRow: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
  marginTop: 20,
  backgroundColor: '#e74c3c',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secretButton: {
    marginTop: 10,
    backgroundColor: '#34495e',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secretText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});