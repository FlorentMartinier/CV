# 📄 Dynamic CV - Florent Martinier

This project is an interactive and PDF-exportable Resume generator, built with **Angular 17** and **Tailwind CSS**. The CV content is entirely driven by a JSON configuration file, allowing for instant updates without modifying the HTML code.

## 🔗 Live Demo
You can view a live example of the rendered project here:  
**[https://cv-florent-martinier.netlify.app/](https://cv-florent-martinier.netlify.app/)**

## 🚀 Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   ng serve
   ```
4. Open your browser at `http://localhost:4200`.

---

## 🛠 Updating the CV Content

All data is stored in the following file: `src/assets/data/cv-data.json`

### JSON Field Documentation

#### 1. `personalInfo` (Identity & Contact)
| Field | Description | Example / Format |
| :--- | :--- | :--- |
| `title` | Resume headline with experience variable. | `"Senior Full Stack Developer, {{years}} years of experience..."` |
| `firstJobDate` | Your career start date (used to calculate `{{years}}`). | `"YYYY-MM-DD"` (e.g., `"2016-02-01"`) |
| `photo` | Path to your profile picture. | `"assets/photo.jpg"` |
| `github` / `website` | Links to your social profiles/portfolio. | `"https://..."` |

#### 2. `experiences` (Work History)
| Field | Description | Format |
| :--- | :--- | :--- |
| `title` | Job title / Position. | `string` |
| `company` | Name of the employer. | `string` |
| `period` | Duration of the mission. | `"MMM YYYY - MMM YYYY" / "Present"` |
| `description` | Key responsibilities and achievements. | `Array<string>` (Rendered as bullet points) |
| `stack` | Technologies used during this experience. | `Array<string>` (Rendered as badges) |

#### 3. `education` (Academic Background)
| Field | Description | Format |
| :--- | :--- | :--- |
| `degree` | Name of the diploma or certification. | `string` |
| `school` | University or school name. | `string` |
| `period` | Years of study. | `"YYYY - YYYY"` |
| `description` | (Optional) Details about the curriculum. | `string` |

#### 4. `projects` (Side Projects)
| Field | Description | Format |
| :--- | :--- | :--- |
| `name` | Project title. | `string` |
| `description` | Brief overview of what the project does. | `string` |
| `link` | URL to the live project or GitHub repo. | `string` |

#### 5. `skills` (General Tech Stack)
| Field | Description | Format |
| :--- | :--- | :--- |
| `skills` | List of core technologies for the sidebar. | `Array<string>` (Rendered as badges) |

---

## 💡 Technical Implementation

### Dynamic Experience Calculation
The `{{years}}` placeholder in the `title` field is dynamically replaced by the Angular component. It calculates the number of years between the current date and the `firstJobDate` defined in the JSON.

### PDF Generation
The project uses `html-to-image` and `jsPDF`. To ensure a low file size (< 2MB), the PDF is generated using 85% JPEG compression.

> [!IMPORTANT]  
> **Note on Responsive Design:** This project is specifically designed and optimized for **Desktop screens**. The layout and PDF export functionality are tailored for a computer-based viewing experience to maintain the integrity of a professional A4 resume format. It is not intended for mobile screen usage.

---

## 🎨 Design Customization
The UI is styled with **Tailwind CSS**. You can update the main colors in `src/app/cv/cv.component.html` by changing utility classes (e.g., `bg-slate-800`).