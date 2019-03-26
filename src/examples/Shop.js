import React, { Component } from "react";
import "./Shop.scss";

const items = [
  {
    id: 1,
    name: "Print 1",
    image:
      "https://images.unsplash.com/photo-1553257000-06f62adc2368?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
    price: 10
  },
  {
    id: 2,
    name: "Print 2",
    image:
      "https://images.unsplash.com/photo-1553349450-651a0379f1c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80",
    price: 20
  },
  {
    id: 3,
    name: "Print 3",
    image:
      "https://images.unsplash.com/photo-1553259055-b2175537e16a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    price: 30
  }
];

class Shop extends Component {
  state = {
    cart: []
  };

  buildSupportedPaymentMethodData() {
    return [
      {
        supportedMethods: "basic-card",
        data: {
          supportedNetworks: [
            "visa",
            "mastercard",
            "amex",
            "jcb",
            "diners",
            "discover",
            "mir",
            "unionpay"
          ],
          supportedTypes: ["debit", "credit"]
        }
      }
    ];
  }

  buildShoppingCartDetails() {
    // go through cart and return structure like below
    /* 
      {
        id: 'order-123',
        displayItems: [
          {
            label: 'Example item',
            amount: {currency: 'USD', value: '1.00'}
          }
        ],
        total: {
          label: 'Total',
          amount: {currency: 'USD', value: '1.00'}
        }
      };
    */
    let total = 0;
    const displayItems = this.state.cart.map(item => {
      total = total + item.price;

      return {
        label: item.name,
        amount: { currency: "USD", value: item.price }
      };
    });

    return {
      id: "order-123",
      displayItems,
      total: {
        label: "Total",
        amount: { currency: "USD", value: total }
      }
    };
  }

  addToCart = item => {
    const { cart } = this.state;
    const newCart = [...cart, item];

    this.setState({ cart: newCart });
  };

  checkout = () => {
    // create payment request
    const request = new PaymentRequest(
      this.buildSupportedPaymentMethodData(),
      this.buildShoppingCartDetails()
    );

    // show request
    request
      .show()
      .then(paymentResponse => {
        // Here we would process the payment, for example use Stripe to charge for it
        // Here we just return a fake success
        console.log(paymentResponse);

        paymentResponse.complete("success").then(() => {
          window.alert("Thanks for giving us your money");

          this.setState({
            cart: []
          });
        });
      })
      .catch(() => {
        window.alert("Payment cancelled");
      });
  };

  render() {
    return (
      <div className="shop">
        <h1>Overpriced prints</h1>
        <div className="items">
          {items.map((item, index) => {
            return <Item item={item} onClick={this.addToCart} key={index} />;
          })}
        </div>
        <div className="button" onClick={this.checkout}>{`Checkout ${
          this.state.cart.length
        } items`}</div>
      </div>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <div className="item">
        <img
          className="image"
          src={this.props.item.image}
          alt={this.props.item.id}
          ref={this.img}
        />
        <div
          className="button"
          onClick={() => {
            this.props.onClick(this.props.item);
          }}
        >
          Add to Cart
        </div>
      </div>
    );
  }
}

export default Shop;
