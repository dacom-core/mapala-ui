let hookCallback

function hooks () {
  return hookCallback.apply(null, arguments)
}

function setHookCallback (callback) {
  hookCallback = callback
}

export { hooks, setHookCallback }
