
"use client";

import { useState } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type OrderCartProps = {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (name: string, change: number) => void;
  onRemove: (name: string) => void;
  whatsappUrl: string;
};

export default function OrderCart({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
  whatsappUrl,
}: OrderCartProps) {
  const [orderType, setOrderType] = useState<"Delivery" | "Takeaway">("Delivery");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  const orderMessage = [
    "Assalam-o-Alaikum! I would like to place an order at Kaka Restaurant.",
    "",
    `Order Type: ${orderType}`,
    "",
    ...items.map(
      (item) =>
        `${item.name} x ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString("en-PK")}`
    ),
    "",
    `Total: Rs. ${total.toLocaleString("en-PK")}`,
    "",
    "Please confirm my order."
  ].join("\n");

  const checkoutUrl = `https://wa.me/923014846247?text=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside
        className="order-cart"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <span className="eyebrow">KAKA RESTAURANT</span>
            <h2>Your Order</h2>
          </div>

          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={42} />
              <h3>Your cart is empty</h3>
              <p>Add your favourite dishes from our menu.</p>
              <button onClick={onClose}>EXPLORE MENU</button>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.name}>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <span>Rs. {item.price.toLocaleString("en-PK")}</span>
                </div>

                <div className="cart-item-actions">
                  <button
                    onClick={() => onUpdateQuantity(item.name, -1)}
                    aria-label={`Decrease ${item.name}`}
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => onUpdateQuantity(item.name, 1)}
                    aria-label={`Increase ${item.name}`}
                  >
                    <Plus size={14} />
                  </button>

                  <button
                    className="cart-remove"
                    onClick={() => onRemove(item.name)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <h3>Order Preference</h3>

            <div className="order-type-options">
              <button
                className={orderType === "Delivery" ? "selected" : ""}
                onClick={() => setOrderType("Delivery")}
              >
                Delivery
              </button>

              <button
                className={orderType === "Takeaway" ? "selected" : ""}
                onClick={() => setOrderType("Takeaway")}
              >
                Takeaway
              </button>
            </div>

            <div className="cart-total">
              <span>Subtotal</span>
              <strong>Rs. {total.toLocaleString("en-PK")}</strong>
            </div>

            <p className="cart-delivery-note">
              Delivery charges, if applicable, will be confirmed by the restaurant.
            </p>

            <a
              href={checkoutUrl}
              target="_blank"
              rel="noreferrer"
              className="checkout-button"
            >
              SEND ORDER ON WHATSAPP <ArrowRight size={17} />
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
