import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";
import {RepositoryModel, CodeStyleModel, CalculationStatus} from "../app.models";
import {MdlDialogService, IMdlDialogAction} from "@angular-mdl/core";

@Component({
    selector: 'app-repository',
    templateUrl: './repository.component.html',
    styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

    repositories: RepositoryModel[];
    hideRepositories = false;
    showLoader = false;
    private _codeStyles: CodeStyleModel[];

    constructor(private _webService: WebService, private _dialogService: MdlDialogService) {
    }

    ngOnInit() {
        this.loadRepositoryList();

        // Todo: handle errors
        // Todo: get code styles on dialog open
        this._webService.getCodeStyleList().then(response => {
            this._codeStyles = response.result;
            console.log('[RepositoryComponent] Code styles were set');
        });
    }

    connectRepository(repositoryId) {
        let actions = [];
        for (let codeStyle of this._codeStyles) {
            actions.push({
                handler: () => {
                    this._webService.createRepositoryConnection(repositoryId, codeStyle.id).then(response => {
                        // Todo: change connect button appearance
                    });
                },
                text: codeStyle.name,
                isClosingAction: true
            });
        }
        let dialog = this._dialogService.showDialog({
            title: 'Select code style',
            message: 'This code style will be used to check repository',
            actions: actions as [IMdlDialogAction],
            fullWidthAction: true,
            isModal: false
        });
    }

    refreshRepositoryList() {
        this._webService.updateRepositoryList().then(response => {
            if (response.status == 200) {
                console.log('[RepositoryComponent] Update repository request was successfully sent');
                this.hideRepositories = true;
                this.showLoader = true;
                this.pollRepositoryUpdateStatus();
            } else {
                this.showDialogWithMessage('Cannot refresh repository list. Error code: ' + response.status);
            }
        });
    }

    private loadRepositoryList() {
        this._webService.getRepositoryList().then(response => {
            if (response.status == 200) {
                this.repositories = response.result;
                console.log('[RepositoryComponent] Repositories were set');
            } else {
                this.showDialogWithMessage('Cannot refresh repository list. Error code: ' + response.status);
                this.showLoader = false;
                this.hideRepositories = false;
            }
        });
    }

    private pollRepositoryUpdateStatus() {
        this._webService.readLastRepositoryUpdate().then(response => {
            if (response.status == 200) {
                if (response.result.status == CalculationStatus.completed) {
                    this.loadRepositoryList();
                    this.showLoader = false;
                    this.hideRepositories = false;
                } else if (response.result.status == CalculationStatus.failed) {
                    this.showDialogWithMessage('Repository list refreshing failed. Try again later');
                    this.showLoader = false;
                    this.hideRepositories = false;
                } else if (response.result.status == CalculationStatus.started) {
                    setTimeout(() => { this.pollRepositoryUpdateStatus(); }, 1000);
                    console.log('[RepositoryComponent] Timeout was set');
                }
            } else {
                this.showDialogWithMessage('Cannot refresh repository list. Error code: ' + response.status);
                this.showLoader = false;
                this.hideRepositories = false;
            }
        });
    }

    disconnectRepository(repositoryId) {
        this._webService.deleteRepositoryConnection(repositoryId).then(response => {
            if (response.detail == null) {
                let repository = this.repositories.filter(r => r.id == response.result).pop();
                if (repository != null) {
                    repository.isConnected = false;
                }
            }
        });
    }

    private showDialogWithMessage(message) {
        this._dialogService.alert(message);
    }

}
