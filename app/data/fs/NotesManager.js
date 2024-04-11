import fs from "fs";
import crypto from "crypto";
class NotesManager {
  constructor() {
    this.path = "./app/data/fs/files/notes.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("archivo creado");
    } else {
      console.log("File notes already exists");
    }
  }
  async create(data) {
    try {
      if (!data.text) {
        const error = new Error("ingrese texto");
        throw error;
      } else {
        const note = {
          id: crypto.randomBytes(12).toString("hex"),
          text: data.text,
          category: data.category || "to do",
          date: data.date || new Date(),
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(note);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        console.log("creado");
        return note;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(cat = "to do") {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      //ESPERO LA LECTURA DEL ARCHIVO Y LO GUARDO EN LA VARIABLR ALL
      all = JSON.parse(all);
      //PARSEO
      //FILTRO 
      all = all.filter((each) => each.category == cat);
      if (all.length === 0) {
        //SI NO HAY DATOS
        return null
      } else {
        console.log(all);
        return all;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      if (!one) {
        throw new Error("no encontrado");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each === id);
      if (!one) {
        throw new Error("no encontrado");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

const notesManager = new NotesManager();
export default notesManager;

