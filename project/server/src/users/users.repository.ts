import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async find(): Promise<User[]> {
        return this.userModel.find({})
    }
}