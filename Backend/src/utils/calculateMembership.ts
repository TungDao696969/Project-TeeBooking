export const calculateMembershipLevel = (lifetimePoints: number): string => {
  if (lifetimePoints >= 50000) return "PLATINUM";
  if (lifetimePoints >= 20000) return "GOLD";
  if (lifetimePoints >= 5000) return "SILVER";
  return "BRONZE";
};
