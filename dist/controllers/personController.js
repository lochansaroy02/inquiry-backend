var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../utils/prisma.js';
export const createPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, gender, isAcccused, dossierNo, checkingId } = req.body;
        if (!name || !age || !gender) {
            return res.status(400).json({ success: false, error: "Name, email, and password are required" });
        }
        // if (existing) {
        //     return res.status(409).json(
        //         { success: false, error: "A user with this email already exists" },
        //     );
        // }
        const newUser = yield prisma.person.create({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error: error
        });
    }
});
export const fetchPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (prisma === null || prisma === void 0 ? void 0 : prisma.person.findMany());
        res.status(201).json({ message: 'Data fetched', data: data });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error', error: error });
    }
});
//# sourceMappingURL=personController.js.map