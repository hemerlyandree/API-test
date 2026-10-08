export async function jsonBodyHandler(request, response) {
  // Adiciona os dados de cada requisição.
  const buffers = []

  // Coleta os chunks de dados da requisição.
  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    // Concatena os chunks e converte para string. Em seguida, converte a string para JSON.
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    request.body = null
  }

  // Define o header de resposta como JSON.
  response.setHeader("Content-Type", "application/json")
}