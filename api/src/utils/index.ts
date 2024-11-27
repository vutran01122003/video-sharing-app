import { isValidObjectId } from "mongoose";

export const checkObjectId = (id: string) => {
    return isValidObjectId(id);
};
