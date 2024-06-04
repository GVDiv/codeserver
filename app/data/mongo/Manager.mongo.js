class Manager {
  constructor(Model) {
    this.Model = Model;
  }

  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async read(filter = {}) {
    try {
      const all = await this.Model.find(filter); // Usar el filtro proporcionado
      return all;
    } catch (error) {
      throw error;
    }
  }

  async paginate({filter, opts}) {
    try {
      const all = await this.Model.paginate(filter, opts);
      return all;
    } catch (error) {
      throw error;
    }
  }

  async aggregate(obj) {
    try {
      const result = await this.Model.aggregate(obj)
      return result
    } catch (error) {
      throw error
    }
  }

  async readOne(id) {
    try {
      const one = await this.Model.findOne({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.Model.findOne({ email }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, { new: true });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroyAll(user_id) {
    try {
      const result = await this.Model.deleteMany({ user_id });
      return result;
    } catch (error) {
      throw error;
    }
  }
  
}

export default Manager;
