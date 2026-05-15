"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCinemaRoomSchema = exports.createCinemaRoomSchema = void 0;
const zod_1 = require("zod");
exports.createCinemaRoomSchema = zod_1.z.object({
    cinemaId: zod_1.z.string().uuid(),
    roomName: zod_1.z.string().min(2),
    roomType: zod_1.z.string().min(2),
    totalSeats: zod_1.z.number().int().positive(),
    screenType: zod_1.z.string().optional(),
    soundSystem: zod_1.z.string().optional(),
});
exports.updateCinemaRoomSchema = exports.createCinemaRoomSchema.partial();
//# sourceMappingURL=activityLog.schema.js.map