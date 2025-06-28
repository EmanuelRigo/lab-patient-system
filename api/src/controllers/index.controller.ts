import { Request, Response } from "express";

class Controller {
  constructor(service) {
    this.service = service;
  }
  getAll = async (req, res) => {};

  getById = async (req, res) => {
    const message = "Found!";
    const { id } = req.params;

    const response = await this.service.getById(data);
    if (!response) {
      return res.json404("Not found");
    }
  };

  create = async (req, res) => {
    const message = "Created!";
    const data = req.body;
    const response = await this.service.create(data);
    return res.json201(response, message);
  };

  update = async (req, res) => {};

  deleteOne = async (req, res) => {};
}

export default Controller;
