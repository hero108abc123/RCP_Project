import { IFindPagingByIdKho, IViewKho, IViewMatHang } from "@/models/kho/kho.models";
import { IFindPagingRoom } from "@/models/rcp/room.models";
import { KhoService } from "@/service/kho.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TblAction } from "../tbl-action/tbl-action";
import { PaginatorState } from "primeng/paginator";
import { TblActionTypes } from "./tbl-action/tbl-action";
import { CreateNhapHang } from "./create/create";
import { UpdateNhapHang } from "./update/update";


@Component({
    selector: 'app-chi-tiet-kho',
    imports: [...SharedImports, DataTable],
    templateUrl: './chi-tiet.html',
    styleUrl: './chi-tiet.scss'
})

export class ChiTietKho extends BaseComponent{
    _khoService = inject(KhoService);
    private route = inject(ActivatedRoute);
    searchForm : FormGroup = new FormGroup({
        search: new FormControl(''),
       
        
    });

    columns: IColumn[] = [
                { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
                { header: 'Tên mặt hàng', field: 'tenMon',  headerContainerStyle: 'min-width: 12rem', cellClass: 'cursor-pointer hover:text-blue-800 hover:underline', clickable: true ,cellStyle: 'text-align:center' },
                { header: 'Mô tả', field: 'moTa', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
                {header: 'Số lượng hàng nhập', field: 'soLuongNhap', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
                {header: 'Số lượng đã bán', field: 'soLuongDaBan', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
                {header: 'Tồn kho', field: 'soLuongTonKho', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
                { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'}
        ];
    data: IViewMatHang[] =[];
    
        query: IFindPagingByIdKho  = {
            idKho: 0,
            pageNumber: 1,
            pageSize: this.MAX_PAGE_SIZE,
        };
    override ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.query.idKho = +params['id'] || 0; 
            if (this.query.idKho > 0) {
                this.getData();
            } else {
                this.messageError('Không tìm thấy thông tin kho');
            }
        });
    }
    onSearch() {
       
        this.getData();
    }
     getData() {
        this.loading = true;
        this._khoService.findPagingHangTrongKho({...this.query,...this.searchForm.value}).subscribe({
            next: (res) => {
                if(this.isResponseSucceed(res,false)) {
                    this.data = res.data.items[0]?.hangs || [];
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
    onOpenCreate(){
            const ref = this._dialogService.open(CreateNhapHang, { header: 'Nhập thêm hàng vào kho', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false,data: { idKho: this.query.idKho } });
                            ref.onClose.subscribe((result) => {
                                if (result) {
                                        this.getData();
                                }
                        });
    }
    onOpenUpdate(data: IViewMatHang){
                const ref = this._dialogService.open(UpdateNhapHang, { header: 'Cập nhật thông tin nhập thêm hàng vào kho', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false , data: {data,idKho: this.query.idKho}});
                        ref.onClose.subscribe((result) => {
                            if (result) {
                                    this.getData();
                            }
                    });
            }
        
            onDelete(data: IViewMatHang) {
                        this.confirmDelete(
                            {
                                header: 'Bạn chắc chắn muốn xóa mặt hàng này khỏi kho?',
                                message: 'Không thể khôi phục sau khi xóa'
                            },
                            () => {
                                this._khoService.deleteHangKhoiKho(this.query.idKho,data.id || 0,).subscribe(
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
                    onCustomEmit(data: { type: string; data: IViewMatHang; field?: string }) {
                                if (data.type === TblActionTypes.delete) {
                                    this.onDelete(data.data);
                                } else if (data.type === TblActionTypes.update) {
                                    this.onOpenUpdate(data.data);
                                } 
                        }
            
    }
