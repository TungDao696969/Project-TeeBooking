"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMembershipLevel = void 0;
const calculateMembershipLevel = (lifetimePoints) => {
    if (lifetimePoints >= 50000)
        return "PLATINUM";
    if (lifetimePoints >= 20000)
        return "GOLD";
    if (lifetimePoints >= 5000)
        return "SILVER";
    return "BRONZE";
};
exports.calculateMembershipLevel = calculateMembershipLevel;
//# sourceMappingURL=calculateMembership.js.map