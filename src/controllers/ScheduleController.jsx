// src/controllers/ScheduleController.js
import apiClient from "../services/api-client";
import Schedule from "../models/ScheduleModel.jsx"; 
class ScheduleController {
  async getAll() {
    const res = await apiClient.get("/schedules");
    return res.data.map(s => new Schedule(s));
  }

  async create(data) {
    const res = await apiClient.post("/schedules", data);
    return new Schedule(res.data);
  }

  async delete(id) {
    await apiClient.delete(`/schedules/${id}`);
  }
}

// ✅ EXPORT INSTANCE (QUAN TRỌNG)
export default new ScheduleController();
