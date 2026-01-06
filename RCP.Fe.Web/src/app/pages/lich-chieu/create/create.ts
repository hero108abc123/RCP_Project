import { IGetDropDownPhim } from "@/models/movie/movie.models";
import { IAddPhim } from "@/models/rcp/lich-chieu.models";
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

@Component({
    selector: 'app-create-lich-chieu',
    imports: [SharedImports],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})

export class CreateLichChieu extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _rcpService = inject(RCPService);
    private _movieService = inject(PhimService);
    private _config = inject(DynamicDialogConfig);
    private _roomService = inject(RoomService);
    private _lichChieuService = inject (LichChieuService)
    listPhims: IGetDropDownPhim[]= [];
    listCinemas: IGetDropDownRCP[] = [];
    listRooms: IGetDropDownRoom[] = [];

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
    
            this.onSubmitCreate();
        }
    
        onSubmitCreate() {
                const body: IAddPhim = {
                    idPhim: this.form.value.idPhim,
                    idCinema: this.form.value.idCinema,
                    idRoom : this.form.value.idRoom,
                    thoiGianBatDauChieu: Utils.formatDateCallApi(this.form.value.thoiGianBatDauChieu), 
                    thoiGianKetThucChieu: Utils.formatDateCallApi(this.form.value.thoiGianKetThucChieu) 
                };
                this.loading = true;
                this._lichChieuService.addPhimToRoomRCP(body).subscribe({
                    next: (res) => {
                        if (this.isResponseSucceed(res, true, 'Đã thêm phim vào phòng chiếu thành công!')) {
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
}