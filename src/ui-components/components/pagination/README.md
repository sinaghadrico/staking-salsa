## Pagination

Use pagination when it will take a long time to load/render all items or
If you want to browse the data by navigating through pages.

---

## How It works

## API

```jsx
<Pagination onPageChange={onChange} currentPage={1} totalPages={10} pageSize={{10}} />
​
```

---

| Props        | Description                                                                                    | Type           | Default                             |
| ------------ | ---------------------------------------------------------------------------------------------- | -------------- | ----------------------------------- |
| totalCount   | Total number of data                                                                           | number         |                                     |
| pageSize     | Page size per page                                                                             | number         | 10                                  |
| currentPage  | current Page                                                                                   | number         | 1                                   |
| onPageChange | Called when the page number is changed, and it takes the resulting page number as its argument | function(page) | (page: number) => console.log(page) |
| className    | Custom Class                                                                                   | string         | -                                   |
| style        | Custom style                                                                                   | Object         | -                                   |
| theme        | theme of orange for totem and purple for spark                                                 | Object         | orange                              |
