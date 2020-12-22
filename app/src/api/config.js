const CONFIG_KEY = '_config'

export function get() {
  const str = localStorage.getItem(CONFIG_KEY)
  return str ? JSON.parse(str) : {
    type: 'column',
    columns: '1:3:1'
  }
}

export function save(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}