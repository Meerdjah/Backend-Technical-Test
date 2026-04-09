/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    redirect: typeof routes['auth.redirect']
    callback: typeof routes['auth.callback']
  }
  leaveRequests: {
    store: typeof routes['leave_requests.store']
    myRequests: typeof routes['leave_requests.my_requests']
  }
  adminLeaves: {
    index: typeof routes['admin_leaves.index']
    update: typeof routes['admin_leaves.update']
  }
}
