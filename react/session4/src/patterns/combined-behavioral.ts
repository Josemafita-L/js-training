/*
Behavioral Pattern Audit

File reviewed: src/api/website.ts

1. Is there any object that directly calls methods on multiple other objects
   in response to a state change?
   → Possible Observer problem? No
   Reason:
   The file mainly sends API requests and does not notify multiple independent
   objects when state changes.

2. Is there any function or method with a growing if/else block that selects
   different behaviour based on a type, mode, or string value?
   → Possible Strategy problem? No
   Reason:
   The file has straightforward API calls and does not contain a large
   behaviour-selection block.

3. Rule of three check:
   Observer:
   No repeated notification pattern found.

   Strategy:
   No repeated behaviour-selection logic found.

4. If a pattern fits:
   Not applicable.

5. If no pattern fits:
   The current implementation is simple, so introducing Observer or Strategy
   would increase complexity without providing any benefit.
*/

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

  protected notify(data: unknown): void {
    this.observers.forEach(observer => observer.update(data))
  }
}
type PriceChangeEvent = {
  product: string
  oldPrice: number
  newPrice: number
}
class PricingEngine extends Subject {
  updatePrice(
    product: string,
    oldPrice: number,
    newPrice: number
  ): void {
    this.notify({
      product,
      oldPrice,
      newPrice
    })
  }
}
class DiscountAlertObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    const percentage =
      ((event.oldPrice - event.newPrice) / event.oldPrice) * 100

    if (percentage > 10) {
      console.log(
        `[Discount] ${event.product} dropped by ${percentage.toFixed(
          1
        )}% — alert sent`
      )
    }
  }
}
class PriceHistoryObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    console.log(
      `[History] ${event.product}: ${event.oldPrice} -> ${event.newPrice}`
    )
  }
}
class BudgetTrackerObserver implements Observer {
  private threshold = 2000

  update(data: unknown): void {
    const event = data as PriceChangeEvent

    if (event.newPrice < this.threshold) {
      console.log(
        `[Budget] ${event.product} is now under budget at ${event.newPrice}`
      )
    }
  }
}
const engine = new PricingEngine()

engine.subscribe(new DiscountAlertObserver())
engine.subscribe(new PriceHistoryObserver())
engine.subscribe(new BudgetTrackerObserver())

engine.updatePrice("Monitor", 18999, 14999)

engine.updatePrice("Keyboard", 2499, 1999)

engine.updatePrice("Mouse", 899, 849)
// Observer reactions:
//
// Monitor:
// - DiscountAlertObserver: Runs because the price dropped by more than 10%.
// - PriceHistoryObserver: Always records every price change.
// - BudgetTrackerObserver: Does not run because 14999 is above the 2000 threshold.
//
// Keyboard:
// - DiscountAlertObserver: Runs because the price dropped by about 20%.
// - PriceHistoryObserver: Runs because it records every change.
// - BudgetTrackerObserver: Runs because the new price (1999) is below 2000.
//
// Mouse:
// - DiscountAlertObserver: Does not run because the price drop is less than 10%.
// - PriceHistoryObserver: Runs because it records every change.
// - BudgetTrackerObserver: Runs because the new price (849) is below 2000.