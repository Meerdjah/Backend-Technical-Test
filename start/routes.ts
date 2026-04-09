import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const LeaveRequestsController = () => import('#controllers/leave_requests_controller')
const AdminLeavesController = () => import('#controllers/admin_leaves_controller')

router.group(() => {
  
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])

  router.get('/auth/:provider/redirect', [AuthController, 'redirect'])
  router.get('/auth/:provider/callback', [AuthController, 'callback'])

  router.group(() => {
    router.post('/leave', [LeaveRequestsController, 'store'])
    router.get('/leave/me', [LeaveRequestsController, 'myRequests'])
  }).use(middleware.auth())

  router.group(() => {
    router.get('/admin/leaves', [AdminLeavesController, 'index'])
    router.patch('/admin/leaves/:id', [AdminLeavesController, 'update'])
  })
  .use(middleware.auth())
  .use(middleware.role(['admin']))

}).prefix('/api/v1')