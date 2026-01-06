import { IFindPagingGiaVe, IViewGiaVe } from "@/models/rcp/gia-ve.models";
import { IViewGhe } from "@/models/rcp/room.models";
import { GiaVeService } from "@/service/gia-ve.service";
import { RoomService } from "@/service/room.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { GheStatuses } from "@/shared/constants/ghe.constants";
import { NgayStatuses } from "@/shared/constants/gia-ve.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PaginatorState } from "primeng/paginator";
import { CreateGiaVe } from "./create/create";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { UpdateGiaVe } from "./update/update";

@Component({
    selector: 'app-giave',
    imports: [...SharedImports, DataTable],
    templateUrl: './gia-ve.html',
    styleUrl: './gia-ve.scss'
})

export class GiaVe extends BaseComponent{
    _roomService = inject(RoomService);
    private route = inject(ActivatedRoute);
    _giaVeService = inject(GiaVeService);

    searchForm : FormGroup = new FormGroup({
        search: new FormControl(''),
        hangGhe :new FormControl(''),
        trangThaiNgay : new FormControl(''),
    });

    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Giá ngày thường',field: 'giaNgayThuong', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Giá cuối tuần',field: 'giaCuoiTuan', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center'},
        { header: 'Giá ngày lễ',field: 'giaNgayLe', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center'},
        { header: 'Hạng ghế', field: 'hangGheText', headerContainerStyle: 'min-width: 8rem', cellViewType: CellViewTypes.STATUS, 
            statusSeverityFunction: (rowData: IViewGhe) => {
                return GheStatuses.getSeverity(rowData.hangGhe ?? 0);
        
            }
        },
        { header: 'Ngày', field: 'trangThaiNgayText', headerContainerStyle: 'min-width: 8rem', cellViewType: CellViewTypes.STATUS, 
            statusSeverityFunction: (rowData: IViewGiaVe) => {
                return NgayStatuses.getSeverity(rowData.trangThaiNgay ?? 0);
        
            }
        },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'},



        
    ];


    data: IViewGiaVe[] = [];
    query : IFindPagingGiaVe = {

        pageNumber: 1,
        pageSize: this.MAX_PAGE_SIZE,
    };

    override ngOnInit(): void {
        this.getData();
    }

    onSearch() {
        this.getData();
    }

    getData(){
        this.loading = true;
        this._giaVeService.findPaging({...this.query,keyword: this.searchForm.get('search')?.value}).subscribe({
            next: (res) => {
                if( this.isResponseSucceed(res, false)){    
                    this.data = res.data.items.map((item: { hangGhe: number; trangThaiNgay: number}) => ({
                        
                            ...item,
                            hangGheText: this.getHangGheText(item.hangGhe ?? 0),
                            trangThaiNgayText: this.getTrangThaiNgayText(item.trangThaiNgay ?? 0)
                        }));
                    this.totalRecords = res.data.totalItems;
                }
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    getHangGheText(hangGhe: number): string {
        switch (hangGhe) {
            case GheStatuses.THUONG:
                return 'Thường';
            case GheStatuses.DOI:
                return 'Đôi';
            default:
                return 'Không xác định';
        }

       
    }
     getTrangThaiNgayText(trangThaiNgay: number): string {
            switch (trangThaiNgay) {
                case NgayStatuses.NGAYTHUONG:
                    return 'Ngày Thường';
                case NgayStatuses.CUOITUAN:
                    return 'Cuối tuần';
                case NgayStatuses.NGAYLE:
                    return 'Ngày lễ';
                default:
                    return 'Không xác định';
            }
    }
        

    onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) + 1;
        this.getData();
    }

    onCustomEmit(data: { type: string; data: IViewGiaVe; field?: string }) {
            if (data.type === TblActionTypes.delete) {
                    this.onDelete(data.data);
            } else if (data.type === TblActionTypes.update) {
                    this.onOpenUpdate(data.data);
                                     
            }
    }
    
    onOpenCreate(){
        const ref = this._dialogService.open(CreateGiaVe, { header: 'Thêm mới giá vé', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false });
                        ref.onClose.subscribe((result) => {
                            if (result) {
                                    this.getData();
                            }
                    });          
    }
    
    onOpenUpdate(data: IViewGiaVe){
        const ref = this._dialogService.open(UpdateGiaVe, { header: 'Cập nhật thông tin giá vé', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false , data: {data}});
                                ref.onClose.subscribe((result) => {
                                    if (result) {
                                            this.getData();
                                    }
                            });
            
    }
    
    onDelete(data: IViewGiaVe) {
        this.confirmDelete(
                    {
                        header: 'Bạn chắc chắn muốn xóa thông tin giá vé này?',
                        message: 'Không thể khôi phục sau khi xóa'
                    },
                    () => {
                        this._giaVeService.delete(data.id || 0).subscribe(
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