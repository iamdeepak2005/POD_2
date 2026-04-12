// ⚠️ IMPORTANT: Replace with your system IP
const BASE_URL = "http://192.168.1.5:8006"; 

// 🔍 SEARCH PATHS
export const searchPaths = async (query) => {
  const res = await fetch(`${BASE_URL}/paths/search?q=${query}`);
  if (!res.ok) throw new Error("Failed to fetch paths");
  return res.json();
};

// 📄 GET PATH DETAIL + RECORD VIEW
export const getPathDetail = async (id) => {
  await fetch(`${BASE_URL}/paths/${id}/view`, {
    method: "POST",
  });

  const res = await fetch(`${BASE_URL}/paths/${id}`);
  if (!res.ok) throw new Error("Failed to fetch path detail");

  return res.json();
};

// 🎯 ENROLL USER
export const enrollPath = async (id, userId) => {
  const res = await fetch(`${BASE_URL}/paths/${id}/enroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!res.ok) throw new Error("Enrollment failed");

  return res.json();
};

// 📊 GET PROGRESS
export const getProgress = async (id, userId) => {
  const res = await fetch(
    `${BASE_URL}/paths/${id}/progress?user_id=${userId}`
  );

  if (!res.ok) throw new Error("Failed to fetch progress");

  return res.json();
};

// ➕ CREATE PATH (ADMIN)
export const createPath = async (payload, token) => {
  const res = await fetch(`${BASE_URL}/paths`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 REQUIRED
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to create path");
  }

  return res.json();
};

// ➕ ADD ITEMS TO PATH (ADMIN)
export const addItemsToPath = async (pathId, playlistIds, token) => {
  const res = await fetch(`${BASE_URL}/paths/${pathId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // required
    },
    body: JSON.stringify({
      playlist_ids: playlistIds,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to add items");
  }

  return res.json();
};