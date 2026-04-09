/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.register': {
    methods: ["POST"]
    pattern: '/api/v1/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/api/v1/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
    }
  }
  'auth.redirect': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/:provider/redirect'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { provider: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['redirect']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['redirect']>>>
    }
  }
  'auth.callback': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/:provider/callback'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { provider: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['callback']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['callback']>>>
    }
  }
  'leave_requests.store': {
    methods: ["POST"]
    pattern: '/api/v1/leave'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/leave_requests_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/leave_requests_controller').default['store']>>>
    }
  }
  'leave_requests.my_requests': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/leave/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/leave_requests_controller').default['myRequests']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/leave_requests_controller').default['myRequests']>>>
    }
  }
  'admin_leaves.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/leaves'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_leaves_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_leaves_controller').default['index']>>>
    }
  }
  'admin_leaves.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/admin/leaves/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_leaves_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_leaves_controller').default['update']>>>
    }
  }
}
