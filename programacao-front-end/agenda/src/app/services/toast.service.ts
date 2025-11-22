import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: ToastItem[] = [];
  private subject = new BehaviorSubject<ToastItem[]>([]);
  toasts$ = this.subject.asObservable();
  private counter = 0;
  show(message: string, type: ToastType = 'info', duration = 4000) {
    const id = ++this.counter;
    const t: ToastItem = { id, type, message };
    this.toasts.push(t);
    this.subject.next(this.toasts.slice());
    setTimeout(() => this.remove(id), duration);
  }
  showSuccess(message: string, duration = 3000) {
    this.show(message, 'success', duration);
  }
  showError(message: string, duration = 5000) {
    this.show(message, 'error', duration);
  }
  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.subject.next(this.toasts.slice());
  }
  clear() {
    this.toasts = [];
    this.subject.next(this.toasts.slice());
  }
}
