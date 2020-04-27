import { Component, OnInit } from '@angular/core';
import { IProduct } from './Product';
import { ProductService } from './product-service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  
    constructor(private productService: ProductService){
    }

    pageTitle: string = 'Product List';
    imageWidth: number =50;
    imageMargin: number =2;
    showImage: boolean =false;
    errorMessage: string;
    
    private _listFilter: string;

    filteredProducts: IProduct[];

    public get listFilter(): string {
      return this._listFilter;
    }
    public set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }



    products: IProduct[] ;

    toogleImage(): void{
      this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
     
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 );
    }

    onRatingClicked(message: string): void
    {
      this.pageTitle = 'Product List: ' + message;
    }

    ngOnInit(): void {
       this.productService.getProducts().subscribe({
         next: products => {
           this.products = products
           this.filteredProducts = this.products;
          },
         error: err => this.errorMessage  =err
       });
     
    }
}