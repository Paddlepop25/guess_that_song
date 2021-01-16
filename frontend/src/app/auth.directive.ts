import {	
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { AuthService } from './auth.service';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private authSvc: AuthService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;

  ngOnInit() {
    this.authSvc.isAuthenticated.subscribe((isAuthenticated)=>{
	// console.log('>>>>>> auth >>>>', isAuthenticated);
	if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
           this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
           this.viewContainer.clear();
        }
    });
  }
	
  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
