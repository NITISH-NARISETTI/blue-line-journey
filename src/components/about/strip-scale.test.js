import { describe, expect, test } from "bun:test";
import { stripScale } from "./strip-scale.ts";

describe("proportional phone strip", () => {
  test("390px phone uses the requested 0.75x size", () => {
    expect(stripScale(390, 844)).toBe(0.75);
  });
  test("size follows phone width", () => {
    expect(stripScale(320, 700)).toBeCloseTo(0.75 * 320 / 390);
    expect(stripScale(430, 932)).toBeCloseTo(0.75 * 430 / 390);
  });
  test("768px and wider preserve desktop sizing", () => {
    expect(stripScale(768, 700)).toBe(1);
    expect(stripScale(1280, 1190)).toBe(1.7);
  });
  test("landscape never clips the canvas vertically", () => {
    expect(stripScale(740, 360)).toBe(360 / 700);
  });
});