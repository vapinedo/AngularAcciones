import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastrSvc: ToastrService) { }

  success(message?: string): ActiveToast<any> {
    const msg = message ? message : 'Reigstro creado exitosamente';
    return this.toastrSvc.success(msg);
  }

  error(message: string): ActiveToast<any> {
    return this.toastrSvc.error(message);
  }
}