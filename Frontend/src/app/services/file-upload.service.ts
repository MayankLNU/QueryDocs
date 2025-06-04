import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private file: File | null = null;

  setFile(file: File) {
    this.file = file;
    sessionStorage.setItem('fileUploaded', 'true');
  }

  getFile(): File | null {
    return this.file;
  }

  hasFile(): boolean {
    return sessionStorage.getItem('fileUploaded') === 'true';
  }

  clearFile() {
    this.file = null;
    sessionStorage.removeItem('fileUploaded');
  }
}
