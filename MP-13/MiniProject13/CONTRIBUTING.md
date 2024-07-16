# Table of content
- [Table of content](#table-of-content)
  - [Contributing](#contributing)
  - [Issues and PRs](#issues-and-prs)
  - [Feature requests](#feature-requests)
  - [Our branching strategy](#our-branching-strategy)
  - [Submitting a pull request for frontend code](#submitting-a-pull-request-for-frontend-code)
  - [Submitting a pull request for supabase edge functions](#submitting-a-pull-request-for-supabase-edge-functions)
  - [Testing model](#testing-model)
  - [Resources](#resources)

## Contributing

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a <a href="CODE_OF_CONDUCT.md">code of conduct</a>. By participating in this project you agree to abide by its terms.

## Issues and PRs

If you have encountered an bug during usage of this application or whilst developing, you found an bug, please open an issue report and detail your issue. Have a look at our <a href="https://github.com/COS301-SE-2024/MiniProject13#the-team">lovely developers</a> to decide which developer to assign this issue to first then proceed to create an issue by clicking <a href="https://github.com/COS301-SE-2024/MiniProject13/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D">here</a>

## Feature requests

If you have a feature idea and you would like to pitch it, please create an feature request by clicking <a href="https://github.com/COS301-SE-2024/MiniProject13/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%5BFEATURE+REQUEST%5D">here</a>

## Our branching strategy

![Git trunk based strategy!](/images/GitFlow_trunk.png "Git trunk based strategy")
image source: https://blog.mergify.com/trunk-based-development-vs-git-flow-when-to-use-which-development-style/

## Submitting a pull request for frontend code

1. Make sure you have <a href="https://nodejs.org/en/download/current">Node</a> installed.
2. Clone the repository.
3. Configure and install the dependencies:
```
npm install
```
4. Make sure the tests pass on your machine: 
```
npm test
```
5. Run the linter with:
```
npm run lint
```
6. Please acquire the API keys from <a href="https://supabase.com/dashboard/project/przfwtfinnjmlhcdbqbr/settings/api">here</a> and create a ```.env``` at the root of this project and fill it with the appropriate keys like so:
```
VITE_SUPABASE_KEY="Replace everything that is in between this string including the quotation marks"
VITE_SUPABASE_URL="Replace everything that is in between this string including the quotation marks"
```
7. Switch to develop and create a new branch from develop: 
```git checkout -b feature-name``` 
Please note that your branch name should not be a 'named' branch but rather a feature based branch so that other developers are able to tell what it does without having to constantly ask you. Please make the name as descriptive as possible for what it is doing. You can also create the branch using the web-gui on github.
8. Make your changes in the <a href="/src">src folder</a>, add <a href="#testing-model">tests(following this model)</a>, and make sure all the tests and linting still pass.
9. Push to your branch and open a pull request to the dev branch. In your pull request description, please describe what it is you have changed. A simple template to build upon for pull requests is available <a href="pull_request_template.md">here</a>. Please reference <a href="https://www.markdownguide.org/basic-syntax/#overview">this</a> to write the correct markdown syntax
10. Pat your self on the back and wait for your pull request to be reviewed and merged😄.
11. In some cases, your code may be rejected and you may thus need to fix your code before pushing to your pull request.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the <a href="https://standardjs.com/">style</a> which is using standard. Any linting errors should be shown when running `npm run lint`.
- Write and update tests.
- Keep your changes as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a <a href="http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html">good commit message</a>.

Work in Progress pull requests are also welcome to get feedback early on, or if there is something blocked you. This simply means, you can draft a pull request just to met other developers to make sure you are on the right track before eventually converting it to a full pull request.

## Submitting a pull request for supabase edge functions

1. Make sure you have <a href="https://docs.deno.com/runtime/manual/getting_started/installation">deno</a> installed.
2. If you are using vs code, get the <a href="https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno">deno extension</a> to help you with development.
3. Clone the repository. You will be working from the <a href="/supabase/">supabase folder</a>
4. Configure and install the dependencies:
```
npm install
```
5. Login to supabase
```
npx supabase login
```
6. Link to our project and follow the on screen instructions. Note database password is blank.
```
npx supabase link
```
7. Switch to develop and create a new branch from develop: 
```git checkout -b feature-name``` 
Please note that your branch name should not be a 'named' branch but rather a feature based branch so that other developers are able to tell what it does without having to constantly ask you. Please make the name as descriptive as possible for what it is doing. You can also create the branch using the web-gui on github.
8. Please note that since supabase cli only exists within the context of this application, you will have to use ```npx``` before every ```supabase``` command you use from the docs.
9. If you want to create a new function, type:
```
npx supabase functions new <function-name-goes-here>
```
10. For more functionality, follow <a href="https://supabase.com/docs/guides/functions/quickstart">quickstart</a> and <a href="https://supabase.com/docs/guides/functions/unit-test#testing-in-deno">writing unit tests for edge functions</a>

## Testing model

1. If you are writing tests for globally available typescript functions, say a utils.ts file, you should create a utils.test.ts file next to the file you are writing tests for and create tests for the functions like so:
```ts
import { expect, test } from 'vitest';
import { sum_func } from './index';

test('adds 1 + 2 to equal 3', () => {
    expect(sum_func(1, 2)).toBe(3)
})
```
2. If you are writing tests for a component, say App.tsx, you should create an App.test.tsx file next to the file you are writing tests for and create tests for the functions like so:
```tsx
import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import App from './App';

describe('App component', () => {
  test("renders without crashing", () => {
    render(<App />);
  })
});
```
3. Please expand on your tests by having a look at <a href="https://vitest.dev/guide/mocking.html">vitest</a> for functional testing and <a href="https://testing-library.com/docs/react-testing-library/example-intro">react-testing-library</a> for component testing.
4. Just a note, be careful when rendering components that rely on ```router-dom``` components, such as ```link```. Make sure to wrap your component in a router, much in the same way you would in the App.tsx file:
```ts
test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
      </Router>);
  })
```

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)