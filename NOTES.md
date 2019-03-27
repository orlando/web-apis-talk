# Web APIS 2019

## [Intersection_Observer_API](https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API)

[https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API)

### Intersection observer options

The `options` object passed into the `[IntersectionObserver()](https://developer.mozilla.org/es/docs/Web/API/IntersectionObserver/IntersectionObserver)` constructor let you control the circumstances under which the observer's callback is invoked. It has the following fields:

**`root`**The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if `null`.

**`rootMargin`** Margin around the root. Can have values similar to the CSS `[margin](https://developer.mozilla.org/es/docs/Web/CSS/margin)` property, e.g. "`10px 20px 30px 40px"` (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.

**`threshold`**Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.

### IntersectionObserverEntry

**`[boundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/boundingClientRect)` Read only**

Returns the bounds rectangle of the target element as a `[DOMRectReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly)`. The bounds are computed as described in the documentation for

**`[intersectionRatio](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRatio)` Read only**

Returns the ratio of the `intersectionRect` to the `boundingClientRect`.

**`[intersectionRect](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRect)` Read only**

Returns a `[DOMRectReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly)` representing the target's visible area.

**`[isIntersecting](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting)` Read only**

A Boolean value which is `true` if the target element intersects with the intersection observer's root. If this is `true`, then, the `IntersectionObserverEntry` describes a transition into a state of intersection; if it's `false`, then you know the transition is from intersecting to not-intersecting.

**`[rootBounds](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/rootBounds)` Read only**

Returns a `[DOMRectReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly)` for the intersection observer's root.

**`[target](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/target)` Read only**

The `[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)` whose intersection with the root changed.

**`[time](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/time)` Read only**

A `[DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)` indicating the time at which the intersection was recorded, relative to the `IntersectionObserver`'s [time origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).

**Demo**

Image gallery that hides images that are not in the viewport

## [requestIdleCallback](https://developer.mozilla.org/es/docs/Web/API/Window/requestIdleCallback)

[https://developer.mozilla.org/es/docs/Web/API/Window/requestIdleCallback](https://developer.mozilla.org/es/docs/Web/API/Window/requestIdleCallback)

**`callback`**

La referencia a la función que debe ser ejecutada en un futuro inmediato. La función callback toma un argumento con las siguientes propiedades:

`timeRemaining`: Referencia a un metodo que devuelve un `[DOMHighResTimeStamp](https://developer.mozilla.org/es/docs/Web/API/DOMHighResTimeStamp)`.

`didTimeout`: Booleano que se devuelve a false si el callback fue invocado por el navegador durante su inactividad, y true en otro caso (por ejemplo, si se definió timeout y expiró antes de que hubiera suficiente tiempo de inactividad).

**`options` Optional**

Contiene parametros opcionales de configuración. Contiene la siguiente propiedad:`timeout`: Plazo para que el navegador ejecute la función callback. Valor en milisegundos.

**Demo**

Reimplement [https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API#Example](https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API#Example)

## [Payment_Request_API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)

- [https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)
- [https://developers.google.com/web/updates/2017/01/payment-request-updates](https://developers.google.com/web/updates/2017/01/payment-request-updates)
- [https://developers.google.com/web/updates/2016/07/payment-request](https://developers.google.com/web/updates/2016/07/payment-request)
- [https://webkit.org/blog/8182/introducing-the-payment-request-api-for-apple-pay/](https://webkit.org/blog/8182/introducing-the-payment-request-api-for-apple-pay/)

A payment request always starts with the creation of a new `[PaymentRequest](https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest)` object — using the `[PaymentRequest()](https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/PaymentRequest)` constructor. This takes two mandatory parameters and one option parameter:

**`methodData`**

Contains an array of identifiers for the payment methods the merchant web site accepts and any associated payment method specific data. Each item in the array contains the following fields:

**`supportedMethods`**For early implementations of the spec, this was a sequence of identifiers for payment methods that the merchant website accepts. Starting with more recent browsers, this parameter is more generic than credit cards, it is a single `[DOMString](https://developer.mozilla.org/en-US/docs/Web/API/DOMString)`, and the meaning of the `data` parameter changes with the `supportedMethods`. For example, the basic card payment method is selected by specifying the string `basic-card` here. This can also be a payment gateway url, like described in the [Payment Method Identifiers](https://www.w3.org/TR/payment-method-id/) spec 

**`data`**A JSON-serializable object that provides optional information that might be needed by the supported payment methods. This has to conform to the type expected by the payment handler indicated by `supportedMethods`. For basic credit card services, this structure should match the `[BasicCardRequest](https://developer.mozilla.org/en-US/docs/Web/API/BasicCardRequest)` dictionary.

**`details`**

Provides information about the requested transaction. This parameter contains the following fields:

**`total`**The total amount of the payment request.

**`id` Optional**A free-form identifier for this payment request. If a value is not supplied, the browser will construct one.

**`displayItems`**An array of optional line items for the payment request that the user agent may display, such as product details, tax, and shipping.

**`shippingOptions`**The shipping options the user may choose from. If this sequence is blank, it indicates the merchant cannot ship to the current shipping address. The default shipping option may be indicated in this sequence.

**`modifiers`**

Modifiers for specific payment methods; for example, adjusting the total amount based on the payment method. This parameter contains the following fields:

**`additionalDisplayItems`**An array of items to be appended to the `details.displayItems` property. This property is commonly used to add a discount or surcharge line item indicating the different amount in `details.modifiers.total`.

**`data`**A JSON-serializable object that provides optional information that might be needed by the supported payment methods. This has to conform to the structure defined in the `[BasicCardRequest](https://developer.mozilla.org/en-US/docs/Web/API/BasicCardRequest)` dictionary.

**`total`**A total amount for the payment request that overrides value in details.total. This is typically used when `details.modifiers.additionalItems` adds a discount or a surchase to the request.

**`options` Optional**

Lets you set options that control the behavior of the user agent. This parameter contains the following fields:

**`requestPayerName`**A Boolean indicating whether the user agent should collect the payer's name and submit it with the payment request. The default is `false`.

**`requestPayerEmail`**A Boolean indicating whether the user agent should collect the payer's email address and submit it with the payment request. The default is `false`.

**`requestPayerPhone`**A Boolean indicating whether the user agent should collect the payer's phone number and submit it with the payment request. The default is `false`.

**`requestShipping`**A Boolean indicating whether the user agent should collect the payer's shipping address and submit it with the payment request. If you set this type to true, you should select an appropriate `shippingType`. The default is `false`.

**`shippingType`**Lets you specify how the user interface refers to shipping when the word 'shipping' isn't appropriate for your use case. For example, in English speaking countries you would say "pizza delivery" not "pizza shipping". Valid values are `"shipping"`, `"delivery"`, and `"pickup"`. Quotation marks must be included. The default value is `"shipping"`.

**Demo**

Fake GDLJS Store with one product you can buy. No cart just a Buy button that triggers the Payment API

Checkout example [https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API/Using_the_Payment_Request_API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API/Using_the_Payment_Request_API)

## [Web_Bluetooth_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)

- [https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [https://play.google.com/store/apps/details?id=io.github.webbluetoothcg.bletestperipheral](https://play.google.com/store/apps/details?id=io.github.webbluetoothcg.bletestperipheral)
- [https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web)

To check for feature, just check if `navigator.bluetooth` is present

The Generic Attributes (GATT) define a hierarchical data structure that is exposed to connected Bluetooth Low Energy (LE) devices.

[GATT Services](https://www.bluetooth.com/specifications/gatt/services) describe what BTLE can provide for us to use. In the demo we are using two, the `battery_service` and `heart_rate`

**Demo**

Create a small dashboard that shows the heart rate and battery from the btl sim app. Probably just a number and emojis

## [Web_Authentication_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)

- [https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
- [FIDO2](https://developers.yubico.com/FIDO2/Libraries/Using_a_library.html)
- [https://demo.yubico.com/webauthn-technical](https://demo.yubico.com/webauthn-technical)

To check if the browsers supports this feature, check for `window.PublicKeyCredential`

**This is way too complicated and extensive to tackle in a short presentation.**

**Demo**

Login screen that works with FIDO2 using Ledger Nano S. This will require a Node.js app.