# Cheatsheet

    This is testin cheatsheet.

# 1) Testing-library/jest-dom ([Link](https://www.npmjs.com/package/@testing-library/jest-dom))

-   ### `toBeDisabled`
-   ### `toBeEnabled`
-   ### `toBeEmpty`
-   ### `toBeEmptyDOMElement`
-   ### `toBeInTheDocument`
-   ### `toBeInvalid`
-   ### `toBeRequired`
-   ### `toBeValid`
-   ### `toBeVisible`
-   ### `toContainElement`
-   ### `toContainHTML`
-   ### `toHaveAttribute`
-   ### `toHaveClass`
-   ### `toHaveFocus`
-   ### `toHaveFormValues`
-   ### `toHaveStyle`
-   ### `toHaveTextContent`
-   ### `toHaveValue`
-   ### `toHaveDisplayValue`
-   ### `toBeChecked`
-   ### `toBePartiallyChecked`
-   ### `toHaveDescription`

<br><br>

# 2) Jest ([Link1](https://jestjs.io/docs/en/expect) - [Link2](https://jest-bot.github.io/jest/docs/expect.html#tohavebeencalledtimesnumber))

-   ### `expect(value)`
-   ### `expect.extend(matchers)`
-   ### `this.isNot`
-   ### `this.utils`
-   ### `expect.anything()`
-   ### `expect.any(constructor)`
-   ### `expect.arrayContaining(array)`
-   ### `expect.assertions(number)`
-   ### `expect.stringContaining(string)`
-   ### `expect.stringMatching(regexp)`
-   ### `expect.objectContaining(object)`
-   ### `expect().not`
-   ### `expect().toBe(value)`
-   ### `expect().toHaveBeenCalled()`
-   ### `expect().toHaveBeenCalledTimes(number)`
-   ### `expect().toHaveBeenCalledWith(arg1, arg2, ...)`
-   ### `expect().toHaveBeenLastCalledWith(arg1, arg2, ...)`
-   ### `expect().toBeCloseTo(number, numDigits)`
-   ### `expect().toBeDefined()`
-   ### `expect().toBeFalsy()`
-   ### `expect().toBeGreaterThan(number)`
-   ### `expect().toBeGreaterThanOrEqual(number)`
-   ### `expect().toBeLessThan(number)`
-   ### `expect().toBeLessThanOrEqual(number)`
-   ### `expect().toBeInstanceOf(Class)`
-   ### `expect().toBeNull()`
-   ### `expect().toBeTruthy()`
-   ### `expect().toBeUndefined()`
-   ### `expect().toContain(item)`
-   ### `expect().toContainEqual(item)`
-   ### `expect().toEqual(value)`
-   ### `expect().toHaveLength(number)`
-   ### `expect().toMatch(regexpOrString)`
-   ### `expect().toMatchObject(object)`
-   ### `expect().toMatchSnapshot(optionalString)`
-   ### `expect().toThrow(error)`
-   ### `expect().toThrowErrorMatchingSnapshot()`

<br><br>

# 3) Testing-library/user-event ([Link](https://github.com/testing-library/user-event))

-   ### `userEvent.click()`
-   ### `userEvent.dblClick()`
-   ### `userEvent.type()`
-   ### `userEvent.upload()`
-   ### `userEvent.clear()`
-   ### `userEvent.selectOptions()`
-   ### `userEvent.deselectOptions()`
-   ### `userEvent.tab()`
-   ### `userEvent.hover()`
-   ### `userEvent.unhover()`
-   ### `userEvent.paste()`

<br><br>

# 4) React Testing Library ([Link](https://testing-library.com/docs/intro))

1. ### `render`
2. ### [`rerender`](https://testing-library.com/docs/example-update-props)
3. ### [`querySelector`](https://testing-library.com/docs/guide-which-query)

    - ### `getByRole`
    - ### `getByLabelText`
    - ### `getByPlaceholderText`
    - ### `getByText`
    - ### `getByDisplayValue`
    - ### `getByAltText`
    - ### `getByTitle`
    - ### `getByTestId`

4. ### [`fireEvent`](https://testing-library.com/docs/guide-events)
    - ### `fireEvent.mouseOver()`
    - ### `fireEvent.mouseMove()`
    - ### `fireEvent.mouseDown()`
    - ### `fireEvent.focus()`
    - ### `fireEvent.mouseUp()`
    - ### `fireEvent.click()`

<br><br>

# 5) MDX Writing ([Link1](https://mdxjs.com/getting-started)) ([Link2](https://www.learnstorybook.com/design-systems-for-developers/react/en/document/))

# Component design rules

## 1. PropTypes

-   ### `selectedId` -- _PropTypes.string_

-   ### `selectedIds` -- _PropTypes.array_

-   ### `loading` -- _PropTypes.bool_

-   ### `size` -- _PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"])_

-   ### `theme` -- _PropTypes.oneOf(["dark", "light"])_

-   ### `color` -- _PropTypes.oneOf(["default", "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"])_

-   ### `list` -- _PropTypes.array.isRequired_

-   ### `name` -- _PropTypes.string_

-   ### `onChange` -- _PropTypes.func_

-   ### `onClick` -- _PropTypes.func_

-   ### `mode` -- _PropTypes.oneOf(["horizontal", "vertical"])_

-   ### `disabled` -- _PropTypes.bool_

-   ### `active` -- _PropTypes.bool_

-   ### `inactive` -- _PropTypes.bool_

-   ### `className` -- _PropTypes.string_

-   ### `style` -- _PropTypes.object_

-   ### `fixed` -- _PropTypes.bool_

<br><br>

## 2. Default Props

-   ### `disabled` -- _false_
-   ### `loading` -- _false_
-   ### `className` -- _""_
-   ### `name` -- _""_
-   ### `selectedId` -- _""_
-   ### `mode` -- _horizontal_
-   ### `size` -- _md_
-   ### `list` -- _[]_
-   ### `selectedIds` -- _[]_
-   ### `style` -- _{}_
-   ### `fixed` -- _false_
