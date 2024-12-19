$ npm install @grpc/grpc-js @grpc/proto-loader grpc-node-server-reflection

<!-- Order gRPC-->
./grpcurl -plaintext 127.0.0.1:50051 list

./grpcurl -plaintext 127.0.0.1:50051 describe order.OrderService

./grpcurl -plaintext 127.0.0.1:50051 describe order.CreateOrderRequest

./grpcurl -plaintext -d '{"customer_id": "12345", "items": ["item1", "item2"]}' 127.0.0.1:50051 order.OrderService/CreateOrder

./grpcurl -plaintext -d '{"order_id": "order-1734601337651"}' 127.0.0.1:50051 order.OrderService/GetOrderStatus

./grpcurl -plaintext -d '{"order_id": "invalid-id"}' 127.0.0.1:50051 order.OrderService/GetOrderStatus

<!-- Inventory gRPC -->
./grpcurl -plaintext 127.0.0.1:50052 list

./grpcurl -plaintext 127.0.0.1:50052 describe inventory.InventoryService

./grpcurl -plaintext 127.0.0.1:50052 describe inventory.CheckAvailabilityRequest

./grpcurl -plaintext 127.0.0.1:50052 describe inventory.CheckAvailabilityResponse

./grpcurl -plaintext -d '{"item":"item1"}' 127.0.0.1:50052 inventory.InventoryService/CheckAvailability
