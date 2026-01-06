import { MenuService } from "@/service/menu.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PaginatorState } from "primeng/paginator";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { IFindPagingMenu, IViewMenu } from "@/models/menu/menu.models";
import { CreateMenu } from "./create/create";
import { UpdateMenu } from "./update/update";


@Component({
    selector: 'app-menu',
    imports: [...SharedImports, DataTable],
    templateUrl: './menu.html',
    styleUrl: './menu.scss'
})
export class Menu extends BaseComponent {
    _menuService = inject(MenuService);
    
    searchForm: FormGroup = new FormGroup({
        search: new FormControl(''),
    });

    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên thực đơn', field: 'tenThucDon', headerContainerStyle: 'min-width: 12rem', cellClass: 'cursor-pointer hover:text-blue-800 hover:underline', clickable: true ,cellStyle: 'text-align:center' },
        { header: 'Tên rạp chiếu', field: 'cinema.name', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Tổng số món', field: 'tongSoMon', headerContainerStyle: 'min-width: 10rem', cellStyle: 'text-align:center' },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction, cellStyle: 'text-align:center' },
    ];

    data: IViewMenu[] = [];
    query: IFindPagingMenu = {
        pageNumber: 1,
        pageSize: this.MAX_PAGE_SIZE,
    };

    override ngOnInit(): void {
        this.getData();
    }

    onSearch() {
        this.query.pageNumber = 1;
        this.getData();
    }

    getData() {
    this.loading = true;

    this._menuService.findPaging({
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
    navigateToDetail(menu: IViewMenu) {
                //console.log('Navigating with:', danhBa?.id);
                if (menu?.id) {
                    this.router.navigate(['/menu/menu/chi-tiet'], {
                        queryParams: {
                             id: menu.id  
                    }
                });
            }
        }

    onOpenCreate() {
        const ref = this._dialogService.open(CreateMenu, { 
            header: 'Thêm mới thực đơn', 
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

    onOpenUpdate(data: IViewMenu) {
        const ref = this._dialogService.open(UpdateMenu, { 
            header: 'Cập nhật thông tin thực đơn', 
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

    onDelete(data: IViewMenu) {
        this.confirmDelete(
            {
                header: 'Bạn chắc chắn muốn xóa thông tin thực đơn này?',
                message: 'Không thể khôi phục sau khi xóa'
            },
            () => {
                this._menuService.delete(data.id || 0).subscribe(
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

    onCustomEmit(data: { type: string; data: IViewMenu; field?: string }) {
                if (data.type === TblActionTypes.detail) {
                    this.navigateToDetail(data.data); 
                } else if (data.type === TblActionTypes.delete) {
                    this.onDelete(data.data);
                } else if (data.type === TblActionTypes.update) {
                    this.onOpenUpdate(data.data);
                } else if (data.type === 'cellClick' && data.field === 'tenThucDon') {
                    this.navigateToDetail(data.data); 
                }
        }
}