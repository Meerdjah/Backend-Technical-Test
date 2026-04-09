import type { HttpContext } from '@adonisjs/core/http'
import LeaveService from '#services/leave_service'
import LeaveRequest from '#models/leave_request'
import LeaveBalance from '#models/leave_balance'

export default class LeaveRequestsController {
  private leaveService = new LeaveService()
  async store({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const data = request.only(['startDate', 'endDate', 'reason'])
    const attachment = request.file('attachment', {
      size: '2mb',
      extnames: ['jpg', 'png', 'pdf', 'docx'],
    })

  // Employee
    try {
      const leaveRequest = await this.leaveService.submitLeave(user, data, attachment)
      return response.created({
        message: 'Leave request submitted successfully',
        data: leaveRequest,
      })
    } catch (error) {
      if (error instanceof Error) {
        return response.badRequest({ message: error.message })
      }
      return response.badRequest({ message: 'An unexpected error occurred.' })
    }
  }

  async myRequests({ response, auth }: HttpContext) {
    const user = auth.user!
    
    const requests = await LeaveRequest.query().where('userId', user.id).orderBy('createdAt', 'desc')
    
    return response.ok({ data: requests })
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