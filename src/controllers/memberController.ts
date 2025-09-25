import { Request, Response } from "express";
import prisma from "../utils/prisma.js";

// ✅ Use primitive types
interface MemberProps {
    relation: string;
    name: string;
    age: number;
    occupation: string;
    personId: string
}

// ✅ Create member
export const createMember = async (
    req: Request<{}, {}, MemberProps>,
    res: Response
) => {
    const { relation, name, age, occupation, personId } = req.body;

    try {
        // Validate inputs
        if (!relation || !name || !age || !occupation) {
            return res.status(400).json({
                message: "Please enter all required fields",
            });
        }

        // Check if relation already exists
        const existingRelation = await prisma.familyMember.findUnique({
            where: {
                relation,
            },
        });

        if (existingRelation) {
            return res.status(409).json({
                message: "Relation already exists",
            });
        }

        // Create new member
        const newMember = await prisma.familyMember.create({
            data: {
                relation,
                name,
                age,
                occupation,
                personId
            },
        });

        res.status(201).json({
            message: "Member created successfully",
            data: newMember,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

// ✅ Fetch districts
export const fetchMembers = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await prisma.familyMember.findMany();
        res.status(200).json({ message: "Data fetched", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
