import {PassportStrategy} from "@nestjs/passport";
import {User} from "./schemas/user.schema";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Strategy, ExtractJwt} from "passport-jwt";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload){
        const { id } = payload;

        const user = await this.userModel.findById(id);

        if(!user) {
            throw new UnauthorizedException('Please login to access this resource');
        }

        return user;
    }
}
