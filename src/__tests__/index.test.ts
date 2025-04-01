import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { createCookie } from "../index";

describe("createCookie", () => {
  beforeEach(() => {
    document.cookie = "";
  });

  it("should get the initial value", () => {
    const { result } = renderHook(() =>
      createCookie("testKey", "initialValue")
    );
    expect(result.current.get()).toBe("initialValue");
  });

  it("should set and get a string value", () => {
    const { result } = renderHook(() =>
      createCookie("testKey", "initialValue")
    );
    act(() => {
      result.current.set("newValue");
    });
    expect(result.current.get()).toBe("newValue");
  });

  it("should set and get a number value", () => {
    const { result } = renderHook(() =>
      createCookie("testKey", 123)
    );
    act(() => {
      result.current.set(456);
    });
    expect(result.current.get()).toBe(456);
  });

  it("should set and get an object value", () => {
    const { result } = renderHook(() =>
      createCookie("testKey", { key: "value" })
    );
    act(() => {
      result.current.set({ key: "newValue" });
    });
    expect(result.current.get()).toEqual({ key: "newValue" });
  });

  it("should set and get a boolean value", () => {
    const { result } = renderHook(() =>
      createCookie("testKey", true)
    );
    act(() => {
      result.current.set(false);
    });
    expect(result.current.get()).toBe(false);
  });

  it("should reset to the initial value", () => {
    const { result } = renderHook(() =>
      createCookie("testKey", "initialValue")
    );
    act(() => {
      result.current.set("newValue");
      result.current.reset();
    });
    expect(result.current.get()).toBe("initialValue");
  });

  it("should check if a value exists", () => {
    const { result } = renderHook(() =>
      createCookie("testKey", "")
    );
    expect(result.current.hasValue()).toBe(false);

    act(() => {
      result.current.set("newValue");
    });
    expect(result.current.hasValue()).toBe(true);

    act(() => {
      result.current.reset();
    });
    expect(result.current.hasValue()).toBe(false);
  });

  it("should handle invalid JSON gracefully", () => {
    document.cookie = "testKey=invalidJSON";
    const { result } = renderHook(() =>
      createCookie("testKey", "fallbackValue")
    );
    expect(result.current.get()).toBe("invalidJSON");
  });
});
