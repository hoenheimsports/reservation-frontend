import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {delay} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loading:boolean= false;
  formLogin!:FormGroup;
  constructor(private snackBar:MatSnackBar,private router:Router,private formBuilder:FormBuilder,private authService:AuthService) {}



  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username:[null,Validators.required],
      password:[null,Validators.required],
    })
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.formLogin.get('username')?.value,this.formLogin.get('password')?.value);
    this.authService.isAuth().pipe(delay(1000)).subscribe(
      (isAuth) => {
        this.loading=false;
        if(isAuth) {
          this.snackBar.open('Authentification réussi', 'Fermer', {
            duration: 3000,
          })
          this.router.navigateByUrl("/reservation/admin");
        } else {
          this.snackBar.open('Authentification a échoué', 'Fermer', {
            duration: 5000,
          });
          this.formLogin.reset();
        }
      },
    )
  }


}
