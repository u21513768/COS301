import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import TrendingTopics from './TrendingTopics';

describe('TrendingTopics component', () => {
  test("renders without crashing", () => {
    render(<TrendingTopics />);
  })
});