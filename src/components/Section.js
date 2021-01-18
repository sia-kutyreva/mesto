class Section {
  constructor( { items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  removeCard() {
    this._element.remove();
  }

  renderItems(id) {
      this._items.forEach(item => {
        this._renderer(item, id)});
  }

  addItemRender(element) {
    this._container.append(element);
  }

  addItemNewCard(element) {
    this._container.prepend(element);
  }

  setItems(items) {
    this._items = items;
  }
};

export {Section};