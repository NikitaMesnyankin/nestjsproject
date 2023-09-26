import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";

import { JwtAuthGuard } from "./jwt-auth.guard";
import * as i from "../../entities/interfaces";

export const RolesGuard = (role: i.Interfaces.Roles): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const { user } = context
        .switchToHttp()
        .getRequest<i.Interfaces.UserReq>();

      return user.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};
