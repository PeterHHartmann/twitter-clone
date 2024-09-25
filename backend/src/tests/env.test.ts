import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getAccessSecret } from '../utils/constants';

describe('constants module', () => {
    const env = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
    });

    afterEach(() => {
        process.env = env;
    });

    it('should have the function defined', () => {
        expect(() => {
            getAccessSecret();
        }).toBeDefined;
    });

    it('should throw error when no ACCESS_TOKEN_SECRET env variable', () => {
        expect(() => {
            getAccessSecret();
        }).toThrow('The environment variable ACCESS_TOKEN_SECRET is not set.');
    });

    it('should return a string', () => {
        process.env.ACCESS_TOKEN_SECRET = 'secret';
        const ACCESS_TOKEN_SECRET = getAccessSecret();
        expect(typeof ACCESS_TOKEN_SECRET).toBe('string');
    });
});
