import { TestBed } from "@angular/core/testing";
import { Store, NgxsModule, Actions, ofActionDispatched } from "@ngxs/store";
import { Observable } from "rxjs";
import "jest";

describe("FinancialState", () => {
  let store: Store;
  let actions$: Observable<any>;
  // let financialsMockApiService: FinancialMockApiService;

  function errorWrapper(done: any, body: any) {
    try {
      body();
      done();
    } catch (error) {
      done.fail(error);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FinancialState])],
      providers: [FinancialMockApiService, LookupsMockApiService]
    });
    store = TestBed.get(Store);
    actions$ = TestBed.get(Actions);
    // financialsMockApiService = TestBed.get(FinancialMockApiService);
  });

  test("ChangeProductsPage should update productsDataSourceRequest", done => {
    const skip = 15;

    store.dispatch(new ChangeProductsPage(skip));
    store
      .selectOnce(state => state.financial.productsDataSourceRequest)
      .subscribe(productsDataSourceRequest => {
        errorWrapper(done, () => {
          expect(productsDataSourceRequest.skip).toEqual(skip);
        });
      });
  });

  test("ChangeProductsPage should dispatch FetchFilteredProducts", done => {
    actions$
      .pipe(ofActionDispatched(FetchFilteredProducts))
      .subscribe(actions => {
        errorWrapper(done, () => {
          expect(actions).toBeTruthy();
        });
      });
    store.dispatch(new ChangeProductsPage(0));
  });

  test("FilterProducts should update dataSourceRequest and searchForm", done => {
    const filter = new SingleFilter("testing", "contains", "value");
    const value = "search_value";

    store.dispatch(new FilterProducts(filter, value));
    store
      .selectOnce(state => state.financial)
      .subscribe(financial => {
        errorWrapper(done, () => {
          expect(financial.productsDataSourceRequest.filter).toEqual(filter);
          expect(financial.filteredProductsSearchForm).toEqual(value);
        });
      });
  });

  test("FilterProducts dispatch FetchFilteredProducts", done => {
    actions$
      .pipe(ofActionDispatched(FetchFilteredProducts))
      .subscribe(actions => {
        errorWrapper(done, () => {
          expect(actions).toBeTruthy();
        });
      });
    store.dispatch(new FilterProducts(null, null));
  });

  test("SortProducts should update dataSourceRequest", done => {
    const sort = [new Sort("testing", "asc")];

    store.dispatch(new SortProducts(sort));
    store
      .selectOnce(state => state.financial.productsDataSourceRequest)
      .subscribe(productsDataSourceRequest => {
        errorWrapper(done, () => {
          expect(productsDataSourceRequest.sort).toEqual(sort);
        });
      });
  });

  test("SortProducts should dispatch FetchFilteredProducts", done => {
    actions$
      .pipe(ofActionDispatched(FetchFilteredProducts))
      .subscribe(actions => {
        errorWrapper(done, () => {
          expect(actions).toBeTruthy();
        });
      });
    store.dispatch(new SortProducts([]));
  });
});
