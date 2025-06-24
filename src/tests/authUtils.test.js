import * as authUtils from "../utils/authUtils";
import { beforeEach, expect, test, describe } from "@jest/globals";

describe("authUtils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("isAuthenticated retourne false si pas de token", () => {
    expect(authUtils.isAuthenticated()).toBe(false);
  });

  test("isAuthenticated retourne true si token présent", () => {
    localStorage.setItem("token", "abc");
    expect(authUtils.isAuthenticated()).toBe(true);
  });

  test("getCurrentUser retourne null si pas de user", () => {
    expect(authUtils.getCurrentUser()).toBeNull();
  });

  test("getCurrentUser retourne l'objet user si présent", () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Test" }));
    expect(authUtils.getCurrentUser()).toEqual({ id: 1, name: "Test" });
  });
}); 