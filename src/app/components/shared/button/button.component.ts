import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() disabled = false;
  @Input() severity: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' = 'primary';
  @Input() size: 'small' | 'large' | undefined = undefined;
  @Input() icon = '';
  @Input() loading = false;
  @Output() onClick = new EventEmitter<void>();
}