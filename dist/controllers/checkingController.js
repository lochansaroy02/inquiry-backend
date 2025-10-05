var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Gender } from '@prisma/client'; // Import the generated Gender enum
import prisma from '../utils/prisma.js';
/**
 * Creates a new, complete Checking record in a single atomic transaction.
 */
export const createChecking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { checkingId, checkingOfficerName, policeStation, captured } = req.body;
        // ✅ 1. Validate the incoming datacc
        if (!checkingId || !checkingOfficerName || !policeStation || !captured || !Array.isArray(captured) || captured.length === 0) {
            return res.status(400).json({
                success: false,
                error: "A unique checkingId, officer name, station, and at least one captured person are required."
            });
        }
        // ✅ 2. Use a single Prisma 'create' call with nested writes
        const newReport = yield prisma.checking.create({
            data: {
                // Main Checking details
                checkingId,
                checkingOfficerName,
                policeStation,
                captureCount: captured.length,
                // 🚀 This is where the magic happens.
                // Prisma creates all related records in one go.
                captured: {
                    create: captured.map((data) => {
                        const { person, address, familyMembers } = data;
                        // Ensure gender is a valid enum value
                        const genderValue = Object.values(Gender).includes(person.gender) ? person.gender : Gender.male;
                        return Object.assign(Object.assign({}, person), { gender: genderValue, 
                            // Nested create for the Address
                            Address: {
                                create: address,
                            }, 
                            // Nested create for Family Members
                            members: {
                                create: familyMembers,
                            } });
                    }),
                },
            },
            // ✅ 3. Include all the created data in the response
            include: {
                captured: {
                    include: {
                        Address: true,
                        members: true,
                    }
                }
            }
        });
        return res.status(201).json({ success: true, data: newReport });
    }
    catch (error) {
        console.error("Error creating checking report:", error);
        // Handle unique constraint violation for checkingId
        if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('checkingId'))) {
            return res.status(409).json({
                success: false,
                message: `A checking report with ID '${req.body.checkingId}' already exists.`,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});
//# sourceMappingURL=checkingController.js.map