import { NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { EducationComponent } from "./components/education/education.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { ProjectComponent } from "./components/project/project.component";
import { CV } from './models/cv.model';
import { TranslationService } from './services/translation.service';

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
  @ViewChild('cvContent') cvContent!: ElementRef;

  title = 'mon_cv';

  cv!: CV;

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translationService.cvData$.subscribe(data => {
      if (data) {
        this.cv = data;
      }
    });
  }

  switchLanguage(lang: string) {
    this.translationService.loadLanguage(lang);
  }

  get yearsOfExperience(): number {
    const firstDate = this.cv.personalInfo.firstJobDate;
    if (!firstDate) return 0;
  
    const startDate = new Date(firstDate);
    const today = new Date();
    
    let diff = today.getFullYear() - startDate.getFullYear();
    
    // Vérification si l'anniversaire de carrière est passé cette année
    const monthDiff = today.getMonth() - startDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
      diff--;
    }
  
    return diff;
  }

  get formattedSummary(): string {
    const summary = this.cv.personalInfo.title;
    if (!summary) return '';
    
    // On remplace le tag {{years}} par la valeur calculée
    return summary.replace('{{years}}', this.yearsOfExperience.toString());
  }

  public async downloadPDF() {
    window.print()
  }
}
