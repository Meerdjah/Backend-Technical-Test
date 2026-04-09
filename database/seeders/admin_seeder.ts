import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreateMany('email', [
      {
        fullName: 'System Administrator',
        email: 'admin@example.com',
        password: 'adminonly',
        role: 'admin',
      }
    ])
  }
}