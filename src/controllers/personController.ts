import { Request, Response } from "express";
import prisma from '../utils/prisma.js';





export const createPerson = async (req: Request<{}, {}, any>, res: Response) => {



    try {

        const {
            name,
            age,
            gender,
            isAcccused,
            dossierNo,
            checkingId
        } = req.body;

        if (!name || !age || !gender) {
            return res.status(400).json(
                { success: false, error: "Name, email, and password are required" },
            );
        }


        // if (existing) {
        //     return res.status(409).json(
        //         { success: false, error: "A user with this email already exists" },

        //     );
        // }



        const newUser = await prisma.person.create({
            data: {
                name,
                age,
                gender,
                isAcccused,
                dossierNo,
                checkingId
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




export const fetchPerson = async (req: Request, res: Response): Promise<any> => {


    try {
        const data = await prisma?.person.findMany()
        res.status(201).json({ message: 'Data fetched', data: data });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error', error: error });

    }
}



