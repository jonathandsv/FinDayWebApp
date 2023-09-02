import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'oasis-pagination',
  templateUrl: './oasis-pagination.component.html',
  styleUrls: ['./oasis-pagination.component.scss']
})
export class OasisPaginationComponent implements OnInit {

  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalRecords: number = 0;

  @Output() pageChanged = new EventEmitter<PageChangedEvent>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onPageChanged(event: PageChangedEvent): void {
    this.pageChanged.emit(event);
  }

  onPageSizeChanged(): void {
    this.pageSizeChanged.emit(this.pageSize);
  }

  get firstRecord(): number {
    return ((this.page - 1) * this.pageSize) + 1;
  }

  get lastRecord(): number {
    const last = this.page * this.pageSize;
    return last > this.totalRecords ? this.totalRecords : last;
  }

  get isRecordsEmpty(): boolean {
    return !this.totalRecords || this.totalRecords === 0;
  }

}
