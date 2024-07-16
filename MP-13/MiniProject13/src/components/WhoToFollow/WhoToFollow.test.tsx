import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import WhoToFollow from './WhoToFollow';

describe('WhoToFollow component', () => {
  test("renders without crashing", () => {
    render(<WhoToFollow users={[]} />);
  })
});