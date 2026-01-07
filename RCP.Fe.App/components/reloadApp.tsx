import * as Updates from "expo-updates";
import { Alert } from "react-native";

const reloadApp = async () => {
  try {
    // Hàm này sẽ reload lại JS Bundle hiện tại
    await Updates.reloadAsync();
  } catch (error) {
    Alert.alert("Lỗi", "Không thể reload ứng dụng");
  }
};
export default reloadApp;
