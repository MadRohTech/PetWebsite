import { create } from "zustand";

// Helper function to get initial state from localStorage
const getInitialState = () => {
  try {
    const storedData = localStorage.getItem("authData");
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  // Default state if nothing in localStorage
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

export const useAuthStore = create((set) => ({
  // Initialize state from localStorage
  ...getInitialState(),

  // Login action - updates store and localStorage
  login: (userData) => {
    localStorage.setItem(
      "authData",
      JSON.stringify({
        user: userData.user,
        token: userData.token,
        isAuthenticated: true,
      })
    );

    set({
      user: userData.user,
      token: userData.token,
      isAuthenticated: true,
    });
  },

  // Logout action - clears store and localStorage
  logout: () => {
    localStorage.removeItem("authData");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  // Update user profile
  updateUser: (updatedUserData) => {
    set((state) => {
      const newState = {
        ...state,
        user: {
          ...state.user,
          ...updatedUserData,
        },
      };

      // Update localStorage with new state
      localStorage.setItem("authData", JSON.stringify(newState));

      return newState;
    });
  },
}));
