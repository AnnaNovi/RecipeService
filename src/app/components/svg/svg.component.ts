import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
})
export class SVGComponent {
  constructor() {}

  @Input() id: string | null = null;
}
