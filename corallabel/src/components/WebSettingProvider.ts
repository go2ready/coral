export class WebSettingProvider {
  public static csrfToken: string = (window as any)["generated_csrf_token"];
}