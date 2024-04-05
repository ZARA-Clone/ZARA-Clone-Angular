import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.headers.get('content-type') === 'application/problem+json') {
          // Handle problem+json response here
          console.error('API error:', error.error);
          // You can parse the error and display it to the user in a meaningful way
          return throwError(() => 'An error occurred. Please try again later.');
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}


