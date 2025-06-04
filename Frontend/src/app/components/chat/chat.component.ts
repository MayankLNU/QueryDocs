import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput = '';
  messages: { sender: string, text: string }[] = [];

  constructor(private router: Router, private fileService: FileUploadService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ sender: 'user', text: this.userInput });
      this.messages.push({ sender: 'bot', text: 'Processing your question...' });
      this.userInput = '';
    }
  }

  endChat() {
    this.fileService.clearFile();
    this.router.navigate(['/']);
  }
}
