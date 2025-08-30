import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { ApiResponse, LookupMaster } from '../../models/shared';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService extends TitleStrategy {
  private masterEndpoint = 'masters/';

  constructor(private api: ApiService, private title: Title) {
    super();

  }



  getMasters(): Observable<ApiResponse<LookupMaster>> {


    return this.api.get<ApiResponse<LookupMaster>>(this.masterEndpoint);

  }

  override updateTitle(snapshot: RouterStateSnapshot): void {

    // console.log('snapshot', snapshot);

    const pageTitle = this.buildTitle(snapshot);
    // console.log('pageTitle', pageTitle);
    this.title.setTitle(pageTitle ? `AML | ${pageTitle}` : 'AML |');
  }

}
