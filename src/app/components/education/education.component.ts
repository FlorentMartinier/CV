import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Education } from '../../models/cv.model';

@Component({
  selector: 'app-education',
  imports: [NgForOf, NgIf],
  templateUrl: './education.component.html'
})
export class EducationComponent {
  @Input() education: Education[] = [];
}
