import LeaveBalance from '#models/leave_balance'
import LeaveRequest from '#models/leave_request'
import { DateTime } from 'luxon'
import app from '@adonisjs/core/services/app'

export default class LeaveService {
  // EMPLOYEE
  async submitLeave(user: any, data: any, attachment: any) {
    const currentYear = DateTime.now().year

    const start = DateTime.fromISO(data.startDate)
    const end = DateTime.fromISO(data.endDate)
    const requestedDays = end.diff(start, 'days').days + 1 

    if (requestedDays <= 0) {
      throw new Error('End date must be after the start date.')
    }

    let balance = await LeaveBalance.query()
      .where('userId', user.id)
      .where('year', currentYear)
      .first()

    if (!balance) {
      balance = await LeaveBalance.create({
        userId: user.id,
        year: currentYear,
        totalQuota: 12,
        usedQuota: 0,
      })
    }

    if (balance.usedQuota + requestedDays > balance.totalQuota) {
      throw new Error(`Quota exceeded. You only have ${balance.totalQuota - balance.usedQuota} days left.`)
    }

    let attachmentPath = null
    if (attachment) {
      await attachment.move(app.makePath('uploads'), {
        name: `${new Date().getTime()}_${attachment.clientName}`,
      })
      attachmentPath = `uploads/${attachment.fileName}`
    }

    const leaveRequest = await LeaveRequest.create({
      userId: user.id,
      startDate: start,
      endDate: end,
      reason: data.reason,
      attachmentPath: attachmentPath,
      status: 'pending',
    })

    return leaveRequest
  }

  // ADMIN
  async getAllRequests() {
    return await LeaveRequest.query()
      .preload('user', (query) => {
        query.select('id', 'fullName', 'email')
      })
      .orderBy('createdAt', 'desc')
  }

  async updateStatus(requestId: number, newStatus: 'approved' | 'rejected') {
    const leaveRequest = await LeaveRequest.findOrFail(requestId)

    if (leaveRequest.status !== 'pending') {
      throw new Error('This request has already been processed.')
    }

    leaveRequest.status = newStatus
    await leaveRequest.save()

    if (newStatus === 'approved') {
      const requestedDays = leaveRequest.endDate.diff(leaveRequest.startDate, 'days').days + 1

      const balance = await LeaveBalance.query()
        .where('userId', leaveRequest.userId)
        .where('year', leaveRequest.startDate.year)
        .firstOrFail()

      balance.usedQuota += requestedDays
      await balance.save()
    }

    return leaveRequest
  }
}