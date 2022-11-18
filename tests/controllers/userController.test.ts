import { UserController } from "../../src/controllers/userController";
import { UserService } from "../../src/services/userServices";
import {
  BadRequestError,
  GatewayError,
  TimeoutError,
  UnauthorizedError,
} from "../../src/utils/api-errors";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Prisma } from "@prisma/client";

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
        password: "Senhadozezinho21",
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
          "Test client version"
        )
      );
    const mockRequest = getMockReq();

    await controller.register(mockRequest, res, next);
    expect(next).toBeCalledWith(
      new BadRequestError("This user is already registered")
    );
  });

  it("Should handle the exception if the database can't be reached", async () => {
    const userRegisterMock = jest
      .spyOn(UserService.prototype, "register")
      .mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          "Test message",
          "P1001",
          "Test client version"
        )
      );
    const mockRequest = getMockReq();

    await controller.register(mockRequest, res, next);
    expect(next).toBeCalledWith(new GatewayError("Can't reach the database"));
  });

  it("Should handle the exception if the database requisiton times out", async () => {
    const userRegisterMock = jest
      .spyOn(UserService.prototype, "register")
      .mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          "Test message",
          "P1008",
          "Test client version"
        )
      );
    const mockRequest = getMockReq();

    await controller.register(mockRequest, res, next);
    expect(next).toBeCalledWith(new TimeoutError("Operation timed out"));
  });
});

describe("Login", () => {
  it("Should return a valid token with the right credentials", async () => {
    const mockRequest = getMockReq({
      username: "zezinho",
      password: "Senhadozezinho21",
    });
    const mockData = {
      //Fake data for testing purposes
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InplemluaG8iLCJwYXNzd29yZCI6IlRlc3RlZG96ZXppbmhvMjEifQ._ndDia3pF8JPxXwekeCvi12pjG-gg12zxPBX3cLrunQ",
      username: "zezinho",
      userId: "70bf5fa8-66e0-11ed-9022-0242ac120002",
      accountId: "78c584f2-66e0-11ed-9022-0242ac120002",
    };
    const userLoginMock = jest
      .spyOn(UserService.prototype, "login")
      .mockResolvedValue(mockData);

    await controller.login(mockRequest, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(mockData);
  });

  it("Should deny access to an unregistered user", async () => {
    //No mock data needed, the service will handle aceppting or rejecting data input
    const mockRequest = getMockReq();
    const mockException = new UnauthorizedError("Wrong username or password.");
    const userLoginMock = jest
      .spyOn(UserService.prototype, "login")
      .mockRejectedValue(mockException);
    await controller.login(mockRequest, res, next);
    expect(next).toBeCalledWith(mockException);
  });
});
