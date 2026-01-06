import { MenuService } from "@/service/menu.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PaginatorState } from "primeng/paginator";
import { ActivatedRoute } from "@angular/router";
import { IFindPagingMonByIdThucDon, IViewMonByIdThucDon, IGetMenuById } from "@/models/menu/menu.models";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { MenuStatuses } from "@/shared/constants/menu.constants";
import { CreateMonVaoMenu } from "./create/create";
import { UpdateMonVaoMenu } from "./update/update";


@Component({
    selector: 'app-chi-tiet-menu',
    imports: [...SharedImports, DataTable],
    templateUrl: './chi-tiet.html',
    styleUrl: './chi-tiet.scss'
})
export class ChiTietMenu extends BaseComponent {
    _menuService = inject(MenuService);
    _route = inject(ActivatedRoute);
    
    menuId: number = 0;
    menuInfo?: IGetMenuById;
    MenuStatuses = MenuStatuses;
    
    searchForm: FormGroup = new FormGroup({
        search: new FormControl(''),
    });

    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên món', field: 'mon.name', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Mô tả', field: 'mon.moTa', headerContainerStyle: 'min-width: 15rem', cellStyle: 'text-align:center' },
        { header: 'Giá', field: 'gia', headerContainerStyle: 'min-width: 10rem', cellStyle: 'text-align:center' },
        { header: 'Số lượng', field: 'soLuong', headerContainerStyle: 'min-width: 8rem', cellStyle: 'text-align:center' },
        { 
            header: 'Trạng thái', 
            field: 'trangThaiText', 
            headerContainerStyle: 'min-width: 8rem', 
            cellViewType: CellViewTypes.STATUS,
            statusSeverityFunction: (rowData: IViewMonByIdThucDon) => {
                return MenuStatuses.getSeverity(rowData.trangThai ?? 0);
            }
        },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction, cellStyle: 'text-align:center' },
    ];

    data: IViewMonByIdThucDon[] = [];
    query: IFindPagingMonByIdThucDon = {
        pageNumber: 1,
        pageSize: this.MAX_PAGE_SIZE,
        idThucDon: 0
    };

    override ngOnInit(): void {
        this._route.queryParams.subscribe(params => {
            this.menuId = Number(params['id']) || 0;
            if (this.menuId) {
                this.query.idThucDon = this.menuId;
                this.getMenuInfo();
                this.getData();
            }
        });
    }

    getMenuInfo() {
        this._menuService.getById(this.menuId).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, false)) {
                    this.menuInfo = res.data;
                }
            },
            error: (err) => {
                this.messageError(err?.message);
            }
        });
    }

    onSearch() {
        this.query.pageNumber = 1;
        this.getData();
    }

    getData() {
        this.loading = true;

        this._menuService.findPagingMonByThucDon({
            ...this.query,
            keyword: this.searchForm.value.search || ''
        }).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, false)) {
                    this.data = res.data?.items || [];
                    this.totalRecords = res.data?.totalItems || 0;
                } else {
                    this.data = [];
                    this.totalRecords = 0;
                }
            },
            error: () => {
                this.data = [];
                this.totalRecords = 0;
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

    onCustomEmit(data: { type: string; data: IViewMonByIdThucDon; field?: string }) {
        if (data.type === TblActionTypes.delete) {
            this.onDelete(data.data);
        } else if (data.type === TblActionTypes.update) {
            this.onOpenUpdate(data.data);
        }
    }

    onOpenCreate() {
        const ref = this._dialogService.open(CreateMonVaoMenu, { 
            header: 'Thêm mới món vào menu', 
            closable: true, 
            modal: true, 
            styleClass: 'w-[600px]', 
            focusOnShow: false,
            data: { idThucDon: this.menuId }
        });
        ref.onClose.subscribe((result) => {
            if (result) {
                this.getData();
            }
        });
    }

    onOpenUpdate(data: IViewMonByIdThucDon) {
        const ref = this._dialogService.open(UpdateMonVaoMenu, { 
            header: 'Cập nhật thông tin món trong menu', 
            closable: true, 
            modal: true, 
            styleClass: 'w-[600px]', 
            focusOnShow: false, 
            data: { data, idThucDon: this.menuId }
        });
        ref.onClose.subscribe((result) => {
            if (result) {
                this.getData();
            }
        });
    }

    onDelete(data: IViewMonByIdThucDon) {
        this.confirmDelete(
            {
                header: 'Bạn chắc chắn muốn xóa món khỏi menu này?',
                message: 'Không thể khôi phục sau khi xóa'
            },
            () => {
                this._menuService.deleteMonKhoiMenu(data.id || 0).subscribe(
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