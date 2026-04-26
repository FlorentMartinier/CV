import { NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { EducationComponent } from "./components/education/education.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { ProjectComponent } from "./components/project/project.component";
import { CV } from './models/cv.model';
import { CvService } from './services/cv.services';

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

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getCV().subscribe(data => {
      this.cv = data;
    });
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
    const element = this.cvContent.nativeElement;

    try {
      const canvas = await toCanvas(element, {
        quality: 1,
        pixelRatio: 2, // Pour la netteté
        backgroundColor: '#ffffff',
        style: {
          borderRadius: '0' // On force les coins carrés
        }
      });

      const imgData = canvas.toDataURL('image/png');

      // 2. Calcul des dimensions PDF
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('CV_Florent_Martinier.pdf');

    } catch (error) {
      console.error('Erreur lors de la génération du PDF', error);
    }
  }
}
