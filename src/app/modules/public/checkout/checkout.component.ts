import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from '../services/order.service';
import { Product } from 'src/app/models/Product';
import { CartItem } from 'src/app/models/Cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order :Order = JSON.parse(localStorage.getItem("order") ||"");
  products :CartItem[]= JSON.parse(localStorage.getItem("cart") ||"");
  // checkoutForm: FormGroup;
  seccus=new BehaviorSubject<boolean>(true);
  token:String="";
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const b:boolean=params['seccus'] =="true"
      console.log(b);
      this.seccus.next(b)
      // if(!this.orderService.testToken(params['token'] as string)){
      //   console.log("token invalid")
      //   this.router.navigate(["store","home"])
      // }else{
      if(b){
        console.log("submit order to server ")
        this.orderService.SubmitOrder()
      }
    })
    
  }
  constructor(
    private orderService:OrderService,
    private fb : FormBuilder,
    private router : Router,
    private route :ActivatedRoute
    ){
    // this.checkoutForm = this.fb.group({
    //   fullName: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   address: ['', Validators.required],
    //   city: ['', Validators.required],
    //   country: ['', Validators.required],
    //   zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
    //   phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    // });
  }
  onSubmit(){
    // console.log(this.checkoutForm.value)
    
  }

  quit(){
    // this.orderService.quitCheckOut();
    // localStorage.removeItem("order_id");
    // this.router.navigate(['store','cart']);
  }

}
