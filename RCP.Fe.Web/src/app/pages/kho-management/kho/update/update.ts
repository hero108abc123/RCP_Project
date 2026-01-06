import { IUpdateKho } from "@/models/kho/kho.models";
import { IGetDropDownRCP } from "@/models/rcp/rcp.models";
import { KhoService } from "@/service/kho.service";
import { RCPService } from "@/service/rcp.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { Select } from "primeng/select";

@Component({
    selector: 'app-update-kho',
    imports: [SharedImports,Select],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})

export class UpdateKho extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _rcpService = inject(RCPService);
    private _config = inject(DynamicDialogConfig);
    private _khoService = inject (KhoService);
    listCinemas: IGetDropDownRCP[] = [];
    id: number = this._config.data?.id || 0;
    override form: FormGroup = new FormGroup({
        idCinema:new FormControl('', [Validators.required]),
        tenKho: new FormControl('', [Validators.required]),
        
  
        
    });
    override ValidationMessages: Record<string, Record<string, string>> = {
        idCinema: {
            required: 'Không được bỏ trống'
        },
        tenKho: {
            required: 'Không được bỏ trống'
        }
        
    };
    override ngOnInit(): void {
        this.getById();
        this.getListDropDownRCP();
        
    }
    onSubmit() {
            if (this.isFormInvalid()) {
                return;
            }
    
            this.onSubmitUpdate();
    }
    onSubmitUpdate() {
                        const body: IUpdateKho = {
                            idCinema: this.form.value.idCinema,
                            tenKho : this.form.value.idRoom,
                         
                        };
                        this.loading = true;
                        this._khoService.update(body).subscribe({
                            next: (res) => {
                                if (this.isResponseSucceed(res, true, 'Đã cập nhật thông tin kho  thành công!')) {
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
    getById(){
    this.loading = true;
    this._khoService.getById(this.id).subscribe({
        next: (res) => {
            if (this.isResponseSucceed(res)) {
                const data = res.data;
     
                this.form.patchValue({
                    idCinema: data.cinema?.id,
                    tenKho: data.tenKho,
                    
                });
                

                
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