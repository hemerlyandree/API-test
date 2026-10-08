export function extractQueryParams(query) {
  // Sem query string na URL (ex: /products), retorna objeto vazio.
  if (!query) {
    return {}
  }

  
  return query
    .slice(1)
    .split("&")
    .reduce((queryParams, param) => {
      const [key, value] = param.split("=")

      queryParams[key] = value

      return queryParams
    }, {})
}
