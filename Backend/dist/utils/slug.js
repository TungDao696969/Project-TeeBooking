"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug2 = exports.generateSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
const generateSlug = (title) => {
    return (0, slugify_1.default)(title, {
        lower: true,
        strict: true,
        locale: "vi",
    });
};
exports.generateSlug = generateSlug;
const generateSlug2 = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};
exports.generateSlug2 = generateSlug2;
//# sourceMappingURL=slug.js.map