import { HangService } from "@/service/hang.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { IFindPagingHang, IViewHang } from "@/models/kho/hang.models";
import { PaginatorState } from "primeng/paginator";
import { CreateHang } from "./create/create";
import { UpdateHang } from "./update/update";


@Component({
    selector: 'app-hang',
    imports: [...SharedImports, DataTable],
    templateUrl: './hang.html',
    styleUrl: './hang.scss'
})

export class Hang extends BaseComponent{
    _hangService = inject(HangService);
    searchForm : FormGroup = new FormGroup({
        search: new FormControl(''),
       
        
    });

    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên hàng', field: 'tenMon',  headerContainerStyle: 'min-width: 12rem', cellClass: 'cursor-pointer hover:text-blue-800 hover:underline', clickable: true ,cellStyle: 'text-align:center' },
        { header: 'Mô tả', field: 'moTa', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
               
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'}
    ];

    data: IViewHang[] = [];
    query: IFindPagingHang = {
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
        this._hangService.findPaging({...this.query,...this.searchForm.value}).subscribe({
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
    onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) +1;
        this.getData();
    }
    onCustomEmit(data: { type: string; data: IViewHang; field?: string }) {
            if (data.type === TblActionTypes.delete) {
                this.onDelete(data.data);
            } else if (data.type === TblActionTypes.update) {
                this.onOpenUpdate(data.data);
            } 
    }
    onOpenCreate(){
            const ref = this._dialogService.open(CreateHang, { header: 'Thêm mới hàng', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false });
                    ref.onClose.subscribe((result) => {
                        if (result) {
                                this.getData();
                        }
                });
        }
    
        onOpenUpdate(data: IViewHang){
            const ref = this._dialogService.open(UpdateHang, { header: 'Cập nhật thông tin hàng', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false , data: data});
                    ref.onClose.subscribe((result) => {
                        if (result) {
                                this.getData();
                        }
                });
        }
    
        onDelete(data: IViewHang) {
                    this.confirmDelete(
                        {
                            header: 'Bạn chắc chắn muốn xóa mặt hàng này?',
                            message: 'Không thể khôi phục sau khi xóa'
                        },
                        () => {
                            this._hangService.delete(data.id || 0).subscribe(
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

