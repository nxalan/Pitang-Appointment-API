export interface DateValidator {
  isValid(date: Date): Promise<boolean>
}
