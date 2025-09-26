import { Request, Response } from "express";
import prisma from '../utils/prisma.js';





export const createChecking = async (req: Request<{}, {}, any>, res: Response) => {

    const data = req.body;

    try {
        const {
            checkingOfficerName,
            policeStation,
            captured
        } = data

        if (!checkingOfficerName || !policeStation) {
            return res.status(400).json(
                { success: false, error: "Name, email, and password are required" },
            );
        }
        const newUser = await prisma.checking.create({
            data: {
                checkingOfficerName,
                policeStation,
                captured
            },
        });
        return res.status(201).json({ success: true, data: newUser });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error
        });

    }


}




export const getChecking = async (req: Request, res: Response): Promise<any> => {


    try {
        const data = await prisma?.checking.findMany()
        res.status(201).json({ message: 'Data fetched', data: data });

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error', error: error });

    }
}



