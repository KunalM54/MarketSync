import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateSelf,
} from "./user.service.js";
import { sendResponse } from "../../utils/response.js";
import { request, type Request, type Response } from "express";
import { updateUser } from "./user.service.js";
import type { UpdateSelfBody, UpdateUserBody } from "./user.types.js";

type GetUserByIDParams = {
  id: string;
};

export const createUserController = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);

  return sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const getAllUserController = asyncHandler(async (req, res) => {
  const users = await getAllUser();

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

export const getUserByIdController = asyncHandler(
  async (req: Request<GetUserByIDParams>, res: Response) => {
    const { id } = req.params;

    const user = await getUserById(id);

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  },
);

export const updateSelfController = asyncHandler<
  {},
  {},
  UpdateSelfBody
>(async (req, res) => {
  const updatedUser = await updateSelf(req.user.userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully.",
    data: updatedUser,
  });
});

export const updateUserController = asyncHandler<
  { id: string },
  {},
  UpdateUserBody
>(async (req, res) => {
  const updatedUser = await updateUser(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully.",
    data: updatedUser,
  });
});

export const deleteUserController = asyncHandler<{ id: string }>(
  async (req, res) => {
    const deletedUser = await deleteUser(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User deleted successfully.",
      data: deletedUser,
    });
  },
);
