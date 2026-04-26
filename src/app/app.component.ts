import { NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toJpeg } from 'html-to-image';
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
      const dataUrl = await toJpeg(element, {
        quality: 0.85,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        // ON FORCE LES BORDS CARRÉS ICI
        style: {
          borderRadius: '0',
          transform: 'none'
        }
      });
  
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
  
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // CALCUL DU RATIO POUR ÉVITER LA COUPURE
      // On calcule la hauteur proportionnelle à la largeur A4 (210mm)
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // Si ton CV est plus long qu'une page A4 (297mm), 
      // on doit dire au PDF de s'adapter ou d'ajouter une page.
      // Pour un CV d'une seule page longue :
      const finalPdfHeight = pdfHeight > 297 ? pdfHeight : 297;
      
      // On crée un PDF à la taille exacte du contenu pour ne rien couper
      const customPdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [pdfWidth, finalPdfHeight]
      });
  
      customPdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      customPdf.save('CV_Florent_Martinier.pdf');
  
    } catch (error) {
      console.error('Erreur génération PDF:', error);
    }
  }
}
