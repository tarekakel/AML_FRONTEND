import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/shared';
import { RequestItem, ResultItem } from '../../models/sanction-list.model';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../api.service';
import { formatDate } from '../../shared/helper/helper';

@Injectable({
  providedIn: 'root'
})
export class SanctionSearchResultService {

  constructor(private api: ApiService) { }
  private readonly endpoint = 'sanctions/search-view/';
  fetchSanctionSearchResult(
    page: number,
    perPage: number,
    search: string = '',
    startdate:Date,
    enddate:Date,
  ): Observable<ApiResponse<RequestItem[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('start_date', formatDate(startdate))
      .set('end_date', formatDate(enddate));

    if (search) {
      params = params.set('search', search);
    }

    return this.api.get<ApiResponse<RequestItem[]>>(this.endpoint, params);
  }

}
