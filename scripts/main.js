function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

(function() {

  document.addEventListener('DOMContentLoaded', function() {

    let layout = document.querySelector('[name=layout]');
    let order = document.querySelector('[name=order]');
    let text = document.querySelector('[name=text]');

    let tiles = document.querySelector('[name=tiles]');

    layout.addEventListener('change', function(e) {
      let el = e.srcElement;
      tiles.layout = el.options[el.selectedIndex].value;
    }, false);

    order.addEventListener('change', function(e) {
      let el = e.srcElement;
      tiles.order = el.options[el.selectedIndex].value;
    }, false);

    text.addEventListener('input', function(e) {
      tiles.text = e.target.value;
    }, false);

  });

})();


// tiles web component
class XTiles extends HTMLElement {

  // TODO
  // [+] detect attribute changes
  // [+] layout
  // [+] css uppercase
  // [+] center letters in tiles
  // [+] square tiles
  // [-] dynamic div size ans aspect ratio
  // [-] reuse dom elements
  // [+] realtime attr changes

  static get observedAttributes() {
    return ['layout', 'order', 'text'];
  }

  constructor() {
    super();

    console.debug('constructor');

    let template = `
    <style>
      .container {
        display: flex;
        text-transform: uppercase;
      }
      
      .container div {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        display: inline-block;
      }
      
      .container.inline {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
      }      
      
      .container.reversed div{
          order: 0 ! important;
      }
      
      .container.direct div {
          order: 0 ! important;
      }
      
      .container.inline.reversed {
        flex-direction: row-reverse;
        flex-wrap: wrap-reverse;
        justify-content: flex-end;
      }       
      
      .container.column {
        flex-direction: column;
      }
      
      .container.column.reversed {
        flex-direction: column-reverse;
        justify-content: flex-end;
      }       
      
      </style>
    `;

    // Create a shadow root
    let shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = template;

    let container = document.createElement('div');
    this.container = container;

    shadow.appendChild(container);

    this.updateLayout();

    let text = this.getAttribute('text') || '';
    this.updateText(text);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'text') {
      this.updateText(newValue);
    } else if(name === 'layout' || name === 'order') {
      this.updateLayout();
    }
  }

  updateLayout() {
    let layout = this.getAttribute('layout');
    let order = this.getAttribute('order');

    const LAYOUT_COLUMN = 'column';
    const LAYOUT_INLINE = 'inline';

    let layoutClass = null;
    switch (layout) {
      case LAYOUT_COLUMN:
        layoutClass = LAYOUT_COLUMN;
        break;
      case LAYOUT_INLINE:
      default:
        layoutClass = LAYOUT_INLINE;
        break;
    }

    const ORDER_DIRECT = 'direct';
    const ORDER_REVERSED = 'reversed';
    const ORDER_RANDOMIZED = 'randomized';

    let orderClass = null;
    switch (order) {
      case ORDER_REVERSED:
        orderClass = ORDER_REVERSED;
        break;
      case ORDER_RANDOMIZED:
        orderClass = ORDER_RANDOMIZED;
        break;
      case ORDER_DIRECT:
      default:
        orderClass = ORDER_DIRECT;
        break;
    }

    this.container.className = 'container ' + layoutClass + ' ' + orderClass;
  }


  updateText(text) {
    let elements = _.filter([...(text)], (c) => c !== ' ')
      .map((c, i) => {
        let el = document.createElement("div");
        el.innerText = c;
        el.style.order = '' + ((Math.random() * text.length) | 0);
        el.style.backgroundColor = rainbow(text.length, i);
        return el;
      });

    this.container.innerHTML = '';
    _.each(elements, (el) => {
      this.container.appendChild(el)
    });
  }


  set layout(value) {
    this.setAttribute('layout', value);
  }
  get layout() {
    this.getAttribute('layout');
  }

  set order(value) {
    this.setAttribute('order', value);
  }
  get order() {
    this.getAttribute('order');
  }

  set text(value) {
    this.setAttribute('text', value);
  }
  get text() {
    this.getAttribute('text');
  }


}

// Define the new element
customElements.define('x-tiles', XTiles);
