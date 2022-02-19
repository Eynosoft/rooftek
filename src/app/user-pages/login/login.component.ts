/**
 * Login component
 * 
 * This manages the login operations
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { AbstractControl, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/utils/validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  frmLogin: any = {
    email: null,
    password: null
  }
  submitted = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private tokenStorage: TokenStorageService) { }
  /**********************************************************************************/
  /**********************************************************************************/
  ngOnInit() {
    this.frmLogin = this.formBuilder.group(
      {
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required,Validators.maxLength(30)]]
      }
    )
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get form controls
   * 
   * @param (string)
   * @returns (object)
  */
   get f():{[key:string]:AbstractControl} {
    return this.frmLogin.controls;
  }
  /**********************************************************************************/
  /**********************************************************************************/
  onSubmit(): void {
    const {email,password} = this.frmLogin.value;
    this.submitted = true;
    if(this.frmLogin.invalid) {
      return;
    }
    console.log(JSON.stringify(this.frmLogin.value, null, 2));
    this.authService.login(email,password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken,data.tokenType);
        //this.tokenStorage.saveUser(data); 
        this.router.navigateByUrl('dashboard');
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message
        })
        this.errorMessage = err.error.message;
        
      }
    )
  }
}
