import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import App from './App';

describe('App component', () => {
    test("renders without crashing", () => {
        
        render(<App />);
        
    })
});