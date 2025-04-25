import { usePermissionStore } from '@/stores/permission'

export const permissionDirective = {
  mounted(el, binding) {
    const store = usePermissionStore()

    const value = binding.value
    const mode = binding.arg || 'hide' // 支援 :hide / :disable，預設為 hide
    const requireAll = binding.modifiers.all === true

    const hasPermission = store.checkPermission(value, requireAll)

    if (!hasPermission) {
      if (mode === 'hide') {
        el.parentNode?.removeChild(el)
      } else if (mode === 'disable') {
        el.setAttribute('disabled', 'true')
        el.classList.add('is-disabled') // 若使用 Element Plus
      }
    }
  },
}
