import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Observable, catchError, finalize, of } from "rxjs";

@Injectable()
export class NgHttpInterceptor implements HttpInterceptor{
    private count = 0;

    constructor(private ngxService: NgxUiLoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.ngxService.start();
    this.count++;
    return next.handle(req).pipe(
      catchError(error => {
        return of(error);
      }),
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.ngxService.stop();
        }
      })
    );
    }
    
}