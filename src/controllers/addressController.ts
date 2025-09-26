import { Request, Response } from "express";
import prisma from '../utils/prisma.js';




interface AddressProps {
    village?: string,
    town?: string,
    district: string,
    state: string,
    pin: number
}
interface Params {
    personId: string;
}

export const createAddress = async (req: Request<Params, {}, AddressProps>, res: Response) => {

    const data = req.body;
    const { personId } = req.params
    try {
        const {
            village,
            town,
            district,
            state,
            pin
        } = data

        if (!village || !state || !district || !pin) {
            return res.status(400).json(
                { success: false, error: "village, state and  password are required" },
            );
        }
        const address = await prisma.address.create({
            data: {
                personId,
                village,
                town,
                district,
                state,
                pin
            },
        });
        return res.status(201).json({ success: true, data: address });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error
        });

    }


}






