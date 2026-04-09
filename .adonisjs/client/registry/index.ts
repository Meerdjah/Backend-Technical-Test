/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/v1/register',
    tokens: [{"old":"/api/v1/register","type":0,"val":"api","end":""},{"old":"/api/v1/register","type":0,"val":"v1","end":""},{"old":"/api/v1/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/login',
    tokens: [{"old":"/api/v1/login","type":0,"val":"api","end":""},{"old":"/api/v1/login","type":0,"val":"v1","end":""},{"old":"/api/v1/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.redirect': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/:provider/redirect',
    tokens: [{"old":"/api/v1/auth/:provider/redirect","type":0,"val":"api","end":""},{"old":"/api/v1/auth/:provider/redirect","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/:provider/redirect","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/:provider/redirect","type":1,"val":"provider","end":""},{"old":"/api/v1/auth/:provider/redirect","type":0,"val":"redirect","end":""}],
    types: placeholder as Registry['auth.redirect']['types'],
  },
  'auth.callback': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/:provider/callback',
    tokens: [{"old":"/api/v1/auth/:provider/callback","type":0,"val":"api","end":""},{"old":"/api/v1/auth/:provider/callback","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/:provider/callback","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/:provider/callback","type":1,"val":"provider","end":""},{"old":"/api/v1/auth/:provider/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['auth.callback']['types'],
  },
  'leave_requests.store': {
    methods: ["POST"],
    pattern: '/api/v1/leave',
    tokens: [{"old":"/api/v1/leave","type":0,"val":"api","end":""},{"old":"/api/v1/leave","type":0,"val":"v1","end":""},{"old":"/api/v1/leave","type":0,"val":"leave","end":""}],
    types: placeholder as Registry['leave_requests.store']['types'],
  },
  'leave_requests.my_requests': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/leave/me',
    tokens: [{"old":"/api/v1/leave/me","type":0,"val":"api","end":""},{"old":"/api/v1/leave/me","type":0,"val":"v1","end":""},{"old":"/api/v1/leave/me","type":0,"val":"leave","end":""},{"old":"/api/v1/leave/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['leave_requests.my_requests']['types'],
  },
  'admin_leaves.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/leaves',
    tokens: [{"old":"/api/v1/admin/leaves","type":0,"val":"api","end":""},{"old":"/api/v1/admin/leaves","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/leaves","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/leaves","type":0,"val":"leaves","end":""}],
    types: placeholder as Registry['admin_leaves.index']['types'],
  },
  'admin_leaves.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/admin/leaves/:id',
    tokens: [{"old":"/api/v1/admin/leaves/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/leaves/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/leaves/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/leaves/:id","type":0,"val":"leaves","end":""},{"old":"/api/v1/admin/leaves/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin_leaves.update']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
