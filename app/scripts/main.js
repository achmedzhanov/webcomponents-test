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

