interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}
interface Product {
    readonly id: string;
    name: string;
    price: number;
    category: string;
}
interface OrderItem {
    product: Product;
    quantity: number;
}
interface Order {
    readonly id: string;
    customer: string;
    items: OrderItem[];
    shippingAddress: Address;
    status: "pending" | "shipped" | "delivered";
    createdAt: Date;
}
function calculateTotal(order: Order): number {

    return order.items.reduce(
        (sum, item) =>
            sum + item.product.price * item.quantity,
        0
    );

}
// Recursive example

interface TreeNode {
    value: number;
    children: TreeNode[];
}