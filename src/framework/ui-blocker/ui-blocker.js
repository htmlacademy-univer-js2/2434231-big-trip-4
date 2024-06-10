import './ui-blocker.css';

export default class UiBlocker {

  #lowerLimit;

  #upperLimit;

  #element;

  #startTime;

  #endTime;

  #timerId;

  constructor({lowerLimit, upperLimit}) {
    this.#lowerLimit = lowerLimit;
    this.#upperLimit = upperLimit;

    this.#element = document.createElement('div');
    this.#element.classList.add('ui-blocker');
    document.body.append(this.#element);
  }

  block() {
    this.#startTime = Date.now();
    this.#timerId = setTimeout(() => {
      this.#addClass();
    }, this.#lowerLimit);
  }

  unblock() {
    this.#endTime = Date.now();
    const duration = this.#endTime - this.#startTime;

    if (duration < this.#lowerLimit) {
      clearTimeout(this.#timerId);
      return;
    }

    if (duration >= this.#upperLimit) {
      this.#removeClass();
      return;
    }

    setTimeout(this.#removeClass, this.#upperLimit - duration);
  }

  #addClass = () => {
    this.#element.classList.add('ui-blocker--on');
  };

  #removeClass = () => {
    this.#element.classList.remove('ui-blocker--on');
  };
}
