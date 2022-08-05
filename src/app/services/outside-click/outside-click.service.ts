import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OutsideClickService {
  isContainElement(element: ElementRef<any> | null): Observable<boolean> {
    return fromEvent(window, 'click').pipe(
      map((event: Event) => event.target),
      map((target: EventTarget | null) => {
        return element?.nativeElement.contains(target as Node);
      })
    );
  }
}
