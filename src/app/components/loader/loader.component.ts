import { Component, OnInit } from '@angular/core';
import { loaderAnimation } from './loader.animation';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [loaderAnimation]
})
export class LoaderComponent implements OnInit {
  loaderState = 'start';

  constructor() { }

  ngOnInit(): void {
  }

}
