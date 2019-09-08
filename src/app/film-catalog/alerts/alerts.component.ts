import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/shared/service/messages.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  isShow = false;
  message: string;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messagesService.getMessages()
      .subscribe((msg: any) => {
        this.message = msg;
        this.isShow = true;
        if (!msg.action) {
          setTimeout(() => this.isShow = false, 5000);
        }
      });
  }

  submit() {
    this.isShow = false;
    this.messagesService.submit();
  }

  close() {
    this.isShow = false;
    this.messagesService.submit(false);
  }

}
