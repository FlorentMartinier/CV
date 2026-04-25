import { Component, Input } from '@angular/core';
import { Experience } from '../../models/cv.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [NgForOf, NgIf],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
}
