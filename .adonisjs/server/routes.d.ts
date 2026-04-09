import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'auth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'leave_requests.store': { paramsTuple?: []; params?: {} }
    'leave_requests.my_requests': { paramsTuple?: []; params?: {} }
    'admin_leaves.index': { paramsTuple?: []; params?: {} }
    'admin_leaves.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'leave_requests.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'auth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'leave_requests.my_requests': { paramsTuple?: []; params?: {} }
    'admin_leaves.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'auth.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'leave_requests.my_requests': { paramsTuple?: []; params?: {} }
    'admin_leaves.index': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'admin_leaves.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}