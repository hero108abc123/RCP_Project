import axios from "axios";

export const register = async (fullName, userName, email, phoneNumber, birthDay, password) => {
  const url = "http://10.0.2.2:5025/api/app/user/register";

  console.log("🔹 [REGISTER] Sending request to:", url);
  console.log("🔹 [REGISTER] Payload:", { fullName, userName, email, phoneNumber, birthDay, password });

  try {
    const res = await axios.post(url, { fullName, userName, email, phoneNumber, birthDay, password });

    console.log("✅ [REGISTER] Response status:", res.status);
    console.log("✅ [REGISTER] Response data:", res.data);

    return res.data;
  } catch (error) {
    console.log("❌ [REGISTER] Error message:", error.message);

    if (error.response) {
      console.log("❌ [REGISTER] Status:", error.response.status);
      console.log("❌ [REGISTER] Data:", error.response.data);
      console.log("❌ [REGISTER] URL:", error.response.config.url);
      console.log("❌ [REGISTER] Method:", error.response.config.method);
    } else if (error.request) {
      console.log("⚠️ [REGISTER] No response received from server.");
      console.log("⚠️ [REGISTER] Request details:", error.request);
    } else {
      console.log("⚠️ [REGISTER] Setup error:", error.message);
    }

    throw error;
  }
};
