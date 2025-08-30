import { Component, OnInit, HostListener } from '@angular/core';
import { FuzzySearchResult, PersonDecisionRequest, PersonMatch } from '../../../models/aml-customer.model';
import { AmlCustomerService } from '../../../services/aml-customer/aml-customer.service';
import { WizardService } from '../../../services/aml-customer/wizard.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { ExportService } from '../../../services/export/export.service';

@Component({
    selector: 'app-person-match-list',
    templateUrl: './person-match-list.component.html',
    styleUrl: './person-match-list.component.scss',
    standalone: false
})
export class PersonMatchListComponent implements OnInit {


  constructor(private wizaredService: WizardService, private toastr: ToastrService, private router: Router, private amlService: AmlCustomerService, private exportSvc: ExportService) {
  }
  selectedDetails: any = null;
  modalVisible = false;


  // @HostListener('window:keydown', ['$event'])
  // onKeydown(event: KeyboardEvent) {
  //   const isF5 = event.key === 'F5';
  //   const isCtrlR = event.ctrlKey && event.key.toLowerCase() === 'r';

  //   if (this.hasPendingData && (isF5 || isCtrlR)) {
  //     event.preventDefault();
  //     this.showReloadModal = true;
  //     this.mssage = `Are you sure you want to Reload This Data,  all data will be cleared and back to step 1??`;
  //   }
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: BeforeUnloadEvent) {
  //   if (this.hasPendingData) {
  //     // This text won't always show; the browser shows its own standard message
  //     // This text won't always show; the browser shows its own standard message
  //     const confirmationMessage =
  //       'You have unsaved changes. Are you sure you want to leave?';
  //     event.returnValue = confirmationMessage;
  //     return confirmationMessage;

  //   }
  //   return undefined;
  // }
  expanded = new Set<number>();


  /** User confirmed they want to discard data */
  onReloadConfirm() {
    this.showReloadModal = false;
    this.hasPendingData = false;

    // Redirect back to Step 1
    this.router.navigate(['/main/customer-register/wizard/step/1']);
  }

  /** User decided to stay on the page */
  onReloadCancel() {
    this.showReloadModal = false;
    this.hasPendingData = true;
    // keep hasPendingData=true
  }
  // Tracks whether there’s unsaved input
  hasPendingData = true;
  fuzzySearchRes!: FuzzySearchResult;

  isLoading = false;
  mssage!: string;
  loadingMap: Record<number, boolean> = {};

  // Confirmation state
  showConfirmModal = false;
  showReloadModal = false;
  confirmType: 'Accept' | 'Reject' = 'Accept';
  selectedRaw: PersonMatch | undefined;


  trackByMatchId(index: number, match: any) {
    return match.id;
  }

  ngOnInit() {
    this.loadMatches();

  }
  loadMatches() {

    //  this.exportSvc.downloadPdf('165').subscribe(console.log);
    this.fuzzySearchRes = this.wizaredService.getPersonMatches();

  }

  getScoreClasses(score: number): string {
    if (score > 0.6) {
      return 'bg-red-500 text-white';
    } else if (score >= 0.4) {
      return 'bg-yellow-400 text-gray-800';
    } else {
      return 'bg-green-500 text-white';
    }
  }
  formatPct(score: number): string {
    return `${Math.round(score * 100)}%`;
  }

  /** Open the confirm modal */
  openConfirm(type: 'Accept' | 'Reject', match: PersonMatch) {
    this.confirmType = type;
    this.selectedRaw = match;
    this.showConfirmModal = true;
    this.mssage = `Are you sure you want to ${type} [${this.selectedRaw?.first_name} - ${this.selectedRaw?.first_name}] as sanction person?`;
  }



  private setLoading(id: number, isLoading: boolean) {
    // this.loadingMap[id] = isLoading;
  }
  handleCancel() {
    this.showConfirmModal = false;
    this.selectedRaw = undefined;
  }
  handleConfirm(note: string) {

    if (!this.selectedRaw) return;

    const status = this.confirmType === 'Accept' ? 'accepted' : 'rejected';

    const { id } = this.selectedRaw;
    this.showConfirmModal = false;
    const payload: PersonDecisionRequest = {
      person: this.selectedRaw.id,
      audit_id: this.fuzzySearchRes.audit_id,
      total_score: this.selectedRaw.total_score,
      action: status,
      note: note
    };

    this.amlService.createPersonDecision(payload).pipe(
      // on success
      tap(response => {
        this.toastr.success(
          `Decision Saved Succfully`,
          'Saved',
          { timeOut: 2000 }
        );

        // update only this row’s status in the UI
        this.selectedRaw!.status = response.data.status;
      }),

      // on error
      catchError(err => {
        const msg = err?.error?.detail
          || err?.message
          || 'Unknown error';
        this.toastr.error(msg, 'Failed to save');
        return EMPTY;
      })
    ).subscribe();


  }


  // Call this when the user completes or cancels the wizard
  markDataAsSaved() {
    this.hasPendingData = false;
  }

  toggleExpand(row: any): void {
    if (this.expanded.has(row.id)) {
      // If already expanded, collapse it
      this.expanded.delete(row.id);
    } else {
      // Collapse all others, then expand this row
      this.expanded.clear();
      this.expanded.add(row.id);
    }
  }


  openModal(details: any) {
    this.selectedDetails = details;
    this.modalVisible = true;
  }
}
