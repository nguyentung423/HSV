const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = {
  baseUrl: API_BASE_URL,

  async getSystems() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/systems`);
      if (!response.ok) throw new Error("Failed to fetch systems");
      return await response.json();
    } catch (error) {
      console.error("Error fetching systems:", error);
      return [];
    }
  },

  async getSystemDetail(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/systems/${id}`);
      if (!response.ok) throw new Error("Failed to fetch system detail");
      return await response.json();
    } catch (error) {
      console.error("Error fetching system detail:", error);
      return null;
    }
  },

  getStaticUrl(path) {
    return `${API_BASE_URL}${path}`;
  },
};
