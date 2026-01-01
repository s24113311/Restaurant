{
  "name": "Order",
  "type": "object",
  "properties": {
    "customer_name": {
      "type": "string",
      "description": "Name of the customer placing the order"
    },
    "customer_email": {
      "type": "string",
      "description": "Email of the customer"
    },
    "customer_phone": {
      "type": "string",
      "description": "Phone number of the customer"
    },
    "order_type": {
      "type": "string",
      "enum": [
        "pickup",
        "delivery"
      ],
      "description": "The type of order"
    },
    "delivery_address": {
      "type": "string",
      "description": "Delivery address, if applicable"
    },
    "items": {
      "type": "array",
      "description": "The items included in the order",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "price": {
            "type": "number"
          },
          "quantity": {
            "type": "number"
          },
          "image": {
            "type": "string"
          }
        }
      }
    },
    "total_amount": {
      "type": "number",
      "description": "The total cost of the order"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "completed",
        "cancelled"
      ],
      "default": "pending",
      "description": "Current status of the order"
    },
    "estimated_time": {
      "type": "string",
      "description": "Estimated time for pickup or delivery (e.g., '25-30 mins')"
    }
  },
  "required": [
    "customer_name",
    "customer_email",
    "order_type",
    "items",
    "total_amount"
  ]
}