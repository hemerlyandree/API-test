import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.json", import.meta.url)
export class Database {
  #database = {}

  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
    .then((data) => {
      this.#database = JSON.parse(data)
    })
    .catch((error) => {
      // Só cria o arquivo se ele não existir. Se o JSON estiver inválido,
      // não sobrescreve para não perder os dados.
      if (error.code === "ENOENT") {
        return this.#persist()
      }

      console.error("Erro ao ler db.json:", error.message)
    })
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.database[table] = [data]
    }

    this.#persist()
  }

  select(table) {
    return this.#database[table] ?? []
  }
}