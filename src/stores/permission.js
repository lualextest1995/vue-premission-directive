import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref(new Map())
  const currentRoute = ref(null)

  /**
   * 設定指定路由的權限並更新當前路由。
   *
   * @param {string} routeName - 路由名稱。
   * @param {Array<string>} perms - 權限列表，包含該路由的權限。
   */
  function setPermissions(routeName, perms) {
    permissions.value.set(routeName, perms)
    currentRoute.value = routeName
  }

  /**
   * 檢查當前路由是否具有指定的權限代碼。
   *
   * @param {string} code - 權限代碼，用於檢查是否存在於當前路由的權限列表中。
   * @returns {boolean} 如果當前路由包含指定的權限代碼，返回 true；否則返回 false。
   */
  function hasPermission(code) {
    return permissions.value.get(currentRoute.value)?.includes(code) || false
  }

  /**
   * 清除當前的權限集合，並將當前路由設為 null。
   *
   * 此函式會將 `permissions` 的值清空，並重置 `currentRoute`。
   */
  function clearPermissions() {
    permissions.value.clear()
    currentRoute.value = null
  }

  /**
   * 檢查使用者是否具有指定的權限。
   *
   * @param {string|string[]} value 欲檢查的權限名稱，字串或字串陣列。
   * @param {boolean} [requireAll=false] 是否需要全部權限皆符合（僅在 value 為陣列時有效）。
   * @returns {boolean} 若符合權限條件則回傳 true，否則回傳 false。
   */
  function checkPermission(value, requireAll = false) {
    if (Array.isArray(value)) {
      return requireAll ? value.every((p) => hasPermission(p)) : value.some((p) => hasPermission(p))
    } else if (typeof value === 'string') {
      return hasPermission(value)
    }
    return false
  }

  return {
    permissions,
    currentRoute,
    setPermissions,
    hasPermission,
    clearPermissions,
    checkPermission,
  }
})
