const BASE_URL = "http://localhost:8006";

export const searchPaths = async (query) => {
  const res = await fetch(`${BASE_URL}/paths/search?q=${query}`);
  return res.json();
};

export const getPathDetail = async (id) => {
  await fetch(`${BASE_URL}/paths/${id}/view`, { method: "POST" });

  const res = await fetch(`${BASE_URL}/paths/${id}`);
  return res.json();
};

export const enrollPath = async (id, userId) => {
  const res = await fetch(`${BASE_URL}/paths/${id}/enroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });

  return res.json();
};

export const getProgress = async (id, userId) => {
  const res = await fetch(
    `${BASE_URL}/paths/${id}/progress?user_id=${userId}`
  );
  return res.json();
};