type Product = {
  name: string
  price: number
  rating: number
  salesCount: number
}

interface SortStrategy {
  sort(products: Product[]): Product[]
}
class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }
}

class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      a.price - b.price
    )
  }
}

class SortByRating implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      b.rating - a.rating
    )
  }
}

class SortByPopularity implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      b.salesCount - a.salesCount
    )
  }
}
// sort() returns a new array so the original product list is not modified.
// If sort() sorted the original array in place, other parts of the application
// using the same array would unexpectedly see the changed order.
//
// Example:
// const sorted = products.sort(...)
// Now both 'sorted' and 'products' refer to the same reordered array.
//
// Returning [...products].sort(...) avoids this bug.

class ProductCatalogue {
  private strategy: SortStrategy

  constructor(strategy: SortStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy
  }

  sort(products: Product[]): Product[] {
    return this.strategy.sort(products)
  }
}
const products: Product[] = [
  { name: 'Keyboard', price: 2499, rating: 4.3, salesCount: 1200 },
  { name: 'Monitor', price: 18999, rating: 4.7, salesCount: 340 },
  { name: 'Headset', price: 3499, rating: 4.1, salesCount: 870 },
  { name: 'Webcam', price: 1999, rating: 3.9, salesCount: 2100 },
  { name: 'Mouse', price: 899, rating: 4.5, salesCount: 3400 }
]
const catalogue = new ProductCatalogue(new SortByName())

console.log('By name:', catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByPrice())
console.log('By price:', catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByRating())
console.log('By rating:', catalogue.sort(products).map(p => p.name))

catalogue.setStrategy(new SortByPopularity())
console.log('By popularity:', catalogue.sort(products).map(p => p.name))
// The ProductCatalogue always calls strategy.sort(products),
// regardless of which sorting strategy is being used.
//
// This works because every strategy implements the same interface.
//
// Compared to a large if/else block, adding a new sorting algorithm
// only requires creating a new strategy class instead of modifying
// existing code.
class SortByPriceDesc implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      b.price - a.price
    )
  }
}
catalogue.setStrategy(new SortByPriceDesc())
console.log('By price desc:', catalogue.sort(products).map(p => p.name))
// Adding SortByPriceDesc required changing 0 existing lines in
// ProductCatalogue or the other strategy classes.
//
// We simply created a new strategy class and used it.
//
// If sorting had been implemented with a large if/else block,
// we would have needed to modify the existing function by adding
// another condition.
type SortFn = (products: Product[]) => Product[]

const sortByName: SortFn = p =>
  [...p].sort((a, b) => a.name.localeCompare(b.name))

const sortByPrice: SortFn = p =>
  [...p].sort((a, b) => a.price - b.price)

function applySort(products: Product[], fn: SortFn): Product[] {
  return fn(products)
}

console.log('\nFunction-based strategies:')

console.log(
  'By name:',
  applySort(products, sortByName).map(p => p.name)
)

console.log(
  'By price:',
  applySort(products, sortByPrice).map(p => p.name)
)

console.log(
  'By rating inline:',
  applySort(
    products,
    p => [...p].sort((a, b) => b.rating - a.rating)
  ).map(p => p.name)
)
// Function-based strategies work well for simple, stateless algorithms.
//
// Class-based strategies are better when the strategy needs its own state,
// configuration, dependencies, or multiple related methods.
//
// For example, a configurable SortByField strategy that accepts a field
// name and sort direction is easier to implement as a class than as a
// single function.


// A class-based strategy is useful when the strategy requires
// configuration or state. Here the strategy stores the field
// name and direction. A simple function would become less clear
// and harder to reuse as configuration grows.

// Combining Factory and Strategy separates two responsibilities.
//
// Factory:
// Decides which strategy object to create.
//
// Strategy:
// Decides how the algorithm behaves.
//
// This keeps object creation and algorithm selection independent,
// making the system easier to extend.