const state = {
  loading: false,
}

// Abandons the request after the set amount of ms - `timeout`
const postData = async (path, body = {}, reqCfg = {}) => {
  const timeout = 1000
  const source = axios.CancelToken.source()
  setTimeout(() => {
    source.cancel()
  }, timeout)
  await axios.post(path, {...body}, {...reqCfg, cancelToken: source.token})
}

const handleLoading = (loading) => {
  state.loading = loading
  const opacity = loading ? '0.7' : '1'
  const links = document.getElementsByClassName('links')
  for (let i = 0; i < links.length; i++) {
    const element = links.item(i)
    element.style.opacity = opacity
  }
}

const clearDisplayState = () => {
  const links = document.getElementsByClassName('links')
  for (let i = 0; i < links.length; i++) {
    const element = links.item(i)
    const display = element.getElementsByClassName('state-display').item(0)
    display.innerHTML = ''
  }
}

const loadSvg = (linkID, path) => {
  clearDisplayState()
  const stateDisplay = document.getElementById(linkID).getElementsByClassName('state-display').item(0)

  const svg = document.createElement('img')
  svg.src = path

  stateDisplay.appendChild(svg)
}

const handleClick = async (e) => {
  if (state.loading) {
    return
  }
  else {
    handleLoading(true)
  }
  loadSvg(e.id, '/icons/loader.svg')

  try {
    await postData(e.path)
    loadSvg(e.id, '/icons/pass.svg')
  } catch (error) {
    console.error(error)
    loadSvg(e.id, '/icons/fail.svg')
  }
  handleLoading(false)
}

const loadButton = (opts) => {
  console.log(opts.path)
  const body = document.body
  const btn = document.createElement('button')
  btn.className = 'links'
  btn.id = opts.btnID
  btn.path = opts.path
  btn.addEventListener('click', ev => {
    handleClick(btn)
  })

  const infoDisplay = document.createElement('span')
  infoDisplay.className = 'info-display'
  btn.appendChild(infoDisplay)

  const img =  document.createElement('img')
  img.src = `/icons/${opts.imgPath}.svg`
  img.alt = opts.imgPath
  
  const title = document.createElement('p')
  title.innerHTML = opts.titleText
  const desc = document.createElement('h3')
  desc.innerHTML = opts.descText
  
  infoDisplay.appendChild(img)
  infoDisplay.appendChild(title)
  infoDisplay.appendChild(desc)
  
  const stateDisplay = document.createElement('span')
  stateDisplay.className = 'state-display'
  btn.appendChild(stateDisplay)

  body.appendChild(btn)
}

const authRequestHeader = (psw) => {
  window.axios.defaults.headers.post['psw'] = psw;
}

const authenticate = async (psw) => {
  const path = '/auth'
  authRequestHeader(psw)
  
  axios.post(path)
    .then(res => {
    // Remove the password input on correct psw input
    const passwordForm = document.getElementById('password-form')
    passwordForm.parentNode.removeChild(passwordForm)
    
    // Show buttons after removing
    const buttons = res.data.buttons
    for (let i = 0; i < buttons.length; i++) loadButton(buttons[i])
  })
  .catch((e) => {
    const input = document.getElementById('psw-input')
    input.value = ''
    handleInput(input)
    console.error(e)
  })
}

const renderInputDisplay = () => {
  const inputDisplay = document.getElementById('input-display')
  const pswInput = document.getElementById('psw-input')

  for (let i = 0; i < pswInput.maxLength; i++) {
    const digit = document.createElement('span')
    digit.className = 'display-digit'
    
    inputDisplay.append(digit)
  }

}

const handleInput = async (input) => {
  const val = input.value
  const inputDisplay = document.getElementById('input-display')
  
  const digitType = {
    current: 'current-digit',
    passed: 'passed-digit'
  }
  Object.freeze(digitType)
  const children = inputDisplay.children
  for (let i = 0; i < children.length; i++) {
    const element = children[i]
    // Passed digits
    if(i < val.length - 1) {
      element.classList.add(digitType.passed)
      element.classList.remove(digitType.current)
    }
    // Current digit
    else if(i === val.length - 1) {
      element.classList.remove(digitType.passed)
      element.classList.add(digitType.current)
    }
    // Unreached digits
    else {
      element.classList.remove(digitType.passed)
      element.classList.remove(digitType.current)
    }
  }
  
  const maxLength = input.maxLength
  if(val.length === maxLength) {
    await authenticate(val)
  }
}