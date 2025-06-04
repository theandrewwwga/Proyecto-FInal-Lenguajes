export default defineNuxtPlugin(() => {
  const events: Record<string, Function[]> = {}

  const bus = {
    $on(event: string, callback: Function) {
      if (!events[event]) {
        events[event] = []
      }
      events[event].push(callback)
    },
    $off(event: string, callback: Function) {
      if (events[event]) {
        events[event] = events[event].filter(cb => cb !== callback)
      }
    },
    $emit(event: string, ...args: any[]) {
      if (events[event]) {
        events[event].forEach(callback => {
          callback(...args)
        })
      }
    }
  }

  return {
    provide: {
      bus
    }
  }
})