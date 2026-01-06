import { IFindPagingKho, IViewKhoPaging } from "@/models/kho/kho.models";
import { TblAction } from "@/pages/gia-ve/tbl-action/tbl-action";
import { KhoService } from "@/service/kho.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PaginatorState } from "primeng/paginator";
import { TblActionTypes } from "./tbl-action/tbl-action";
import { CreateKho } from "./create/create";
import { UpdateKho } from "./update/update";

@Component({
    selector: 'app-kho',
    imports: [...SharedImports, DataTable],
    templateUrl: './kho.html',
    styleUrl: './kho.scss'
})

export class Kho extends BaseComponent{
    _khoService = inject(KhoService);
    searchForm : FormGroup = new FormGroup({
        search: new FormControl(''),
       
        
    });

    columns: IColumn[] = [
            { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
            { header: 'Tên kho', field: 'tenKho',  headerContainerStyle: 'min-width: 12rem', cellClass: 'cursor-pointer hover:text-blue-800 hover:underline', clickable: true ,cellStyle: 'text-align:center' },
            { header: 'Tên rạp chiếu', field: 'cinema.name', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
           
            { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'}
    ];

    data: IViewKhoPaging[] = [];
    query: IFindPagingKho = {
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
        this._khoService.findPaging({...this.query,...this.searchForm.value}).subscribe({
            next: (res) => {
                if(this.isResponseSucceed(res,false)) {
                    this.data = res.data.items;
                    this.totalRecords = res.data.totalItems;
                }
            }
        })
        .add(() =>{
            this.loading = false;
        })
    }
    navigateToDetail(kho: IViewKhoPaging) {
            //console.log('Navigating with:', danhBa?.id);
            if (kho?.id) {
                this.router.navigate(['/kho-management/kho/chi-tiet'], {
                    queryParams: {
                         id: kho.id  
                }
            });
        }
    }
    onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) +1;
        this.getData();
    }
    onCustomEmit(data: { type: string; data: IViewKhoPaging; field?: string }) {
            if (data.type === TblActionTypes.detail) {
                this.navigateToDetail(data.data); 
            } else if (data.type === TblActionTypes.delete) {
                this.onDelete(data.data);
            } else if (data.type === TblActionTypes.update) {
                this.onOpenUpdate(data.data);
            } else if (data.type === 'cellClick' && data.field === 'tenKho') {
                this.navigateToDetail(data.data); 
            }
    }
    onOpenCreate(){
            const ref = this._dialogService.open(CreateKho, { header: 'Thêm mới kho', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false });
                    ref.onClose.subscribe((result) => {
                        if (result) {
                                this.getData();
                        }
                });
        }
    
        onOpenUpdate(data: IViewKhoPaging){
            const ref = this._dialogService.open(UpdateKho, { header: 'Cập nhật thông tin kho', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false , data: data});
                    ref.onClose.subscribe((result) => {
                        if (result) {
                                this.getData();
                        }
                });
        }
    
        onDelete(data: IViewKhoPaging) {
                    this.confirmDelete(
                        {
                            header: 'Bạn chắc chắn muốn xóa kho này?',
                            message: 'Không thể khôi phục sau khi xóa'
                        },
                        () => {
                            this._khoService.delete(data.id || 0).subscribe(
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