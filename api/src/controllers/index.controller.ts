import { Request, Response } from "express";

interface IService<T> {
  getAll?: (id?: string) => Promise<T[] | null>;
  getById?: (id: string) => Promise<T | null>;
  getByName?: (name: string) => Promise<T | null>;
  create?: (data: T) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T | null>;
  deleteOne?: (
    id: string
  ) => Promise<{ success: boolean; message: string; data: T }>;
}

class Controller<T> {
  private service: IService<T>;

  constructor(service: IService<T>) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response): Promise<Response | null> => {
    const message = "Found!";
    const { id } = req.params;

    if (this.service.getAll) {
      const response = await this.service.getAll(id);
      if (response && response.length > 0) {
        return res.status(200).json({ data: response, message });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } else {
      return res.status(501).json({ message: "getAll method not implemented" });
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    const message = "Found!";
    const { id } = req.params;

    if (this.service.getById) {
      const response = await this.service.getById(id);
      if (response) {
        return res.status(200).json({ data: response, message });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } else {
      return res
        .status(501)
        .json({ message: "getById method not implemented" });
    }
  };

  getByName = async (req: Request, res: Response): Promise<Response> => {
    const message = "Found!";
    const { name } = req.params;

    if (this.service.getByName) {
      const response = await this.service.getByName(name);
      if (response) {
        return res.status(200).json({ data: response, message });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } else {
      return res
        .status(501)
        .json({ message: "getByName method not implemented" });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const message = "Created!";
    const data = req.body;

    if (this.service.create) {
      const response = await this.service.create(data);
      return res.status(201).json({ data: response, message });
    } else {
      return res.status(501).json({ message: "create method not implemented" });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const message = "Updated!";
    const { id } = req.params;
    const data = req.body;

    if (this.service.update) {
      const response = await this.service.update(id, data);
      if (response) {
        return res.status(200).json({ data: response, message });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } else {
      return res.status(501).json({ message: "update method not implemented" });
    }
  };

  deleteOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (this.service.deleteOne) {
      const response = await this.service.deleteOne(id);
      if (response?.success) {
        return res
          .status(200)
          .json({ data: response.data, message: response.message });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } else {
      return res
        .status(501)
        .json({ message: "deleteOne method not implemented" });
    }
  };
}

export default Controller;
