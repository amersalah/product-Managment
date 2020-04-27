import { Injectable } from '@angular/core';
import { IProduct } from './Product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError , tap, map} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class ProductService
{

  constructor(private http: HttpClient){}

  private producsUrl = 'api/products/products.json';

    getProducts(): Observable<IProduct[]>
    {
        return this.http.get<IProduct[]>(this.producsUrl).pipe(
          tap(data => console.log('All Data ' +  JSON.stringify(data) )),
          catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined>
    {
      return this.getProducts()
        .pipe(
          map((products: IProduct[]) => products.find(p => p.productId === id))
        );
    }

    private handleError(err: HttpErrorResponse){
      let errorMessage = '';
      if(err.error instanceof ErrorEvent)
        errorMessage = `An Error Occured : ${err.error.message}`;
      else
        errorMessage = `Server Returned Code  ${err.status} , error Message is ${err.message}`;

      console.error(errorMessage);
      return throwError(errorMessage);
    }
}