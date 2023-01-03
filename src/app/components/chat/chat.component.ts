import { Component, OnInit } from '@angular/core';
import { ChatBot } from 'angular-ai-chat-bot';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public accessToken = 'YOUR_ACCESS_TOKEN';
  public message!: Subject<any>;
  // = new Subject();
  constructor() { }

  ngOnInit(): void {
  }

}
