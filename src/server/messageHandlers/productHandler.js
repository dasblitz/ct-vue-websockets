import { MessageHandler } from "./messageHandler.js";
import { MESSAGE_TYPES } from "./messageTypes.js";

let inStock = 10;

class ProductHandler extends MessageHandler {
  constructor(socket) {
    super(socket);
    socket.on("message", this.messageHandler);
    this.init();
  }

  init = () => {
    this.send({ type: MESSAGE_TYPES.STOCK_UPDATE, value: inStock });
  };

  messageHandler = message => {
    try {
      const { type } = JSON.parse(message);
      switch (type) {
        case MESSAGE_TYPES.PRODUCT_ORDER:
          inStock = Math.max(inStock - 1, 0);

          if (inStock === 0) {
            inStock = 10;
          }

          this.sendAll({ type: MESSAGE_TYPES.STOCK_UPDATE, value: inStock });
          break;
        default:
          this.send({
            type: "error",
            value: `unknown message type ${type}`
          });
          break;
      }
    } catch (e) {
      this.send({
        type: "error",
        value: `could not parse message as JSON`
      });
    }
  };
}

export { ProductHandler };
