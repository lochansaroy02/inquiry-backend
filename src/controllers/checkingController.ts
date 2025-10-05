import { Gender } from '@prisma/client'; // Import the generated Gender enum
import { Request, Response } from "express";
import prisma from '../utils/prisma.js';

/**
 * Creates a new, complete Checking record in a single atomic transaction.
 */
export const createChecking = async (req: Request, res: Response) => {
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
        const newReport = await prisma.checking.create({
            data: {
                // Main Checking details
                checkingId,
                checkingOfficerName,
                policeStation,
                captureCount: captured.length,

                // 🚀 This is where the magic happens.
                // Prisma creates all related records in one go.
                captured: {
                    create: captured.map((data: any) => {
                        const { person, address, familyMembers } = data;

                        // Ensure gender is a valid enum value
                        const genderValue = Object.values(Gender).includes(person.gender) ? person.gender : Gender.male;

                        return {
                            // Person details
                            ...person,
                            gender: genderValue,
                            // Nested create for the Address
                            Address: {
                                create: address,
                            },
                            // Nested create for Family Members
                            members: {
                                create: familyMembers,
                            },
                        };
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

    } catch (error: any) {
        console.error("Error creating checking report:", error);

        // Handle unique constraint violation for checkingId
        if (error.code === 'P2002' && error.meta?.target?.includes('checkingId')) {
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
};