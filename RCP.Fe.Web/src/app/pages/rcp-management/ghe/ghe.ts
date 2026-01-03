import { IFindPagingGhe, IViewGhe } from "@/models/rcp/room.models";
import { RoomService } from "@/service/room.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { GheStatuses } from "@/shared/constants/ghe.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PaginatorState } from "primeng/paginator";

@Component({
    selector: 'app-ghe',
    imports: [...SharedImports, DataTable],
    templateUrl: './ghe.html',
    styleUrl: './ghe.scss'
})
export class Ghe extends BaseComponent{
    _roomService = inject(RoomService);
     private route = inject(ActivatedRoute);

    searchForm : FormGroup = new FormGroup({
        search: new FormControl('')
        
    });

    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Số ghế', field: 'name', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Hàng', field: 'hang', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Hạng ghế', field: 'hangGheText', headerContainerStyle: 'min-width: 8rem', cellViewType: CellViewTypes.STATUS, 
            statusSeverityFunction: (rowData: IViewGhe) => {
                return GheStatuses.getSeverity(rowData.hangGhe ?? 0);

            }
        },
        { header: 'Gía vé', field: 'giave.giaVe', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
    ];

    data: IViewGhe[] = [];
    query : IFindPagingGhe = {
        idCinema:0,
        idRoom:0,
        pageNumber: 1,
        pageSize: this.MAX_PAGE_SIZE,
    };

    override ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.query.idCinema = +params['idCinema'] || 0; 
            this.query.idRoom = +params['idRoom'] || 0;
            if (this.query.idCinema > 0 && this.query.idRoom > 0) {
                this.getData();
            } else {
                this.messageError('Không tìm thấy thông tin phòng chiếu');
            }
        });
    }

    onSearch() {
        this.getData();
    }

    getData(){
        this.loading = true;
        this._roomService.findPagingGhe({...this.query,keyword: this.searchForm.get('search')?.value}).subscribe({
            next: (res) => {
                if( this.isResponseSucceed(res, false)){    
                    this.data = res.data.items.map((item: { hangGhe: number; }) => ({
                        
                            ...item,
                            hangGheText: this.getHangGheText(item.hangGhe ?? 0)
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
    onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) + 1;
        this.getData();
    }

}