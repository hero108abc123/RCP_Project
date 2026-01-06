import { MonService } from "@/service/mon.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { IFindPagingMon, IViewMon } from "@/models/menu/mon.models";
import { PaginatorState } from "primeng/paginator";

import { LoaiMonStatuses } from "@/shared/constants/mon.constants";
import { CreateMon } from "./create/create";
import { UpdateMon } from "./update/update";

@Component({
    selector: 'app-mon',
    imports: [...SharedImports, DataTable],
    templateUrl: './mon.html',
    styleUrl: './mon.scss'
})

export class Mon extends BaseComponent {
    _monService = inject(MonService);

    searchForm: FormGroup = new FormGroup({
        search: new FormControl('')
    });

    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên món', field: 'name', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Mô tả', field: 'moTa', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Số lượng', field: 'soLuong', headerContainerStyle: 'min-width: 10rem', cellStyle: 'text-align:center' },
        { 
            header: 'Loại', 
            field: 'loaiText', 
            headerContainerStyle: 'min-width: 10rem', 
            cellViewType: CellViewTypes.STATUS,
            statusSeverityFunction: (rowData: IViewMon) => {
                return LoaiMonStatuses.getSeverity(rowData.loai ?? 0);
            }
        },
        { header: 'Ảnh minh họa', field: 'anhMinhHoa', cellViewType: CellViewTypes.LINK_BLANK, headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction, cellStyle: 'text-align:center' }
    ];

    data: IViewMon[] = [];
    query: IFindPagingMon = {
        pageNumber: 1,
        pageSize: this.MAX_PAGE_SIZE,
    };

    override ngOnInit(): void {
        this.getData();
    }

    onSearch() {
        this.getData();
    }

    getData() {
        this.loading = true;
        this._monService.findPaging({ ...this.query, ...this.searchForm.value }).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, false)) {
                    this.data = res.data.items.map((item: IViewMon) => ({
                        ...item,
                        loaiText: LoaiMonStatuses.getLabel(item.loai ?? 0)
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

    onCustomEmit(data: { type: string; data: IViewMon; field?: string }) {
        if (data.type === TblActionTypes.delete) {
            this.onDelete(data.data);
        } else if (data.type === TblActionTypes.update) {
            this.onOpenUpdate(data.data);
        }
    }

    onOpenCreate() {
        const ref = this._dialogService.open(CreateMon, { header: 'Thêm mới món', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false });
        ref.onClose.subscribe((result) => {
            if (result) {
                this.getData();
            }
        });
    }

    onOpenUpdate(data: IViewMon) {
        const ref = this._dialogService.open(UpdateMon, { header: 'Cập nhật thông tin món', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false, data: data });
        ref.onClose.subscribe((result) => {
            if (result) {
                this.getData();
            }
        });
    }

    onDelete(data: IViewMon) {
        this.confirmDelete(
            {
                header: 'Bạn chắc chắn muốn xóa món này?',
                message: 'Không thể khôi phục sau khi xóa'
            },
            () => {
                this._monService.delete(data.id || 0).subscribe(
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
}