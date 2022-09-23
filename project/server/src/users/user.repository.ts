import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseData } from "./interface/user.interface";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async find(): Promise<UserResponseData[]> {
        return await this.userModel.find({})
    }

    async findOne(userQuery: FilterQuery<User>): Promise<UserResponseData> {
        return (await this.userModel.findOne(userQuery)).toObject()
    }

    async getUserByEmail(email: string): Promise<UserResponseData> {
        return (await this.userModel.findOne({ email: email })).toObject()
    }

    async create(user: CreateUserDto): Promise<UserResponseData> {
        return (await this.userModel.create(user)).toObject()
    }
}