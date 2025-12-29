import { RCPService } from "@/service/rcp.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { IFindPagingRCP, IUpdateRCP, IViewRCP } from "@/models/rcp/rcp.models";
import { PaginatorState } from "primeng/paginator";
import { CreateRCP } from "./create/create";
import { UpdateRCP } from "./update/update";


@Component({
    selector: 'app-rcp',
    imports: [...SharedImports, DataTable],
    templateUrl: './rcp.html',
    styleUrl: './rcp.scss'
})
export class RCP extends BaseComponent {
    _rcpService= inject(RCPService);

    searchForm : FormGroup = new FormGroup({
        search: new FormControl(''),
        name: new FormControl(''),
        location: new FormControl(''),
        city: new FormControl(''),
        
    });

    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên rạp chiếu', field: 'name',  headerContainerStyle: 'min-width: 12rem', cellClass: 'cursor-pointer hover:text-blue-800 hover:underline', clickable: true ,cellStyle: 'text-align:center' },
        { header: 'Thành phố/Tỉnh', field: 'city', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Quận/Huyện', field: 'location', headerContainerStyle: 'min-width: 20rem', cellStyle: 'text-align:center' },
        { header: 'Địa chỉ', field: 'district', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },

        { header: 'Số lượng phòng chiếu', field: 'soLuongPhongChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Url ảnh rạp chiếu', field: 'urlAnhCinema',cellViewType: CellViewTypes.LINK_BLANK,headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center'},
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'}
    ];

    data: IViewRCP[] = [];
    query: IFindPagingRCP = {
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
        this._rcpService.findPaging({...this.query,...this.searchForm.value}).subscribe({
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
    navigateToDetail(rcp: IViewRCP) {
        //console.log('Navigating with:', danhBa?.id);
        if (rcp?.id) {
            this.router.navigate(['/rcp-management/room'], {
                queryParams: {
                     id: rcp.id  
            }
        });
    }
    }




    onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) +1;
        this.getData();
    }
    onCustomEmit(data: { type: string; data: IViewRCP; field?: string }) {
       
    
    }

    onOpenCreate(){
        const ref = this._dialogService.open(CreateRCP, { header: 'Thêm mới rạp chiếu phim', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false });
                ref.onClose.subscribe((result) => {
                    if (result) {
                            this.getData();
                    }
            });
    }

    onOpenUpdate(data: IViewRCP){
        const ref = this._dialogService.open(UpdateRCP, { header: 'Cập nhật thông tin rạp chiếu phim', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false , data: data});
                ref.onClose.subscribe((result) => {
                    if (result) {
                            this.getData();
                    }
            });
    }

    onDelete(data: IViewRCP) {
                this.confirmDelete(
                    {
                        header: 'Bạn chắc chắn muốn xóa rạp chiếu phim này?',
                        message: 'Không thể khôi phục sau khi xóa'
                    },
                    () => {
                        this._rcpService.delete(data.id || 0).subscribe(
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