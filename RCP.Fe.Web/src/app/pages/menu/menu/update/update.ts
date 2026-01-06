import { IUpdateMenu, IGetMenuById } from "@/models/menu/menu.models";
import { IGetDropDownRCP } from "@/models/rcp/rcp.models";
import { MenuService } from "@/service/menu.service";
import { RCPService } from "@/service/rcp.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { Select } from "primeng/select";

@Component({
    selector: 'app-update-menu',
    imports: [SharedImports, Select],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})
export class UpdateMenu extends BaseComponent {
    private _ref = inject(DynamicDialogRef);
    private _menuService = inject(MenuService);
    private _rcpService = inject(RCPService);
    private _config = inject(DynamicDialogConfig);

    id: number = this._config.data?.id || 0;
    listCinemas: IGetDropDownRCP[] = [];

    override form: FormGroup = new FormGroup({
        idCinema: new FormControl('', [Validators.required]),
        tenThucDon: new FormControl('', [Validators.required]),
        moTa: new FormControl(''),
        tongSoMon: new FormControl('', [Validators.required])
    });

    override ValidationMessages: Record<string, Record<string, string>> = {
        idCinema: {
            required: 'Không được bỏ trống'
        },
        tenThucDon: {
            required: 'Không được bỏ trống'
        },
        tongSoMon: {
            required: 'Không được bỏ trống'
        }
    };

    override ngOnInit(): void {
        this.getListCinemas();
        this.getById();
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitUpdate();
    }

    onSubmitUpdate() {
        const body: IUpdateMenu = {
            id: this.id,
            idCinema: this.form.value.idCinema,
            tenThucDon: this.form.value.tenThucDon,
            moTa: this.form.value.moTa || '',
            tongSoMon: this.form.value.tongSoMon
        };

        this.loading = true;
        this._menuService.update(body).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, true, 'Đã cập nhật thực đơn thành công!')) {
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

    getListCinemas() {
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

    getById() {
        this.loading = true;
        this._menuService.getById(this.id).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    const data = res.data;
                    this.form.patchValue({
                        idCinema: data?.idCinema,
                        tenThucDon: data?.tenThucDon,
                        moTa: data?.moTa,
                        tongSoMon: data?.tongSoMon
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