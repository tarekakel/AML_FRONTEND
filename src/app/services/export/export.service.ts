import { HttpResponse, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, map, throwError } from 'rxjs';
import { ApiService } from '../api.service';
import { formatDate } from '../../shared/helper/helper';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private apiService: ApiService) { }

  private endpoint: string = 'reports/audits/export/';

  downloadAuditReport(start: Date, end: Date, code: string, audit_id: number | null) {
    let params = new HttpParams()
      .set('start', formatDate(start))
      .set('end', formatDate(end))
      .set('code', code);
    if (audit_id) {
      params = params.set('audit_id', audit_id.toString());
    }
    return this.apiService.getFiles(this.endpoint, params);
  }

}
