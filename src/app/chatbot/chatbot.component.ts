import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { QuestionAnswer } from '../classes/QuestionAnswer';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  questions: QuestionAnswer[] = [];
  currentAnswer: string = '';

  constructor(private appService:AppService) { }

  ngOnInit() {
    this.appService.getChat().subscribe(data => {
      this.questions = data;
    });
  }

  showAnswer(answer: string) {
    this.currentAnswer = answer;
  }
}