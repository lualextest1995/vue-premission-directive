<template>
  <div class="about">
    <!-- 任一有權限即可顯示 -->
    <button v-permission="'user:add'">單一權限</button>
    <button v-permission="['user:add', 'user:view']">任一權限</button>

    <!-- 全部都有才顯示 -->
    <button v-permission.hide.all="['user:add', 'user:view']">全都符合才顯示</button>

    <!-- 任一符合即可啟用 -->
    <button v-permission:disable="['user:add', 'user:view']">任一權限啟用</button>

    <!-- 全部符合才啟用 -->
    <button v-permission:disable.all="['user:add', 'user:view']">全部符合才啟用</button>
  </div>
</template>

<style>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
