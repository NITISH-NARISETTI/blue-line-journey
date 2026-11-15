import { describe, expect, test } from "bun:test";
import { stripScale } from "./strip-scale.ts";

describe("proportional phone strip", () => {
  test("phone strip is 0.85x its previous size", () => {
    expect(stripScale(390, 844)).toBe(0.75 * 0.85);
    expect(stripScale(504, 786)).toBeCloseTo(0.75 * 504 / 390 * 0.85);
  });
  test("size follows phone width", () => {
    expect(stripScale(320, 700)).toBeCloseTo(0.75 * 320 / 390 * 0.85);
    expect(stripScale(430, 932)).toBeCloseTo(0.75 * 430 / 390 * 0.85);
  });
  test("768px and wider preserve desktop sizing", () => {
    expect(stripScale(768, 700)).toBe(1);
    expect(stripScale(1280, 1190)).toBe(1.7);
  });
  test("landscape never clips the canvas vertically", () => {
    expect(stripScale(740, 360)).toBe(360 / 700 * 0.85);
  });
});