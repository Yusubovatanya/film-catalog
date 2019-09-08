import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/service/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  errorMessage = '';
  userForm: FormGroup;
  hide = true;
  isLogin: boolean;
  subscriptionLogin$: Subscription;
  subscription$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService,
    private formBuild: FormBuilder
  ) {
    this.isLogin = this.authService.isLoggedIn();
    this.subscriptionLogin$ = this.authService.legLoginStatus().subscribe((isLogin: boolean) => {
      this.isLogin = isLogin; 
    })
  }

  formErrors = {
    "userLogin": "",
    "userPassword": ""
  }

  validationMessages = {
    "userLogin": {
      "required": "Поле не может быть пустым.",
      "pattern": "Не правильный формат логина.",
      "minlength": "Значение должно быть не менее 5и символов.",
      "maxlength": "Значение не должно быть больше 25 символов.",
    },
    "userPassword": {
      "required": "Поле не может быть пустым.",
      "pattern": "Не правильный формат пароля.",
      "minlength": "Значение должно быть не менее 5и символов.",
      "maxlength": "Значение не должно быть больше 25 символов."
    }
  }

  ngOnInit() {
    //  if (this.isLogin) {
    //   this.router.navigate(['/main']);
    // } else {
    //   this.buildForm();
    // }
    this.buildForm();
    if (this.isLogin) {
    this.router.navigate(['/main']);
    }
  }

  buildForm() {
    this.userForm = this.formBuild.group({
      userLogin: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern(/[A-Z]/)
        // Validators.email
        // Validators.pattern(/^(|(([A-Za-z0-9][A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i)
      ]],
      userPassword: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern(/(?=.*[0-9])(?=.*[a-z])/g)
        // Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g)
        // Validators.pattern(/[0-9]/)
        // Validators.pattern(/[A-Z]/)
      ]]
    })
    this.userForm.valueChanges.subscribe(() => {
      if (this.userForm.touched && this.userForm.dirty) {
        this.onValueChange()
      }
    }
    )
  }

  onValueChange() {
    if (!this.userForm) return;// ????
    for (let element in this.formErrors) {
      this.formErrors[element] = "";
      let controlElement = this.userForm.get(element);
      if (controlElement && controlElement.dirty && !controlElement.valid) {
        let message = this.validationMessages[element];
        for (let key in controlElement.errors) {
          this.formErrors[element] += message[key] + " ";
        }
      }
    }
  }


  clear() {
    this.userForm.reset()
  }

  login() {
    this.errorMessage = '';//???
    this.subscription$ = this.authService.login(this.userForm.value.userLogin, this.userForm.value.userPassword)
      .subscribe(
        (res) => {
          this.msgService.setMessage({
            type: "success",
            body: `${this.userForm.value.userLogin}, Вы успешно вошли в систему. Добро пожаловать!`
          });
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 2000);
        },
        err => {
          console.log(err)
        }
      );
  }
  
  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  ngOnDestroy() { 
    this.subscriptionLogin$.unsubscribe();
  }
 
}

