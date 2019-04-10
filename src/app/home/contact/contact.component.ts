import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  details: string;
  message: string;
  sending = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.done();
    }, 1000);
  }

  done() {
    this.router.navigate(['/home']);
  }

}
