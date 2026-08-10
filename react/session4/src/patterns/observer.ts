interface Observer {
  update(data: unknown): void
}

class Subject {
  private observers: Observer[] = []

  subscribe(observer: Observer): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer)
  }

//   protected notify(data: unknown): void {
//     this.observers.forEach(o => o.update(data))
//   }
// The Observer implementation is synchronous.
// If one observer throws an error, execution stops and the remaining
// observers do not receive the notification.
//
// A better implementation catches errors for each observer separately
// so one failure does not prevent the others from running.
  
// EventEmitter already provides subscribe(), unsubscribe(),
// event names, listener management, once(), removeListener(),
// max listener warnings, and many other features that a simple
// custom Subject class does not provide.


protected notify(data: unknown): void {
  this.observers.forEach(observer => {
    try {
      observer.update(data)
    } catch (error) {
      console.error("[Observer Error]", error)
    }
  })
}
}

// notify() is protected so only the Subject (or its subclasses) can notify
// observers. If it were public, external code could call store.notify(fakeOrder)
// without actually placing an order. That could trigger emails, shipments,
// and audit logs for an order that doesn't exist, leading to inconsistent data.

type Order = {
  id: string
  customerEmail: string
  total: number
}

class OrderStore extends Subject {
  private orders: Order[] = []

  placeOrder(order: Order): void {
    this.orders.push(order)
    this.notify(order)
  }

  cancelOrder(id: string): void {
    const order = this.orders.find(o => o.id === id)

    if (!order) return

    this.orders = this.orders.filter(o => o.id !== id)

    this.notify({
      cancelled: true,
      order
    })
  }

  getOrders(): Order[] {
    return [...this.orders]
  }
}

class ShipmentQueue implements Observer {
  update(data: unknown): void {
    const order = data as Order

    console.log(
      `[ShipmentQueue] scheduling delivery for ${order.id}`
    )
  }
}

// class EmailService implements Observer {
//   update(data: unknown): void {
//     const order = data as Order

//     console.log(
//       `[EmailService] sending confirmation to ${order.customerEmail}`
//     )
//   }
// }
//explore 1
class EmailService implements Observer {
  update(data: unknown): void {
    const order = data as Order

    if (order.total > 1000) {
      throw new Error("Email service failed!")
    }

    console.log(
      `[EmailService] sending confirmation to ${order.customerEmail}`
    )
  }
}

class AuditLog implements Observer {
  update(data: unknown): void {
    const order = data as Order

    console.log(
      `[AuditLog] recorded order ${order.id} at ${new Date().toISOString()}`
    )
  }
}

class AnalyticsService implements Observer {
  update(data: unknown): void {
    const order = data as Order

    console.log(
      `[AnalyticsService] tracking purchase event for order ${order.id}, value: ${order.total}`
    )
  }
}

// Adding AuditLog required changing 0 lines in OrderStore.
// We only created a new observer and subscribed it.
// This shows the Observer pattern is open for extension but closed for modification.

const store = new OrderStore()

const shipment = new ShipmentQueue()
const email = new EmailService()
const audit = new AuditLog()
const analytics = new AnalyticsService()

store.subscribe(shipment)
store.subscribe(email)
store.subscribe(audit)

store.placeOrder({
  id: 'ORD-001',
  customerEmail: 'alice@example.com',
  total: 1500
})

store.placeOrder({
  id: 'ORD-002',
  customerEmail: 'bob@example.com',
  total: 800
})

console.log('\n--- Unsubscribe AuditLog ---')

store.unsubscribe(audit)

store.placeOrder({
  id: 'ORD-003',
  customerEmail: 'carol@example.com',
  total: 200
})

console.log('\n--- Subscribe AuditLog Again ---')

store.subscribe(audit)

store.placeOrder({
  id: 'ORD-004',
  customerEmail: 'david@example.com',
  total: 500
})

// Observers can be unsubscribed at runtime when they are no longer interested
// in receiving updates.
//
// Example 1:
// A user closes a live notifications page, so the notification observer is
// removed to stop receiving updates.
//
// Example 2:
// A temporary analytics or logging service is disabled for a specific customer
// or feature flag, so it unsubscribes and no longer processes events.

console.log('\n--- AnalyticsService Added ---')

store.subscribe(analytics)

store.placeOrder({
  id: 'ORD-005',
  customerEmail: 'eve@example.com',
  total: 2500
})

// From reading placeOrder() alone, we cannot tell that shipment,
// email, audit logging, and analytics all happen because they are
// triggered indirectly through notify().
//
// This becomes a problem in large systems where many observers are
// subscribed, making the flow of execution harder to understand and
// debug. A long observer chain can also increase processing time,
// make failures harder to trace, and introduce hidden dependencies
// between different parts of the application.