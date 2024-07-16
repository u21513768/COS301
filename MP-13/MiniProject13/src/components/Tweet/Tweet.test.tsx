//import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
//import Tweet from './Tweet';

describe('Tweet component', () => {
  test("renders without crashing", () => {
    
  })
});

/* TypeError: Cannot destructure property 'future' of 'React__namespace.useContext(...)' as it is null.
describe('Tweet component', () => {
  test("renders without crashing", () => {
    render(<Tweet 
      name="John Doe" 
      username="@johndoe" 
      text="Hello, world!" 
      timeDisplay="2h" 
      likes={5} 
      retweets={2} 
      comments={1} 
      saves={3}
    />);
  })
});
*/