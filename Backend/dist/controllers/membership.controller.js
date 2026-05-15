"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMembershipController = exports.updateMembershipController = exports.createMembershipController = exports.getMembershipController = void 0;
const membership_service_1 = require("../services/membership.service");
const errorHandler_1 = require("../utils/errorHandler");
const membership_service_2 = require("../services/membership.service");
const membership_schema_1 = require("../validations/membership.schema");
const getMembershipController = async (req, res) => {
    try {
        const membership = await (0, membership_service_1.getMembershipService)(req.user.id);
        return res.status(200).json({
            success: true,
            data: membership,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to get membership" });
    }
};
exports.getMembershipController = getMembershipController;
const createMembershipController = async (req, res) => {
    try {
        const membership = await (0, membership_service_2.createMembershipService)(req.user.id);
        return res.status(201).json({
            success: true,
            data: membership,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to create membership" });
    }
};
exports.createMembershipController = createMembershipController;
const updateMembershipController = async (req, res) => {
    try {
        const validatedData = membership_schema_1.updateMembershipSchema.parse(req.body);
        const membership = await (0, membership_service_2.updateMembershipService)(req.user.id, validatedData);
        return res.status(200).json({
            success: true,
            data: membership,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to update membership" });
    }
};
exports.updateMembershipController = updateMembershipController;
const deleteMembershipController = async (req, res) => {
    try {
        await (0, membership_service_2.deleteMembershipService)(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Membership deleted successfully",
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error, res, defaultMessage: "Failed to delete membership" });
    }
};
exports.deleteMembershipController = deleteMembershipController;
//# sourceMappingURL=membership.controller.js.map