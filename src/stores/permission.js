import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: [],
  }),
  actions: {
    setPermissions(perms) {
      this.permissions = perms
    },
    hasPermission(code) {
      return this.permissions.includes(code)
    },
  },
})
