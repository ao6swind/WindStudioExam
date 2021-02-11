export const environment = {
  production: false,
  useFirebase: false,
  host: 'http://localhost:8100/assets/sample',
  api: {
    question: {
      list: 'question/list.json',
      get: 'question/get.json'
    },
    tag: {
      list: 'tag/list.json'
    }
  }
};