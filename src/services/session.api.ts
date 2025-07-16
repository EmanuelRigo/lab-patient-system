// services/session.api.ts

import envsUtils from "@/utils/envs.utils";
const BACKEND_URL = envsUtils.BACKEND_URL;

const sessionApi = {
  login: async (credentials: { username: string; password: string }) => {
    return await fetch(`${BACKEND_URL}/api/session/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  },

  async loginUser(credentials: {
    username: string;
    password: string;
  }): Promise<Response> {
    const res = await fetch(`${BACKEND_URL}/api/session/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    return res;
  },

  logout: async () => {
    console.log("logout");
    return await fetch(`${BACKEND_URL}/api/session/signout`, {
      method: "POST",
      credentials: "include",
    });
  },

  checkOnlineStatus: async () => {
    return await fetch(`${BACKEND_URL}/api/session/online`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
  },

  deleteAccount: async (password: string) => {
    return await fetch(`${BACKEND_URL}/api/session/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
  },
};

export default sessionApi;
