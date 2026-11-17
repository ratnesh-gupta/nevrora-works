import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

export const server = app.listen(PORT, () => {
  console.log(`[Nevrora API] Server running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("[Nevrora API] SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("[Nevrora API] Server terminated.");
  });
});
