import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons as Icon } from '@expo/vector-icons';
import { ThemedView } from '../../components/themed-view';
import ButtonCustom from '../../components/button';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color="#000000ff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={{ width: 24 }} /> {/* giữ cân đối */}
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Avatar + Info */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon} onPress={() => router.push('/edit')}>
              <Icon name="pencil" size={14} color="#000000ff" />
            </TouchableOpacity>
            <View style={{ width: 30 }} />
            <View >
              <Text style={styles.name}>Đoàn Trần Hải</Text>
              <Text style={styles.email}>haitrandoan@gmail.com</Text>


              <TouchableOpacity  >
                <ButtonCustom title="Edit Profile" 
                backgroundColor="#5786ee"
                textColor="#fff"
                borderRadius={10}
                paddingVertical={7}
                marginHorizontal={20}
                
                onPress={() => {
                  router.push('/edit');
                  console.log('Edit Profile pressed');
                }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Menu */}
          <View style={styles.menuSection}>
            <MenuItem icon="heart-outline" label="Favorite" />
            <MenuItem icon="location-outline" label="Location" />
            <MenuItem icon="globe-outline" label="Language" />
            <MenuItem icon="log-out-outline" label="Log out" />
            {/* <MenuItem icon="log-out-outline" label="Log out" /> Viết thêm hàm logic để logout */}
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, label }: { icon: React.ComponentProps<typeof Icon>['name']; label: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <Icon name={icon} size={22} color="#000" />
        <Text style={styles.menuText}>{label}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={20} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393f4e',
  },
  header: {
    backgroundColor: '#ffffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: '#000000ff',
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 30,
      
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    // backgroundColor: '#ffffffff',
    paddingBottom: 40,

  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 8,
  },
  editIcon: {
    position: 'absolute',
    bottom: 50,
    right: 185,
    backgroundColor: '#ffffffff',
    borderRadius: 10,
    padding: 4,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  email: {
    color: '#ccc',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#4F8EF7',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minWidth: '100%',
    minHeight: '100%',
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomColor: '#999',
    borderBottomWidth: 0.5,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
});
