import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: new Map(),
    currentRoute: null,
  }),
  actions: {
    setPermissions(routeName, perms) {
      this.permissions.set(routeName, perms)
      this.currentRoute = routeName
    },
    hasPermission(code) {
      return this.permissions.get(this.currentRoute)?.includes(code) || false
    },
  },
})
