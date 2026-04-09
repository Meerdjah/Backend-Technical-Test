import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import LeaveBalance from '#models/leave_balance'
import LeaveRequest from '#models/leave_request'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }
  
  @column()
  declare role: 'employee' | 'admin'

  @column()
  declare oauthProvider: string | null

  @column()
  declare oauthId: string | null
  
  @hasMany(() => LeaveBalance)
  declare leaveBalances: HasMany<typeof LeaveBalance>

  @hasMany(() => LeaveRequest)
  declare leaveRequests: HasMany<typeof LeaveRequest>
}
