import { Redirect } from 'expo-router';

export default function AuthIndex() {
  // Khi vào nhóm (auth), tự động chuyển tới Login
  return <Redirect href="/(auth)/Login" />;
}
