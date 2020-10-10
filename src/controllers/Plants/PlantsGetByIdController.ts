import { Request, Response } from "express";
import { PlantFinderById } from "../../contexts/Plants/Application/Find/PlantFinderById";
import { FindByIdPlantRequest } from "../../contexts/Plants/Application/Find/FindByIdPlantRequest";
import { Controller } from "../Controller";
import httpStatus from "http-status";

export class PlantsGetController implements Controller {
  plantFinderById: PlantFinderById;

  constructor(plantFinderById: PlantFinderById) {
    this.plantFinderById = plantFinderById;
  }

  async run(req: Request, res: Response) {
    const id: string = req.params.id;

    const createPlantRequest = new FindByIdPlantRequest(id);

    await this.plantFinderById
      .run(createPlantRequest)
      .then((plant) =>
        plant
          ? res.status(httpStatus.FOUND).send(plant)
          : res.status(httpStatus.NOT_FOUND).send()
      )
      .catch((error: any) =>
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      );
  }
}
