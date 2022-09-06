const http = require('http')

const server = http.createServer((request, response) => {

  // GET /hello/:nome -> Hello ${name}
  if (request.method === 'GET' && /^\/hello\/\w+$/.test(request.url)) {
    const [,, name] = request.url.split('/')
    response.writeHead(200)
    response.end(`Hello ${name}!\n`)
    return
  }//* use a ferramenta CUrl para servir como cliente, use o comando: curl -X GET http://localhost:3000/hello/fernando

  // GET /hello -> Hello World!
  if (request.method === 'GET' && request.url.startsWith('/hello')) {
    response.writeHead(200)
    response.end('Hello World!\n')
    return
  } //* use a ferramenta CUrl para servir como cliente, use o comando: curl -X GET http://localhost:3000/hello

  // POST /echo
  if(request.method === 'POST' && request.url.startsWith('/echo')) {
    response.writeHead(200)
    request.pipe(response)
    return
  } //* use a ferramenta CUrl para servir como cliente, use o comando: curl -X POST http://localhost:3000/echo --header 'Content-Type: text/plain' --data-raw 'ola Pessoal'

  // ***************
  // ** API TODOS **
  // ***************

  // {id, title, text}

  // POST /todos
  // GET /todos
  // GET /todos/:id
  // DELETE /todos/:id
  // PUT /todos/:id


  response.writeHead(404)
  response.end('Resource not found\n')
})

server.listen(3000, '0.0.0.0', () => {
  console.log('Server started')
})
