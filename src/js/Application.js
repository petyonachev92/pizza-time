import EventEmitter from "eventemitter3";
import Card from "./Card";
import Notification from "./Notification";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const pizzas = [
      {
        type: Card.types.HAWAIIAN,
        price: 8.99,
      },
      {
        type: Card.types.PEPPERONI,
        price: 9.99,
      },
      {
        type: Card.types.MARGHERITA,
        price: 7.99,
      },
    ];
    const notification = new Notification();

    pizzas.forEach((pizza) => {
      const card = new Card({ ...pizza });
      card.render();

      document.querySelector(".main").appendChild(card.container);

      card.on(Card.events.ADD_TO_CART, (information) => {
        notification.render(information);
        document.querySelector(".notifications").appendChild(notification.container);

        const button = document.querySelector("button.delete");
        button.addEventListener("click", notification.empty);
      });
    });

    this.emit(Application.events.READY);
  }
}
