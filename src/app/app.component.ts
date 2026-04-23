import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CV } from './models/cv.model';
import { CvService } from './services/cv.services';
import { ExperienceComponent } from "./components/experience/experience.component";
import { EducationComponent } from "./components/education/education.component";
import { ProjectComponent } from "./components/project/project.component";
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ExperienceComponent,
    EducationComponent,
    ProjectComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'mon_cv';

  cv!: CV;

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getCV().subscribe(data => {
      console.log('mon cv trouvé : ', data);
      this.cv = data;
    });
  }

  downloadPDF() {
    window.print();
  }
}
