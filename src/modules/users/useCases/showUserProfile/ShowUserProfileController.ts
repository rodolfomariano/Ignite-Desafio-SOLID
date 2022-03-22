import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    if (!user_id) {
      return response.status(404).json({ error: "User not found" });
    }

    try {
      const user = this.showUserProfileUseCase.execute({
        user_id: String(user_id),
      });

      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}

export { ShowUserProfileController };
