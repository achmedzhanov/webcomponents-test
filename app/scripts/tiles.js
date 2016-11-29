// tiles web component
class XTiles extends HTMLElement {

  // TODO
  // [-] detect attribute changes
  // [-] layout
  // [+] css uppercase
  // [-] center letters in tiles
  // [-] square tiles
  // [-] dynamic div size ans aspect ratio
  // [-] reuse dom elements


  constructor() {
    super();

    let template = `
    <style>
      .container {
        display: block;
        text-transform: uppercase;
      }
      .container.column.direct {
        display: block;
      }
      </style>
    `;

    // Create a shadow root
    let shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = template;

    let container = document.createElement('div');
    container.className = 'container';
    shadow.appendChild(container);

    // TODO create container element

    let text = this.getAttribute('data-text') || '';
    let elements = _.filter([...(text)], (c) => c !== ' ')
      .map((c, i) => {
        let el = document.createElement("div");
        el.innerText = c;
        el.style.width = '50px';
        el.style.height = '50px';
        el.style.lineHeight = '50px';
        el.align = 'center';
        el.style.display = 'inline-block';
        el.style.backgroundColor = rainbow(text.length, i);
        return el;
      });

    _.each(elements, (el) => {container.appendChild(el)})
  }
}

// Define the new element
customElements.define('x-tiles', XTiles);
