import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-deletion-confirmer',
  templateUrl: './deletion-confirmer.component.html',
  styleUrls: ['./deletion-confirmer.component.css']
})
export class DeletionConfirmerComponent implements OnInit {

  @Input() show = false;
  @Input() option = '';
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
