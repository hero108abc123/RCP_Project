import { PhimService } from '@/service/movie.service';
import { DataTable } from '@/shared/components/data-table/data-table';
import { CellViewTypes } from '@/shared/constants/data-table.constants';
import { SharedImports } from '@/shared/import.shared';
import { IColumn } from '@/shared/models/data-table.models';
import { Component, inject, ViewChild } from '@angular/core';
import { TblAction, TblActionTypes } from './tbl-action/tbl-action';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { CreatePhim } from './create/create';
import { IFindPagingPhim, IViewPhim, IGetDropDownTheLoai } from '@/models/movie/movie.models';
import { UpdatePhim } from './update/update';
import { PhanLoaiDoTuoiStatuses, DangChieuStatuses, NgonNguStatuses } from '@/shared/constants/movie.constants';
import { BaseComponent } from '@/shared/components/base/base-component';
import { Utils } from '@/shared/utils';
import { Popover } from 'primeng/popover';

@Component({
    selector: 'app-movie-management',
    imports: [...SharedImports, DataTable, Popover],
    templateUrl: './movie-management.html',
    styleUrl: './movie-management.scss'
})
export class MovieManagement extends BaseComponent {
    @ViewChild('filterPanel') filterPanel!: Popover;
    
    _movieService = inject(PhimService);
    private route = inject(ActivatedRoute);

    listTheLoai: IGetDropDownTheLoai[] = [];

    phanLoaiDoTuoiOptions = [
        { value: 'P', label: 'P - Mọi lứa tuổi' },
        { value: 'K', label: 'K - Trẻ em có phụ huynh' },
        { value: 'T13', label: 'T13 - Từ 13 tuổi' },
        { value: 'C13', label: 'C13 - Từ 13 tuổi' },
        { value: 'T16', label: 'T16 - Từ 16 tuổi' },
        { value: 'C16', label: 'C16 - Từ 16 tuổi' },
        { value: 'T18', label: 'T18 - Từ 18 tuổi' },
        { value: 'C18', label: 'C18 - Từ 18 tuổi' },
        { value: 'C', label: 'C - Cấm chiếu' }
    ];

    ngonNguOptions = NgonNguStatuses.getAllLanguages();

    dangChieuOptions = [
        { value: 2, label: 'Chưa chiếu' },
        { value: 3, label: 'Đang chiếu' },
        { value: 1, label: 'Đã chiếu' }
    ];

