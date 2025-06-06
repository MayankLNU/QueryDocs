import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileUploadService } from '../../services/file-upload.service';

// Declare bootstrap globally if not using TypeScript types
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedFile: File | null = null;
  fileName: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fileService: FileUploadService
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
  }

  submitFile() {
    if (this.selectedFile) {
      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://127.0.0.1:5000/upload', formData).subscribe({
        next: (response) => {
          this.fileService.setFile(this.selectedFile!);

          // Close modal manually
          const modalElement = document.getElementById('uploadModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();
          }

          // Remove leftover backdrop manually
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }

          // Remove 'modal-open' class from body
          document.body.classList.remove('modal-open');

          this.router.navigate(['/chat']);
        },
        error: () => {
          alert('File upload failed. Please try again.');
        },
        complete: () => {
          this.loading = false;
        
          // Reset the file input and related variables
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = ''; // Clear the file input
          }
          this.fileName = ''; // Reset the fileName variable
        }
      });
    } else {
      alert('Please upload a file before proceeding to chat.');
    }
  }
}
