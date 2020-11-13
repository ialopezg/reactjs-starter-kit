function CounterComponent(props = {}) {
  // setup state for counter
  let state = {
    count: props.initialCount || 0
  }

  // increment counter
  const incrementCounter = () => {
    state.count += 1
  }

  // update button text
  const updateButtonText = (button) => {
    button.innerTex = state.count.toString()
  }

  // create button counter
  const button = () => {
    const button = document.createElement('button')
    button.addEventListener('click', e => {
      incrementCounter()
      updateButtonText(e.target)
    })

    updateButtonText(button)

    return button;
  }

  // render counter in a div container
  const render = () => {
    return document.createElement('div').appendChild(button())
  }

  // return the element
  return render()
}

// add counter to DOM
document.appendChild(CounterComponent())
