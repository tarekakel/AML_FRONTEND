import { Component, OnInit } from '@angular/core';
import { RequestItem, ResultItem } from '../../../models/sanction-list.model';
import { debounceTime, Subject } from 'rxjs';
import { SanctionSearchResultService } from '../../../services/sanction-search-result/sanction-search-result.service';
import { ApiResponse, PaginationLinks, PaginationMeta } from '../../../models/shared';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ExportService } from '../../../services/export/export.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '../../../shared/helper/helper';
import { AUDIT_REPORT_ALL_CODE } from '../../../shared/constant';

@Component({
    selector: 'app-search-list-view',
    templateUrl: './search-list-view.component.html',
    styleUrl: './search-list-view.component.scss',
    standalone: false
})
export class SearchListViewComponent implements OnInit {
  rows: RequestItem[] = [];

  meta: PaginationMeta = { page: 1, perPage: 10, total: 0, totalPages: 0 };
  links: PaginationLinks = { next: null, prev: null };
  // Track which rows are expanded
  expanded = new Set<number>();
  private searchTerms = new Subject<string>();
  searchTerm = '';
  startdate!: Date;
  enddate!: Date;
  isLoading = false;
  constructor(private service: SanctionSearchResultService, private exportService: ExportService, private toaster: ToastrService) {


    this.enddate = new Date(); // today
    this.startdate = new Date();
    this.startdate.setDate(this.enddate.getDate() - 10); // 10 days before today
  }
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'custom-datepicker',
    dateInputFormat: 'DD/MM/YYYY'
  };



  ngOnInit(): void {
    this.loadPage();

    // debounce search input
    this.searchTerms.pipe(debounceTime(300)).subscribe(term => {
      this.meta.page = 1;
      this.loadPage();
    });
  }
  trackByRowId(index: number, row: any) {
    return row.id;
  }
  trackByChildId(index: number, child: any) {
    return child.id;
  }
  loadPage(page: number = this.meta.page): void {
    this.isLoading = true;
    this.service
      .fetchSanctionSearchResult(page, this.meta.perPage, this.searchTerm, this.startdate, this.enddate)
      .subscribe((resp: ApiResponse<RequestItem[]>) => {


        this.rows = resp.data.map(audit => ({
          ...audit,
          results: audit.results
            .slice()                            // copy avoid mutation
            .sort((a, b) => b.total_score - a.total_score) // desc
        }));


        this.meta = resp.meta;
        this.links = resp.links;
        // collapse all when new data arrives
        this.expanded.clear();
        this.isLoading = false;
      });
  }

  onSearch(term: any): void {
    this.searchTerm = term.trim();
    this.searchTerms.next(this.searchTerm);
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


  prevPage(): void {
    if (this.meta.page > 1) {
      this.loadPage(this.meta.page - 1);
    }
  }

  nextPage(): void {
    if (this.meta.page < this.meta.totalPages) {
      this.loadPage(this.meta.page + 1);
    }
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
  getStatusBadgeClasses(status: string): string {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  onSearchChange() {
    this.meta.page = 1;
    this.loadPage();
  }

  exportAll(audit_id: number | null) {
    this.exportService.downloadAuditReport(this.startdate, this.enddate, AUDIT_REPORT_ALL_CODE, audit_id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-report-${formatDate(this.startdate)}_to_${formatDate(this.enddate)}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.log(err);

        this.toaster.error(`Error downloading report ${err}`, 'Error');
      }
    });
  }
  applyFilters() {
    this.loadPage();
  }
}
