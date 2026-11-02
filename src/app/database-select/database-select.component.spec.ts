import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DatabaseSelectComponent } from './database-select.component';
import { ElectronService } from '@core/services';
import { DataBaseService } from '@core/database';
import { SettingsService } from '@shared/components/settings/settings.service';
import { provideMockDataBaseService, provideMockElectronService, provideMockSettingsService, } from 'testing/test-mocks';

describe('DatabaseSelectComponent', () => {
    beforeEach(() => {
        vi.useFakeTimers({ advanceTimeDelta: 1, shouldAdvanceTime: true });
    });
    afterEach(() => {
        vi.useRealTimers();
    });
    let component: DatabaseSelectComponent;
    let fixture: ComponentFixture<DatabaseSelectComponent>;
    let electron: any;
    let database: any;
    let settings: any;
    let router: {
        navigate: Mock;
    };

    beforeEach(async () => {
        router = { navigate: vi.fn().mockName('navigate') };

        await TestBed.configureTestingModule({
            imports: [DatabaseSelectComponent],
            providers: [
                provideMockElectronService(),
                provideMockDataBaseService(),
                provideMockSettingsService(),
                { provide: Router, useValue: router },
            ],
        })
            .overrideComponent(DatabaseSelectComponent, { set: { template: '', imports: [] } })
            .compileComponents();

        fixture = TestBed.createComponent(DatabaseSelectComponent);
        component = fixture.componentInstance;
        electron = TestBed.inject(ElectronService);
        database = TestBed.inject(DataBaseService);
        settings = TestBed.inject(SettingsService);
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });

    it('creates a new database file and navigates home on create', async () => {
        electron.dialog.showSaveDialog.mockResolvedValue({ filePath: '/tmp/new.json' });

        component.onCreate();
        await vi.advanceTimersByTimeAsync(0);

        expect(database.createDatabaseFile).toHaveBeenCalledWith('/tmp/new.json');
        expect(settings.setDataBasePath).toHaveBeenCalledWith('/tmp/new.json');
        expect(database.initDataBase).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('opens an existing database and navigates home on open', async () => {
        electron.dialog.showOpenDialog.mockResolvedValue({ filePaths: ['/tmp/existing.json'] });

        component.onOpen();
        await vi.advanceTimersByTimeAsync(0);

        expect(settings.setDataBasePath).toHaveBeenCalledWith('/tmp/existing.json');
        expect(database.initDataBase).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('does nothing when the open dialog returns no file', async () => {
        electron.dialog.showOpenDialog.mockResolvedValue({ filePaths: [] });

        component.onOpen();
        await vi.advanceTimersByTimeAsync(0);

        expect(settings.setDataBasePath).not.toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
    });
});