    searchForm: FormGroup = new FormGroup({
        search: new FormControl(''),
        idTheLoai: new FormControl([]),
        dangChieu: new FormControl(null),
        ngonNgu: new FormControl(''),
        phanLoaiDoTuoi: new FormControl([]),
        daoDien: new FormControl(''),
        dienVien: new FormControl(''),
        tuNgay: new FormControl(null),
        denNgay: new FormControl(null)
    });

    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên phim', field: 'tenPhim', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Mô tả', field: 'moTa', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Đạo diễn', field: 'daoDien', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Diễn viên', field: 'dienVien', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thời lượng (phút)', field: 'thoiLuongPhut', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Ngày khởi chiếu', field: 'ngayKhoiChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Ngôn ngữ', field: 'ngonNgu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { 
            header: 'Phân loại độ tuổi', 
            field: 'phanLoaiDoTuoiText', 
            headerContainerStyle: 'min-width: 12rem', 
            cellViewType: CellViewTypes.STATUS, 
            statusSeverityFunction: (rowData: IViewPhim) => {
                return PhanLoaiDoTuoiStatuses.getSeverity(rowData.phanLoaiDoTuoi ?? '');
            }
        },
        { header: 'Thể loại', field: 'theLoaiText', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { 
            header: 'Đang chiếu', 
            field: 'dangChieuText', 
            headerContainerStyle: 'min-width: 12rem', 
            cellViewType: CellViewTypes.STATUS, 
            statusSeverityFunction: (rowData: IViewPhim) => {
                return DangChieuStatuses.getSeverity(rowData.dangChieu ?? 0);
            }
        },
        { header: 'Url poster phim', field: 'anhBia', cellViewType: CellViewTypes.LINK_BLANK, headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Url trailer phim', field: 'trailerUrl', cellViewType: CellViewTypes.LINK_BLANK, headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction, cellStyle: 'text-align:center' }
    ];

    data: IViewPhim[] = [];
    query: IFindPagingPhim = {
        pageNumber: 1,
        pageSize: this.MAX_PAGE_SIZE,
    };

    override ngOnInit(): void {
        this.getListTheLoai();
        this.getData();
    }

    onSearch() {
        this.query.pageNumber = 1;
        this.getData();
        this.filterPanel.hide();
    }

    getData() {
        this.loading = true;
        this._movieService.findPaging({
            ...this.query,
            keyword: this.searchForm.value.search || '',
            idTheLoai: this.searchForm.value.idTheLoai && this.searchForm.value.idTheLoai.length > 0 ? this.searchForm.value.idTheLoai : undefined,
            dangChieu: this.searchForm.value.dangChieu || undefined,
            ngonNgu: this.searchForm.value.ngonNgu || undefined,
            phanLoaiDoTuoi: this.searchForm.value.phanLoaiDoTuoi && this.searchForm.value.phanLoaiDoTuoi.length > 0 ? this.searchForm.value.phanLoaiDoTuoi : undefined,
            daoDien: this.searchForm.value.daoDien || undefined,
            dienVien: this.searchForm.value.dienVien || undefined,
            tuNgay: this.searchForm.value.tuNgay ? Utils.formatDateCallApi(this.searchForm.value.tuNgay) : undefined,
            denNgay: this.searchForm.value.denNgay ? Utils.formatDateCallApi(this.searchForm.value.denNgay) : undefined
        }).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, false)) {
                    this.data = res.data.items.map((item: IViewPhim) => ({
                        ...item,
                        phanLoaiDoTuoiText: PhanLoaiDoTuoiStatuses.getLabel(item.phanLoaiDoTuoi ?? ''),
                        dangChieuText: DangChieuStatuses.getLabel(item.dangChieu ?? 0),
                        theLoaiText: item.theLoais?.map(tl => tl.tenTheLoai).join(', ') ?? ''
                    }));
                    this.totalRecords = res.data.totalItems;
                }
            }
        })
        .add(() => {
            this.loading = false;
        });
    }

    onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) + 1;
        this.getData();
    }

    onCustomEmit(data: { type: string; data: IViewPhim; field?: string }) {
        if (data.type === TblActionTypes.delete) {
            this.onDelete(data.data);
        } else if (data.type === TblActionTypes.update) {
            this.onOpenUpdate(data.data);
        }
    }

    onOpenCreate() {
        const ref = this._dialogService.open(CreatePhim, { 
            header: 'Thêm mới phim', 
            closable: true, 
            modal: true, 
            styleClass: 'w-[600px]', 
            focusOnShow: false 
        });
        ref.onClose.subscribe((result) => {
            if (result) {
                this.getData();
            }
        });
    }

    onOpenUpdate(data: IViewPhim) {
        const ref = this._dialogService.open(UpdatePhim, { 
            header: 'Cập nhật thông tin phim', 
            closable: true, 
            modal: true, 
            styleClass: 'w-[600px]', 
            focusOnShow: false, 
            data: data 
        });
        ref.onClose.subscribe((result) => {
            if (result) {
                this.getData();
            }
        });
    }

    onDelete(data: IViewPhim) {
        this.confirmDelete(
            {
                header: 'Bạn chắc chắn muốn xóa thông tin phim này?',
                message: 'Không thể khôi phục sau khi xóa'
            },
            () => {
                this._movieService.delete(data.id || 0).subscribe(
                    (res) => {
                        if (this.isResponseSucceed(res, true, 'Đã xóa')) {
                            this.getData();
                        }
                    },
                    (err) => {
                        this.messageError(err?.message);
                    }
                );
            }
        );
    }

    getListTheLoai() {
        this._movieService.getTheLoai().subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    this.listTheLoai = res.data || [];
                }
            },
            error: (err) => {
                this.messageError(err?.message);
            }
        });
    }
}