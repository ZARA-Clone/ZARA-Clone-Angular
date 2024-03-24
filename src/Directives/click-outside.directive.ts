import { Directive,ElementRef,EventEmitter,HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  flag:boolean=true;
  @Output() clickOutside = new EventEmitter<Event>();
  constructor(public elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    
    // Check if the click is outside the element
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit(event);      
    }
  }
  // hideDiv(){
  //   this.elementRef.nativeElement.style.display = 'block';
  // }
}
      

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent): void {
  //   //console.log("MALEK")
  //   console.log(this.elementRef.nativeElement)
  //   const targetElement = event.target as HTMLElement;
  //   console.log(targetElement);
  //   if(targetElement && this.elementRef.nativeElement.contains(targetElement)){
  //     //console.log("MSA2 EL 5EER");
  //   }
    // if (targetElement && !this.elementRef.nativeElement.contains(targetElement) && this.elementRef.nativeElement.style.display==='block') {
    //   //console.log("Clicked and Displayed");
    //   this.elementRef.nativeElement.style.display = 'none';

    // }
  // }
  



