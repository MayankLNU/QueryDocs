import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {
  constructor(private fileService: FileUploadService, private router: Router) {}

  canActivate(): boolean {
    if (this.fileService.hasFile()) {
      return true;
    } else {
      alert('Please upload a file before accessing the chat.');
      this.router.navigate(['/']);
      return false;
    }
  }
}
