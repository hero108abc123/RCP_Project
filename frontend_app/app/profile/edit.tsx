import Icon from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonCustom from '../../components/button';
import FormInput from '../../components/form-input';
import { ThemedView } from '../../components/themed-view';

export type ProfileFormData = {
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDay: string;
};

type EditProps = {
  formData: ProfileFormData;
  onChange: (field: keyof ProfileFormData, value: string) => void;
};

export default function Edit({ formData, onChange }: EditProps) {
  const router = useRouter();
  const safeFormData: ProfileFormData = formData || {
    userName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    birthDay: '',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
                {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color="#000000ff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 24 }} /> {/* giữ cân đối */}
        </View>
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >

{/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require('../../assets/images/anime1.jpg')}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editIcon}>
                <Icon name="pencil" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>

{/* Form Section */}
          <View >
            <View style={styles.formInput}>
                <FormInput label="User Name" value={safeFormData.userName} onChangeText={(value) => onChange('userName', value)} />
                <FormInput label="Full Name" value={safeFormData.fullName} onChangeText={(value) => onChange('fullName', value)} />
                <FormInput label="Email" value={safeFormData.email} onChangeText={(value) => onChange('email', value)} />
                <FormInput label="Phone Number" value={safeFormData.phoneNumber} onChangeText={(value) => onChange('phoneNumber', value)} />
                <FormInput label="Birthday" value={safeFormData.birthDay} onChangeText={(value) => onChange('birthDay', value)} />

                <View style={{ alignItems: 'center', marginTop: 80 }}>
                <ButtonCustom
                    backgroundColor='#3e73beff'
                    title="Save Changes"
                    textColor='white'
                    paddingVertical={10}
                    borderRadius={20}
                    paddingHorizontal={30}
                    onPress={() => { // api put
                      router.back();
                    }}  
                />
                </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#1f2937",
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
  profileCard: {
    height: 140,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
    marginBottom: 20,
    marginLeft: 200,
    position: 'absolute',
    top: 40,
    zIndex: 1,
  },
  avatarWrapper: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  formInput: {
    marginTop: 125,
    paddingTop: 80,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#f3f4f6",
    minHeight: '100%',
  },
});
