import {ContentChildren, Directive, HostListener, QueryList} from "@angular/core";
import {KeyboardManagedItemDirective} from "./keyboard-managed-item.directive";

@Directive({
  selector: '[appKm]',
})
export class KeyboardManagerDirective {

  @ContentChildren(KeyboardManagedItemDirective) public items: QueryList<KeyboardManagedItemDirective> = null;

  @HostListener('keyup', ['$event'])
  public manageKeys(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        console.log('up');
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
      case 'ArrowDown':
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowLeft':
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowRight':
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
    }
  }

  public moveFocus(direction: ArrowDirection): KeyboardManagedItemDirective {
    const items: KeyboardManagedItemDirective[] = this.items.toArray();
    const curentSelectedIndex = items.findIndex(item => item.isFocused());
    const taregetElementFocus = items[curentSelectedIndex + direction];

    if (taregetElementFocus) {
      return taregetElementFocus;
    }

    return direction === ArrowDirection.LEFT
      ? items[items.length - 1]
      : items[0];
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1,
}
