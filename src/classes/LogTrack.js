
/**
 * class LogTrack
 * This class represents the LogTrack
 * 
 * activity: string | The activity of the LogTrack
 * employeeId: string | The id of the employee
 * companyId: string | The id of the company
 * startDate: date | The start date of the LogTrack
 * endDate: date | The end date of the LogTrack
 */
class LogTrack {
  constructor(activity, employeeId, companyId, startDate, endDate) {
      this.activity = activity;
      this.employeeId = employeeId;
      this.companyId = companyId;
      this.startDate = startDate;
      this.endDate = endDate;
  }
}

export default LogTrack;
