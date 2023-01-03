export class AbstractThemeService {

  constructor(
    private colorAutoSelectorSubscription: Function,
    private colorAutoSelectorUnsubscription: Function) {
  }

  protected eventListenerId: number | null;

  protected removeListener(): void {
    this.eventListenerId = null;
  }

  protected runColorAutoSelector(): void {
    this.colorAutoSelectorSubscription();
  }

  protected stopColorAutoSelector(): void {
    this.colorAutoSelectorUnsubscription();
  }

  public setAppColors(baseColor: string): void {
    baseColor = baseColor.replace(/#/, "");
    const primaryColor = this.getColor(`#${baseColor}`, 1);
    const secondaryColor = this.getColor(`#${baseColor}`, 1);

    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--secondary-color", secondaryColor);
  };

  private getColor(color: string, percent: number, opacity = ""): string {
    const calc = (sub1, sub2) => Math.min(255, Math.floor(parseInt(color.substr(sub1, sub2), 16) * percent))
        .toString(16)
        .padStart(2, "0");

    return `#${calc(1, 2)}${calc(3, 2)}${calc(5, 2)}${opacity}`;
  }
}