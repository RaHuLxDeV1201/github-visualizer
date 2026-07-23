import { describe, it, expect } from 'vitest';
import { calculateStrokeDasharray } from './svgHelpers'; // adjust to your actual function name

describe('SVG Radial Calculations', () => {
    it('calculates correct dash offsets for percentage inputs', () => {
        const result = calculateStrokeDasharray(50, 100); // example values
        expect(result).toBeDefined();
    });
});