const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const aiChatApi = {
  sendMessage: async (userId: string, message: string) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add ngrok skip warning header just in case for local dev
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        user_id: userId,
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.statusText}`);
    }

    return response.json();
  },

  generateReport: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Report API error: ${response.statusText}`);
    }

    return response.json();
  },
};
