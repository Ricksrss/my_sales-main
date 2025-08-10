import { AppDataSource } from "shared/typeorm/data.source";
import UserToken from "../entities/UserToken";

export const userTokensRepositories = AppDataSource.getRepository(UserToken).extend({
  async findByToken(token: string): Promise<UserToken | undefined> {
  const userToken = await this.findOneBy({ token  });
  return userToken ?? undefined;
},
  async generate(user_id: number): Promise<UserToken> {
    const userToken = this.create({
      user_id,

    });

    await this.save(userToken);

    return userToken;
  }
});
