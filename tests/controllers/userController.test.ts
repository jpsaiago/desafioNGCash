import { UserController } from "../../src/controllers/userController";
import { UserService } from "../../src/services/userServices";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Prisma } from "@prisma/client";
import { BadRequestError } from "../../src/utils/api-errors";

const controller = new UserController();
const { res, next } = getMockRes();

describe("Registration", () => {
  it("Should return a success if the user is created", async () => {
    const userRegisterMock = jest
      .spyOn(UserService.prototype, "register")
      .mockResolvedValue("zezinho");
    const mockRequest = getMockReq({
      body: {
        username: "zezinho",
        password: "Testedozezinho21",
      },
    });

    await controller.register(mockRequest, res, next);
    expect(res.status).toBeCalledWith(201);
    expect(res.send).toBeCalledWith("User zezinho registered successfully!");
    expect(next).not.toBeCalled();
  });

  it("Should handle the exception if the user already exists", async () => {
    const userRegisterMock = jest
      .spyOn(UserService.prototype, "register")
      .mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          "Test message",
          "P2002",
          "Test client version",
          { target: "username" }
        )
      );
    const mockRequest = getMockReq();

    await controller.register(mockRequest, res, next);
    expect(next).toBeCalledWith(
      new BadRequestError("This user is already registered")
    );
  });
});
