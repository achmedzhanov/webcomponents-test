// tiles web component
class XTiles extends HTMLElement {

  // TODO
  // [] detect attribute changes
  // [] layout
  // css uppercase
  // center letters in tiles
  // square tiles


  constructor() {
    super();

    // Create a shadow root
    let shadow = this.attachShadow({mode: 'open'});

    let text = this.getAttribute('data-text') || '';
    let elements = _.filter([...(text.toUpperCase())], (c) => c !== ' ') // TODO use css for uppercase
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

    _.each(elements, (el) => {shadow.appendChild(el)})
  }
}

// Define the new element
customElements.define('x-tiles', XTiles);
