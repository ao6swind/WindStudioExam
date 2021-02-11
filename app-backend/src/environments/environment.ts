export const environment = {
  production: false,
  useFirebase: false,
  host: 'http://localhost:4200/assets/sample',
  api: {
    exam: {
      list: 'exam/list.json',
      get: 'exam/get.json'
    },
    question: {
      list: 'question/list.json',
      get: 'question/get.json'
    },
    tag: {
      list: 'tag/list.json'
    }
  }
};