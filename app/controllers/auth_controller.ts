import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      return response.badRequest({ message: 'Email already in use' })
    }

    const user = await User.create(data)

    return response.created({
      message: 'User registered successfully',
      user,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return response.ok({
        message: 'Login successful',
        token: token,
        user: user,
      })
    } catch (error) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  async redirect({ ally, params }: HttpContext) {
    const provider = params.provider 
    return ally.use(provider).redirect()
  }

  async callback({ ally, params, response }: HttpContext) {
    const provider = params.provider
    const allyUser = await ally.use(provider).user()

    let user = await User.findBy('email', allyUser.email)

    if (!user) {
      user = await User.create({
        fullName: allyUser.name,
        email: allyUser.email,
        oauthProvider: provider,
        oauthId: allyUser.id,
      })
    } else {
      user.oauthProvider = provider
      user.oauthId = allyUser.id
      await user.save()
    }

    const token = await User.accessTokens.create(user)

    return response.ok({
      message: `${provider} Login successful`,
      token: token,
      user: user,
    })
  }
}