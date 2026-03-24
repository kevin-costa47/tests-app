import { act } from "react";
import { useArray } from "./UseArray";
import { renderHook } from "@testing-library/react";

describe("Use Array  Tests", () => {
  describe("useArray with number", () => {
    it("should render", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const renderResult = renderHook(() => useArray(initialArray));
      expect(renderResult.result.current.array).toEqual(initialArray);
    });

    it("should push", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const renderResult = renderHook(() => useArray(initialArray));
      act(() => renderResult.result.current.push(7));
      expect(renderResult.result.current.array).toEqual([...initialArray, 7]);
    });

    it("should update", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const renderResult = renderHook(() => useArray(initialArray));
      act(() => renderResult.result.current.update(0, 2));
      expect(renderResult.result.current.array[0]).toEqual(2);
    });

    it("should remove", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const renderResult = renderHook(() => useArray(initialArray));
      act(() => renderResult.result.current.remove(0));
      expect(renderResult.result.current.array).not.toContain(1);
      expect(renderResult.result.current.array.length).toEqual(
        initialArray.length - 1,
      );
    });

    it("should filter", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const renderResult = renderHook(() => useArray(initialArray));
      act(() => renderResult.result.current.filter((n) => n < 5));
      expect(renderResult.result.current.array.length).toEqual(
        [1, 2, 3, 4].length,
      );
    });

    it("should filter", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const renderResult = renderHook(() => useArray(initialArray));
      act(() => renderResult.result.current.filter((n) => n < 5));
      expect(renderResult.result.current.array.length).toEqual(
        [1, 2, 3, 4].length,
      );
    });
  });

  describe("useArray with string", () => {
    it("should remove element that dont start with uppercase", () => {
      const initialArray = ["A", "B", "apple", "Map", "e", "f"];
      const renderResult = renderHook(() => useArray(initialArray));

      act(() =>
        renderResult.result.current.filter((n) => n[0] === n[0].toUpperCase()),
      );

      expect(renderResult.result.current.array.length).toEqual(3);
    });
  });
});
