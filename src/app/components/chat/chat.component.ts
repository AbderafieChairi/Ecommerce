import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat : Array<{msg:String,me:Boolean}>=[];
  public message: String = '';
  // = new Subject();
  constructor() { }

  ngOnInit(): void {
  }




  getResponse(){
    console.log("get response")
    this.chat.push({msg:this.message,me:true})
    fetch('https://dialogflow.googleapis.com/v2/projects/shopme-esid/agent/sessions/c5724bca-4158-6746-793e-2ceee42f4612:detectIntent', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ya29.a0AX9GBdWbHw0yoPQoqV_orMVo9TXunwa8nK2X0s5GVhoN5Bn5S1yj69H6KfCvCNtBFuPwYYo4xOANNsejvAAVukE-fYjzfjSwVx9TWbnzIwofYISIl_pRL4pou6JqXtEuW_14ryLGPx5B7RV3aovQkAHkWnX7-xSJKqSdBN9gMDZgIOvpeVkdyWvRMmCkrnkciKOjfSaJ0c4s4E8Rkuq_GUOMX3UyLLIuFca5fQUOWfC61IIaCgYKAScSARMSFQHUCsbCGgNmjSh0ty2YYIkyVCUEqQ0246'
      },
      body: JSON.stringify({
          'queryInput': {
              'text': {
                  'text': this.message,
                  'languageCode': 'en'
              }
          },
          'queryParams': {
              'source': 'DIALOGFLOW_CONSOLE',
              'timeZone': 'Europe/Paris',
              'sentimentAnalysisRequestConfig': {
                  'analyzeQueryTextSentiment': true
              }
          }
      })
  })
	.then(res=>res.json())
	.then(json=>this.chat.push({msg:json.queryResult.fulfillmentText,me:false}))
  .then(()=>{
    this.message='';
  })
  .catch((e)=>console.log(e))
  }


}
