export const callConfetti = async () => {
  const confetti = await import("https://cdn.skypack.dev/canvas-confetti");

  confetti.default();
};
