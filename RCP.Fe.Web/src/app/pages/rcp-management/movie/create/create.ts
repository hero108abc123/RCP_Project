import { IGetDropDownPhim } from "@/models/movie/movie.models";
import { IAddPhim } from "@/models/rcp/movie.models";
import { PhimService } from "@/service/movie.service";
import { RCPService } from "@/service/rcp.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Utils } from "@/shared/utils";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";


@Component({
    selector: 'app-create-phim-room',
    imports: [SharedImports],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})

export class CreatePhimRoom extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _rcpService = inject(RCPService);
    private _movieService = inject(PhimService);
    private _config = inject(DynamicDialogConfig); 
    rcpId: number = this._config.data?.idCinema || 0;
    roomId: number = this._config.data?.idRoom || 0;



    listPhims: IGetDropDownPhim[]= [];
    override form: FormGroup = new FormGroup({
        idPhim: new FormControl('', [Validators.required]),
        thoiGianBatDauChieu: new FormControl('', [Validators.required]),
        thoiGianKetThucChieu: new FormControl('', [Validators.required]),
        
    });
    override ValidationMessages: Record<string, Record<string, string>> = {
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
        this.getListDropDownPhim();
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }

        this.onSubmitCreate();
    }

    onSubmitCreate() {
            const body: IAddPhim = {
                idCinema:this.rcpId,
                idRoom: this.roomId,
                idPhim: this.form.value.idPhim,
                thoiGianBatDauChieu: Utils.formatDateCallApi(this.form.value.thoiGianBatDauChieu), 
                thoiGianKetThucChieu: Utils.formatDateCallApi(this.form.value.thoiGianKetThucChieu) 
            };
            this.loading = true;
            this._rcpService.addPhimToRoomRCP(body).subscribe({
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


}