
---

# Order Process System

This project demonstrates a real-time order processing system using gRPC with Node.js. It consists of four microservices: Inventory, Notification, Order, and Payment. Each service exposes a gRPC API for interaction.

## Features

- **Inventory Service**: Manages product availability and quantity.
- **Order Service**: Handles order creation and status retrieval.
- **Notification Service**: Sends notifications related to orders.
- **Payment Service**: Processes payments for orders.

## Architecture

Each microservice is independent and communicates using gRPC. The services are designed to be modular and scalable.

## Prerequisites

Before running the services, install the required dependencies:

```bash
npm install @grpc/grpc-js @grpc/proto-loader grpc-node-server-reflection
```

## gRPC APIs with Command Examples

### 1. **Order Service**

**Proto Definition**: [`order.proto`](proto/order.proto)

**Endpoints**:
- `CreateOrder`
- `GetOrderStatus`

**Commands**:
```bash
# List services
./grpcurl -plaintext 127.0.0.1:50051 list

# Describe the OrderService
./grpcurl -plaintext 127.0.0.1:50051 describe order.OrderService

# Describe CreateOrderRequest
./grpcurl -plaintext 127.0.0.1:50051 describe order.CreateOrderRequest

# Create an order
./grpcurl -plaintext -d '{"customer_id": "12345", "items": ["item1", "item2"]}' 127.0.0.1:50051 order.OrderService/CreateOrder

# Get order status
./grpcurl -plaintext -d '{"order_id": "order-1734601337651"}' 127.0.0.1:50051 order.OrderService/GetOrderStatus

# Test invalid order ID
./grpcurl -plaintext -d '{"order_id": "invalid-id"}' 127.0.0.1:50051 order.OrderService/GetOrderStatus
```

---

### 2. **Inventory Service**

**Proto Definition**: [`inventory.proto`](proto/inventory.proto)

**Endpoints**:
- `CheckAvailability`

**Commands**:
```bash
# List services
./grpcurl -plaintext 127.0.0.1:50052 list

# Describe the InventoryService
./grpcurl -plaintext 127.0.0.1:50052 describe inventory.InventoryService

# Describe CheckAvailabilityRequest
./grpcurl -plaintext 127.0.0.1:50052 describe inventory.CheckAvailabilityRequest

# Describe CheckAvailabilityResponse
./grpcurl -plaintext 127.0.0.1:50052 describe inventory.CheckAvailabilityResponse

# Check item availability
./grpcurl -plaintext -d '{"item":"item1"}' 127.0.0.1:50052 inventory.InventoryService/CheckAvailability
```

---

### 3. **Notification Service**

**Proto Definition**: [`notification.proto`](proto/notification.proto)

**Endpoints**:
- `SendNotification`

**Commands**:
```bash
# List services
./grpcurl -plaintext 127.0.0.1:50053 list

# Describe SendNotificationRequest
./grpcurl -plaintext 127.0.0.1:50053 describe notification.SendNotificationRequest

# Describe SendNotificationResponse
./grpcurl -plaintext 127.0.0.1:50053 describe notification.SendNotificationResponse

# Send a notification
./grpcurl -plaintext -d '{"order_id": "order-123", "message": "Your order has been shipped!"}' 127.0.0.1:50053 notification.NotificationService/SendNotification
```

---

### 4. **Payment Service**

**Proto Definition**: [`payment.proto`](proto/payment.proto)

**Endpoints**:
- `ProcessPayment`

**Commands**:
```bash
# List services
./grpcurl -plaintext 127.0.0.1:50054 list

# Describe ProcessPaymentRequest
./grpcurl -plaintext 127.0.0.1:50054 describe payment.ProcessPaymentRequest

# Describe ProcessPaymentResponse
./grpcurl -plaintext 127.0.0.1:50054 describe payment.ProcessPaymentResponse

# Process a payment
./grpcurl -plaintext -d '{"order_id": "order-123", "amount": 15}' 127.0.0.1:50054 payment.PaymentService/ProcessPayment
```

---

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/JawherKl/api-design.git
   cd grpc/nodejs/order-process-system
   ```

2. Install dependencies for each service:
   ```bash
   cd <service-folder>
   npm install
   ```

3. Start the services:
   ```bash
   node server.js
   ```

4. Test the gRPC APIs using the commands provided above.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) in the repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
