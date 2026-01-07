import { IGetDropDownPhim } from "@/models/movie/movie.models";
import { IUpdateLichChieu } from "@/models/rcp/lich-chieu.models";
import { IGetDropDownRCP } from "@/models/rcp/rcp.models";
import { IGetDropDownRoom } from "@/models/rcp/room.models";
import { LichChieuService } from "@/service/lich-chieu.service";
import { PhimService } from "@/service/movie.service";
import { RCPService } from "@/service/rcp.service";
import { RoomService } from "@/service/room.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Utils } from "@/shared/utils";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { Select } from "primeng/select";

@Component({
    selector: 'app-update-lich-chieu',
    imports: [SharedImports,Select],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})

export class UpdateLichChieu extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _rcpService = inject(RCPService);
    private _movieService = inject(PhimService);
    private _config = inject(DynamicDialogConfig);
    private _roomService = inject(RoomService);
    private _lichChieuService = inject (LichChieuService)
    listPhims: IGetDropDownPhim[]= [];
    listCinemas: IGetDropDownRCP[] = [];
    listRooms: IGetDropDownRoom[] = [];
    id: number = this._config.data?.idCinemaRoomMovie || 0;
    override form: FormGroup = new FormGroup({
        idCinema:new FormControl('', [Validators.required]),
        idRoom: new FormControl('', [Validators.required]),
        idPhim: new FormControl('', [Validators.required]),
        thoiGianBatDauChieu: new FormControl('', [Validators.required]),
        thoiGianKetThucChieu: new FormControl('', [Validators.required]),
        
    });
    override ValidationMessages: Record<string, Record<string, string>> = {
        idCinema: {
            required: 'Không được bỏ trống'
        },
        idRoom: {
            required: 'Không được bỏ trống'
        },
        idPhim: {
            required: 'Không được bỏ trống'
        },
        thoiGianBatDauChieu: {
            required: 'Không được bỏ trống'
        },
        thoiGianKetThucChieu: {
            required: 'Không được bỏ trống'
        },
    };
    override ngOnInit(): void {
        this.getById()
        this.getListDropDownRCP();
        this.getListDropDownPhim();
        
        this.form.get('idCinema')?.valueChanges.subscribe(idCinema => {
            if (idCinema) {
                this.form.get('idRoom')?.setValue('');
                this.listRooms = [];
                this.getListDropDownRoom(idCinema);
            }
        });
    }
    onSubmit() {
            if (this.isFormInvalid()) {
                return;
            }
    
            this.onSubmitUpdate();
        }
    onSubmitUpdate() {
                    const body: IUpdateLichChieu = {
                        id: this.id,
                        idPhim: this.form.value.idPhim,
                        idCinema: this.form.value.idCinema,
                        idRoom : this.form.value.idRoom,
                        thoiGianBatDauChieu: Utils.formatDateCallApi(this.form.value.thoiGianBatDauChieu), 
                        thoiGianKetThucChieu: Utils.formatDateCallApi(this.form.value.thoiGianKetThucChieu) 
                    };
                    this.loading = true;
                    this._lichChieuService.updatePhimToRoomRCP(body).subscribe({
                        next: (res) => {
                            if (this.isResponseSucceed(res, true, 'Đã cập nhật thông tin lịch  thành công!')) {
                                this._ref?.close(true);
                            }
                        },
                        error: (err) => {
                            this.messageError(err?.message);
                        },
                        complete: () => {
                            this.loading = false;
                        }
                    });
            }
    onCancel() {
            this._ref.close();
    }
    getListDropDownPhim() {
            this.loading = true;
            this._movieService.getDropDown().subscribe({
                next: (res) => {
                    if (this.isResponseSucceed(res)) {
                        this.listPhims = res.data || [];
                    }
                },
                error: (err) => {
                    this.messageError(err?.message);
                },
                complete: () => {
                    this.loading = false;
                }
            });
        }
    getListDropDownRCP(){
            this.loading = true;
            this._rcpService.getListDropDown().subscribe({
                next: (res) => {
                    if (this.isResponseSucceed(res)) {
                        this.listCinemas = res.data || [];
                    }
                },
                error: (err) => {
                    this.messageError(err?.message);
                },
                complete: () => {
                    this.loading = false;
                }
            });
    
        }
    getListDropDownRoom(idCinema: number){
            this.loading = true;
            this._roomService.getListDropDown(idCinema).subscribe({
                next: (res) => {
                    if (this.isResponseSucceed(res)) {
                        this.listRooms = res.data || [];
                    }
                },
                error: (err) => {
                    this.messageError(err?.message);
                },
                complete: () => {
                    this.loading = false;
                }
            });
        }

    getById(){
    this.loading = true;
    this._lichChieuService.getById(this.id).subscribe({
        next: (res) => {
            if (this.isResponseSucceed(res)) {
                const data = res.data;
     
                this.form.patchValue({
                    idCinema: data.cinema?.idCinema,
                    idPhim: data.phim?.idPhim,
                    thoiGianBatDauChieu: data.thoiGianBatDauChieu ? new Date(data.thoiGianBatDauChieu) : null,
                    thoiGianKetThucChieu: data.thoiGianKetThucChieu ? new Date(data.thoiGianKetThucChieu) : null
                });
                

                if (data.cinema?.idCinema) {
                    this._roomService.getListDropDown(data.cinema.idCinema).subscribe({
                        next: (roomRes) => {
                            if (this.isResponseSucceed(roomRes)) {
                                this.listRooms = roomRes.data || [];
                         
                                this.form.patchValue({
                                    idRoom: data.room?.idRoom
                                });
                            }
                        }
                    });
                }
            }
        },
        error: (err) => {
            this.messageError(err?.message);
        },
        complete: () => {
            this.loading = false;
        }
    });
}
}