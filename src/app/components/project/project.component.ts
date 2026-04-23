import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  imports: [NgForOf, NgIf],
  templateUrl: './project.component.html'
})
export class ProjectComponent {
  @Input() projects: any[] = [];
}
