import { Component } from '@angular/core';
import { loaderAnimation } from './loader.animation';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [loaderAnimation],
})
export class LoaderComponent {}
