$ npm install @grpc/grpc-js @grpc/proto-loader grpc-node-server-reflection

./grpcurl -plaintext 127.0.0.1:50050 list

./grpcurl -plaintext 127.0.0.1:50050 describe order.OrderService

./grpcurl -plaintext 127.0.0.1:50050 describe order.CreateOrderRequest

./grpcurl -plaintext -d '{"customer_id": "12345", "items": ["item1", "item2"]}' 127.0.0.1:50050 order.OrderService/CreateOrder

./grpcurl -plaintext -d '{"order_id": "order-1734528985234"}' 127.0.0.1:50050 order.OrderService/GetOrderStatus

./grpcurl -plaintext -d '{"order_id": "invalid-id"}' 127.0.0.1:50050 order.OrderService/GetOrderStatus
