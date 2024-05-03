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

  async read(filter) {
    try {
      const all = await this.Model.find(filter);
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      //const one = await this.Model.findById(id);
      const one = await this.Model.findOne({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      //const one = await this.Model.findById(id);
      const one = await this.Model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id) {
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
}

export default Manager;
