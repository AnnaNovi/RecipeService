import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appLoopForNumber]',
})
export class LoopForNumberDirective implements OnChanges {
  @Input() appLoopForNumberFrom!: number | null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.appLoopForNumberFrom &&
      changes['appLoopForNumberFrom'] &&
      changes['appLoopForNumberFrom'].currentValue
    ) {
      this.viewContainerRef.clear();

      for (let index = 1; index <= this.appLoopForNumberFrom; index++) {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: index,
        });
      }
    }
  }
}
