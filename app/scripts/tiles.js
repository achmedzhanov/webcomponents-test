// tiles web component
class XTiles extends HTMLElement {

  // TODO
  // [-] detect attribute changes
  // [-] layout
  // [+] css uppercase
  // [+] center letters in tiles
  // [+] square tiles
  // [-] dynamic div size ans aspect ratio
  // [-] reuse dom elements
  // [-] realtime attr changes



  constructor() {
    super();

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
      
      .container.inline.direct {
        
      }       
      
      .container.column {
        flex-direction: column;
      }
      </style>
    `;

    // Create a shadow root
    let shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = template;

    let container = document.createElement('div');
    this.container = container;

    let layout = this.getAttribute('layout');
    let order = this.getAttribute('order');

    const LAYOUT_COLUMN = 'column';
    const LAYOUT_INLINE = 'inline';

    let layoutClass =  null;
    switch(layout) {
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

    let orderClass =  null;
    switch(order) {
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

    container.className = 'container ' + layoutClass + ' ' + orderClass;
    shadow.appendChild(container);


    let text = this.getAttribute('text') || '';
    let elements = _.filter([...(text)], (c) => c !== ' ')
      .map((c, i) => {
        let el = document.createElement("div");
        el.innerText = c;
        el.style.backgroundColor = rainbow(text.length, i);
        return el;
      });

    this.container.innerHTML = '';
    _.each(elements, (el) => {this.container.appendChild(el)})
  }
}

// Define the new element
customElements.define('x-tiles', XTiles);
