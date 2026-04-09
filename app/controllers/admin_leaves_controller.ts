import type { HttpContext } from '@adonisjs/core/http'
import LeaveService from '#services/leave_service'

export default class AdminLeavesController {
  private leaveService = new LeaveService()

  async index({ response }: HttpContext) {
    const requests = await this.leaveService.getAllRequests()
    
    return response.ok({
      message: 'Successfully fetched all leave requests',
      data: requests,
    })
  }

  async update({ request, response, params }: HttpContext) {
    const { status } = request.only(['status'])
    
    if (!['approved', 'rejected'].includes(status)) {
      return response.badRequest({ message: 'Status must be either approved or rejected' })
    }

    try {
      const updatedRequest = await this.leaveService.updateStatus(params.id, status)
      
      return response.ok({
        message: `Leave request successfully ${status}`,
        data: updatedRequest,
      })
    } catch (error) {
      if (error instanceof Error) {
        return response.badRequest({ message: error.message })
      }
      return response.badRequest({ message: 'An unexpected error occurred.' })
    }
  }
}