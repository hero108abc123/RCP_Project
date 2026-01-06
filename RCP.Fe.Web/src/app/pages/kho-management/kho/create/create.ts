import { ICreateKho } from "@/models/kho/kho.models";
import { IGetDropDownRCP } from "@/models/rcp/rcp.models";
import { KhoService } from "@/service/kho.service";
import { RCPService } from "@/service/rcp.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    selector: 'app-create-kho',
    imports: [SharedImports],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})

export class CreateKho extends BaseComponent{
    private _rcpService = inject(RCPService);
    private _ref = inject(DynamicDialogRef);
    private _khoService = inject(KhoService);
    listCinemas: IGetDropDownRCP[] = [];


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
        this.getListDropDownRCP();
        
    }
    onSubmit() {
            if (this.isFormInvalid()) {
                return;
            }
    
            this.onSubmitCreate();
    }
    onSubmitCreate() {
                    const body: ICreateKho = {

                        idCinema: this.form.value.idCinema,
                        tenKho : this.form.value.tenKho,
                       
                    };
                    this.loading = true;
                    this._khoService.create(body).subscribe({
                        next: (res) => {
                            if (this.isResponseSucceed(res, true, 'Đã thêm mới kho thành công!')) {
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
    
}