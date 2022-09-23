import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async find(): Promise<User[]> {
        return this.userModel.find({}).exec()
    }

    async findOne(userQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(userQuery).exec()
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email: email }).exec()
    }

    async create(user: CreateUserDto): Promise<User> {
        return this.userModel.create(user)
    }
}