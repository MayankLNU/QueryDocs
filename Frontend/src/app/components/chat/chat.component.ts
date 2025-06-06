import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput: string = '';
  messages: { sender: 'user' | 'bot', text: string }[] = [];
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const prompt = this.userInput.trim();
    this.messages.push({ sender: 'user', text: prompt });

    this.http.post<{ answer: string, message: string }>('http://127.0.0.1:5000/prompt', { prompt })
      .subscribe({
        next: (res) => {
          this.messages.push({ sender: 'bot', text: res.answer });
        },
        error: (err) => {
          this.messages.push({ sender: 'bot', text: 'Error: Could not get response.' });
          console.error(err);
        }
      });

    this.userInput = '';
  }
}
