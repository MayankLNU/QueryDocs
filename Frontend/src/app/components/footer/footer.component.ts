import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-light text-center text-muted py-3 mt-5">
      <div class="container">
        <small>&copy; 2025 SmartDoc Chatbot. All rights reserved.</small>
      </div>
    </footer>
  `
})
export class FooterComponent {}
