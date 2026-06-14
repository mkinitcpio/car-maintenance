import { NotificationService } from './notification.service';
import { createElectronServiceMock, FakeNotification, ElectronServiceMock } from 'testing/test-mocks';

describe('NotificationService', () => {
  let service: NotificationService;
  let electron: ElectronServiceMock;

  beforeEach(() => {
    electron = createElectronServiceMock();
    service = new NotificationService(electron as any);
  });

  it('creates an electron Notification with the given title and body', () => {
    service.show('Reminder', 'Change the oil');

    expect(FakeNotification.last!.title).toBe('Reminder');
    expect(FakeNotification.last!.body).toBe('Change the oil');
  });

  it('shows the notification', () => {
    service.show('Title', 'Body');

    expect(FakeNotification.last!.show).toHaveBeenCalledTimes(1);
  });
});
