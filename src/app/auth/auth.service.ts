import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;

}
@Injectable({providedIn: 'root' })
export class AuthService {
    user = new Subject<User>();
    firebaseAPIKey = 'AIzaSyBpiWuZzUZWRnE_ndZ6Wt9-MuiDqWX6Mhk';
    emptyEmail = "";
    emptyId = "";
    emptyToken = "";
    userEmpty = new User(this.emptyEmail, this.emptyId, this.emptyToken);
    constructor(private http: HttpClient, private router: Router){}

    signUp(inputEmail: string, inputPswd: string): Observable<AuthResponseData> {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.firebaseAPIKey,
        { 
            email: inputEmail,
            password: inputPswd,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError), tap( 
            responseData => {
                this.handleAuthTap(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
            }
            ));

    }

    signIn(inputEmail: string, inputPswd: string): Observable<AuthResponseData>{
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.firebaseAPIKey, 
        { 
            email: inputEmail,
            password: inputPswd,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError), tap( 
            responseData => {
                this.handleAuthTap(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
            }
            ));
    }

    autoSignIn(): void {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') || '{}');
        if(!userData) { return; }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token){
            this.user.next(loadedUser);
        }
    }

    signOut(): void {
        this.user.next(this.userEmpty);
        this.router.navigate(['/auth']);
    }

    private handleAuthTap(email: string, userId: string, token: string, expiresIn: number): void{
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse): Observable<AuthResponseData> {
        let errorMsg = "Une erreur s\'est produite.";
                if(!errorResponse.error || !errorResponse.error.error){
                    return throwError(errorMsg);
                }
                
                switch(errorResponse.error.error.message) {
                    case 'EMAIL_EXISTS' : 
                    errorMsg = 'Email existant'; 
                    break;

                    case 'EMAIL_NOT_FOUND':
                    case 'INVALID_PASSWORD':
                        errorMsg = 'Email ou mot de passe inconnu';
                        break;
                    
                    default: 
                    errorMsg = 'Une erreur s\'est produite';
                    break;
      
                  }
                return throwError(errorMsg);
    }

}

