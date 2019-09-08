
import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_CONFIG } from 'src/app/shared/local-config';
import { Config } from 'src/app/shared/models/config-model';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';
import { MessagesService } from 'src/app/shared/service/messages.service';
import { UserService } from '../../../shared/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/shared/models/film.model';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-id-user',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {
  dataUser: User;
  userImg: string;
  imgFull: string;
  errorMessage = '';

  constructor(
    private userService: UserService,
    @Inject(LOCAL_CONFIG) public localConfig: Config,
    public appSpinnerService: AppSpinnerService,
  ) { }

  ngOnInit() {
    this.dataUser = this.userService.userListService;
    this.userImg = `${this.localConfig.userPath}`;
    this.imgFull = this.localConfig.imgFull;
    this.appSpinnerService.showOrHideSpinner(false);
  }

  ngAfterContentInit() {
    window.scrollTo(0, 0);
  }
}
