<template>
  <div class="min-h-screen bg-gray-50">
    <LayoutAppHeader />
    <main>
      <slot />
    </main>
    <LayoutAppFooter />
    <CartSidebar />
  </div>
</template>
