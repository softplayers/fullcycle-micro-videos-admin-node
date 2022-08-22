import { SearchParams } from "./repository-contracts";

describe('SearhParams Unit Tests', () => {

  test('page prop', () => {
    const params = new SearchParams();
    expect(params.page).toBe(1);

    const arrange = [
      {page: null, expected: 1},
      {page: undefined, expected: 1},
      {page: '', expected: 1},
      {page: 'fake', expected: 1},
      {page: 0, expected: 1},
      {page: -1, expected: 1},
      {page: true, expected: 1},
      {page: false, expected: 1},
      {page: {}, expected: 1},

      {page: 1, expected: 1},
      {page: 2, expected: 2},
      {page: 5.5, expected: 5},
    ];

    arrange.forEach(i => {
      console.log('forEach - i', i)
      const search = new SearchParams({page: i.page as any});
      console.log('search', search, '\n- search.page', search.page)
      expect(new SearchParams({page: i.page as any}).page).toBe(i.expected);
    })
  })

});
