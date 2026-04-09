import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    const user = ctx.auth.user
    if (!user || !allowedRoles.includes(user.role)) {
      return ctx.response.forbidden({
        message: 'Access denied: You do not have the required permissions for this action.',
      })
    }
    await next()
  }
}