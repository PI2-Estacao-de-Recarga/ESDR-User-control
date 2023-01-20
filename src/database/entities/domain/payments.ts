import { StatusEnum } from "../enums/status";
import { User } from "./user";

export type Payments = {
    qrCode: string

    qrCodeText: string

    status: StatusEnum

    totalAmount: number

    externalId?: string

    end2endId: string

    searchId: string;

    documentNumber: number;

    pixKeyBody?: string;

    user: User;
}