export interface DayValidator {
  isValid(date: Date): Promise<boolean>
}
